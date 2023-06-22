import { defineConfig } from 'vite'
import vue from 'npm:@vitejs/plugin-vue@^4.2.3'
import vuetify from 'npm:vite-plugin-vuetify@^1.0.2'

import 'vue'
import 'vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  ssr: {
    noExternal: ['vuetify']
  }
})
