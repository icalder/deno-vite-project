FROM denoland/deno:alpine-1.34.3 as build-stage
USER deno
WORKDIR /app
COPY . .
RUN deno task build && \
  sed -i "s/IN_BROWSER = typeof window !== 'undefined'/IN_BROWSER = typeof document !== 'undefined'/" node_modules/vuetify/lib/util/globals.mjs && \
  sed -i "s/isBrowser = typeof window !== 'undefined'/isBrowser = typeof document !== 'undefined'/" node_modules/vue-router/dist/vue-router.mjs && \
  deno task build && \
  sed -i "s/isBrowser = typeof window !== 'undefined'/isBrowser = typeof document !== 'undefined'/" $DENO_DIR/npm/registry.npmjs.org/vue-router/4.2.2/dist/vue-router.mjs

FROM denoland/deno:alpine-1.34.3 as production-stage
RUN apk add --no-cache tini

WORKDIR /app
ENV NODE_ENV=production
USER deno

COPY --from=build-stage /deno-dir/ /deno-dir/
COPY --from=build-stage /app/dist/ dist/
COPY --from=build-stage /app/src/ src/
COPY --from=build-stage /app/deno.json deno.json
COPY --from=build-stage /app/deno.lock deno.lock

EXPOSE 5173
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--allow-run", "src/server.ts"]