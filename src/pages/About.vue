<template>
  <h1>About</h1>
  <v-btn @click="ping">Ping API</v-btn>
  <v-text-field v-model="data"></v-text-field>
  <ul v-if="files.length > 0">
    <li v-for="file in files">
      {{ file }}
    </li>
  </ul>
  <p v-else>No file data - F5 to load server-side</p>
</template>

<script setup lang="ts">
// https://vuejs.org/guide/typescript/composition-api.html#typescript-with-composition-api

import { inject, onServerPrefetch, Ref, ref, useSSRContext } from 'vue'
import { InitialDataKey } from '../util/InjectionKeys'
import { useApiClient } from '../api/client'

const apiClient = useApiClient()

const files: Ref<string[]> = ref([])
const data = ref("Press the ping button...")

if (!import.meta.env.SSR) {
  const initialData = inject(InitialDataKey)
  if (initialData) {
    files.value = initialData.files ?? []
  }
}

async function ping() {
  const response = await apiClient.ping()
  data.value = response.message
}

// https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
onServerPrefetch(async() => {
  const ctx = useSSRContext()
  const ssrData = await import('../util/SSRData')

  for (const dirEntry of Deno.readDirSync('.')) {
    files.value.push(dirEntry.name)
  }
  ssrData.addInitialData(ctx!, 'files', files.value)
})
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>