<script setup lang="ts">
import { defineProps,withDefaults } from 'vue';
const props = withDefaults(
    defineProps<{
        resource: string
    }>(),
    {
        resource: 'page'
    }
)
</script>
<template>
    <div class="grid h-screen place-content-center bg-white px-4">
  <div class="text-center">
    <h1 class="text-9xl font-black text-gray-200">404</h1>

    <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Oops!</p>

    <p class="mt-4 text-gray-500">The {{ resource }} you're looking for is not here.</p>

    <router-link 
      :to="{ name: 'country' }"
      class="mt-6 inline-block rounded bg-[#1282A2] px-5 py-3 text-sm font-medium text-white hover:bg-[#22748b] focus:outline-none focus:ring"
    >
      Go Back Home Page
    </router-link>
  </div>
</div>
</template>