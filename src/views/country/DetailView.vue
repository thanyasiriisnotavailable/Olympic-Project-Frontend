<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Country } from '@/types'
const props = defineProps<{
  country: Country
}>()
const { country } = toRefs(props)
</script>
<template>
  <div class="flex flex-col justify-center md:flex-row rounded-lg p-6 pt-0 md:my-10 md:mx-36">
    <!-- Left Column: Flag -->
    <div
      class="w-full md:w-1/4 flex justify-center my-2 border border-gray-300 sm:rounded-l-lg shadow-lg"
    >
      <img :src="country.flag" :alt="country.name" class="w-96 sm:w-8/12 md:w-full h-auto p-6 object-contain"/>
    </div>
    <!-- Right Column: Country Information -->
    <div class="w-full md:w-[500px] my-2 p-6 border border-gray-300 sm:rounded-r-lg shadow-lg">
      <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <!-- Column 1 -->
        <div class="flex-1">
          <p class="text-xl sm:text-2xl text-gray-800">
            <b>ISO code:</b> <span class="font-bold">{{ country.id }}</span>
          </p>
          <p class="mt-1 text-lg"> <b>{{ country.name }}</b>  is located in the continent of <b>{{ country.continent }}</b>, with its capital city being <b>{{ country.capital }}</b>, and the official language is <b>{{ country.language }}</b>.</p>
        </div>
      </div>
    </div>
  </div>
</template>
