<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex w-full py-4 bg-teal-500 items-center gap-x-6 shadow-lg">
      <img src="https://cdn-icons-png.flaticon.com/512/4697/4697260.png" alt="Logotipo de la aplicación"
        class="w-10 ml-6">
      <RouterLink to="/" class="px-6 py-2 hover:bg-teal-300 hover:rounded-lg font-bold text-xl text-white">Inicio
      </RouterLink>
      <RouterLink to="/order" class="px-6 py-2 hover:bg-teal-300 hover:rounded-lg font-bold text-xl text-white">
        Urgencias</RouterLink>
    </nav>

    <h1 class="font-bold text-center rounded-full bg-teal-100 mx-80 my-2 self-center mt-4 shadow-md">Práctica 1
      realizada por
      Garcia
      Canul Guillermo de Jesus</h1>
  </header>

  <main class="py-2">
    <RouterView />
  </main>
</template>
