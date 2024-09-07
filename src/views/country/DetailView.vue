<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Country } from '@/types'
const props = defineProps<{
  country: Country
}>()
const { country } = toRefs(props)
</script>
<template>
  <div class="flex flex-col justify-center md:flex-row md:space-x-6 rounded-lg p-6 pt-4 md:my-10 md:mx-36">
    <!-- Left Column: Flag -->
    <div
      class="w-full md:w-1/3 flex justify-center my-2 border border-gray-300 rounded-lg shadow-lg"
    >
      <img :src="country.flag" :alt="country.name" class="w-96 sm:w-8/12 md:w-full h-auto p-6 object-contain"/>
    </div>
    <!-- Right Column: Country Information -->
    <div class="w-full md:w-[500px] my-2 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 class="text-4xl sm:text-4xl font-bold mb-4 sm:mb-6 hover:text-blue-900 transition-colors">
        {{ country.name }}
      </h1>
      <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <!-- Column 1 -->
        <div class="flex-1">
          <p class="text-lg sm:text-xl text-gray-800">
            <b>ISO code:</b> <span class="font-semibold">{{ country.id }}</span>
          </p>
          <p class="mt-1 text-lg"> {{ country.name }} is located in the continent of {{ country.continent }}, with its capital city being {{ country.capital }}, and the official language is {{ country.language }}.</p>
        </div>
      </div>
    </div>
  </div>
</template>
