FROM denoland/deno:alpine-1.34.3 as build-stage
USER deno
WORKDIR /build
COPY . .
RUN deno cache --node-modules-dir ./src/plugins/vuetify.ts && \
  rm -f deno.lock && \
  deno task build

FROM denoland/deno:alpine-1.34.3 as production-stage
RUN apk add --no-cache tini

WORKDIR /app

# Prefer not to run as root.
USER deno
ENV NODE_ENV=production

COPY --from=build-stage /build/dist/ dist/
COPY --from=build-stage /build/node_modules/ node_modules/
COPY --from=build-stage /build/import_map.json import_map.json

EXPOSE 5173
CMD ["run", "--import-map", "import_map.json", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--allow-run", "--node-modules-dir", "dist/server.ts"]