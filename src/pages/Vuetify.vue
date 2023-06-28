<template>
<h1>TODO add Vuetify!</h1>
<v-divider/>
  <v-chip>
    Free Chip!
  </v-chip>
  <v-divider/>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

  const valid = ref(false)
  const firstname = ref('')
  const lastname=ref('')
  const email = ref('')
  const nameRules = [
        (value: string) => {
          if (value) return true
          return 'Name is required.'
        },
        (value: string) => {
          if (value?.length <= 10) return true
          return 'Name must be less than 10 characters.'
        },
      ]
  const emailRules = [
        (value:string) => {
          if (value) return true
          return 'E-mail is requred.'
        },
        (value: string) => {
          if (/.+@.+\..+/.test(value)) return true
          return 'E-mail must be valid.'
        },
      ]

</script>