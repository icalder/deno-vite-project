import { ImportMetaEnv } from 'vite/types'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.ts'
import { InitialDataKey } from './util/InjectionKeys.ts'
import vuetify from './plugins/vuetify.ts'

declare global {
  // deno-lint-ignore no-explicit-any
  interface Window { INITIAL_DATA: Record<string, any>; }
  interface ImportMeta {
    env: ImportMetaEnv
  }
}

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  if (!import.meta.env.SSR) {
    app.provide(InitialDataKey, window.INITIAL_DATA)
  }
  const router = createRouter()
  app.use(router)
  app.use(vuetify)

  return { app, router }
}
