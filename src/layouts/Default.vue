<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Deno Vite demo</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- <img src="/vite-deno.svg" alt="Vite with Deno" /> -->
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <router-view />
      <!-- https://www.the-koi.com/projects/setting-up-vue-3-with-vuetify-icons-and-themes/ -->
      <v-bottom-navigation active grow>
        <v-btn to="/">
          <v-icon>mdi-history</v-icon>
          Home
        </v-btn>

        <v-btn to="vuetify">
          Vuetify
        </v-btn>

        <v-btn to="about">
          <v-icon>mdi-information</v-icon>
          About
        </v-btn>
      </v-bottom-navigation>
    </v-main>

    <v-footer color="primary" app>
      <span>&copy; 2023 Iain Calder</span>
    </v-footer>
  </v-app>
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
</style>