<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Deno Vite demo</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer color="primary" app>
      <span>&copy; 2023 Iain Calder</span>
    </v-footer>
  </v-app>
</template>