FROM denoland/deno:alpine-1.34.3 as build-stage
USER deno
WORKDIR /app
COPY . .
RUN deno task cache && \
  deno task build && \
  sed -i "s/IN_BROWSER = typeof window !== 'undefined'/IN_BROWSER = typeof document !== 'undefined'/" node_modules/vuetify/lib/util/globals.mjs && \
  sed -i "s/isBrowser = typeof window !== 'undefined'/isBrowser = typeof document !== 'undefined'/" node_modules/vue-router/dist/vue-router.mjs

FROM denoland/deno:alpine-1.34.3 as production-stage
RUN apk add --no-cache tini

USER deno
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build-stage /app/dist/ dist/
COPY --from=build-stage /app/node_modules/ node_modules/
COPY --from=build-stage /app/deno.json deno.json

EXPOSE 5173
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--allow-run", "--node-modules-dir", "dist/server.ts"]