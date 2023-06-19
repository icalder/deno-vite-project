<template>
  <!-- <img src="/vite-deno.svg" alt="Vite with Deno" /> -->
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <router-view/>
  <hr />
  <div style="display: flex; justify-content: center;">
    <router-link class="rlink" v-if="route.path != '/'" to="/">Home</router-link>
    <router-link class="rlink" v-if="route.path != '/vuetify'" to="/vuetify">Vuetify</router-link>
    <router-link class="rlink" v-if="route.path != '/about'" to="/about">About</router-link>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { useRoute } from 'vue-router';

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const route = useRoute()
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.rlink {
  flex-grow: 1;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
</style>
