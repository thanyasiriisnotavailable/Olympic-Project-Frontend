<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Country } from '@/types'
const props = defineProps<{
  country: Country
}>()
const { country } = toRefs(props)
</script>
<template>
  <div class="country" v-if="country">
    <div class="flex flex-col sm:flex-row items-stretch rounded-lg p-14 mx-14 my-10 bg-white shadow-xl">
      <!-- Left Column: Flag -->
      <div
        class="sm:w-1/3 flex justify-center sm:border-r border border-gray-300 p-4 rounded-lg flex-grow shadow-lg"
      >
        <img
          :src="country.flag"
          :alt="country.name"
          class="w-11/12 h-auto object-contain"
        />
      </div>
      <!-- Right Column: Country Information -->
      <div
        class="sm:w-2/3 mt-4 sm:mt-0 sm:ml-8 p-8 pt-5 border  border-gray-300  rounded-lg flex-grow bg-gray-50 shadow-lg"
      >
        <h1 class="text-6xl font-bold mb-6 hover:text-blue-900 transition-colors">{{ country.id }}</h1>
        <p class="text-2xl text-gray-800 mb-2 "><b>Name:</b> <span class="font-semibold">{{ country.name }}</span></p>
        <p class="text-2xl text-gray-800 mb-2"><b>Capital:</b> <span class="font-semibold">{{ country.capital }}</span></p>
        <p class="text-2xl text-gray-800"><b>Language:</b> <span class="font-semibold">{{ country.language }}</span></p>
      </div>
    </div>
  </div>
</template>
