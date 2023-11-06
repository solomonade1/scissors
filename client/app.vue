<template>
  <div class="app">
    <v-app>
   <NuxtPage />
    </v-app>
    

  </div>
</template>


<script setup>

import { useTheme } from 'vuetify'

const theme = useTheme()


const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'myCustomDarkTheme'
}
</script>