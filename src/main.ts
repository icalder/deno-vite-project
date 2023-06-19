import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter } from './router.ts'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { VCard } from 'vuetify/components'

const vuetify = createVuetify({
  components: {VCard},
  theme: {
    defaultTheme: 'dark',
  }
})

const app = createApp(App)
const router = createRouter()
app.use(router)
app.use(vuetify)
app.mount('#app')