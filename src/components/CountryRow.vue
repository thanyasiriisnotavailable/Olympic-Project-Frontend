<script setup lang="ts">
import { computed } from 'vue'
import type { Country } from '@/types'

const props = defineProps<{
  country: Country
}>()

const totalMedals = computed(() => {
  return props.country.gold + props.country.silver + props.country.bronze
})
</script>

<template>
  <RouterLink 
    class="block transition-all duration-300 ease-in-out hover:bg-gray-300 active:bg-gray-400"
    :to="{ name: 'detail-view', params: { id: country.id } }"
  >
    <div class="py-2">
      <div class="grid grid-cols-[minmax(0,5.5fr)_repeat(4,1.5fr)] gap-2 items-center text-center px-4 h-16 border border-gray-300 rounded-md mx-16 my-0.5 bg-[#fbfbfd]">
        <div class="flex items-center space-x-4">
          <span class="text-xl font-bold text-blue-900 mr-12 ml-4 flex justify-center">{{ country.order }}</span>
          <img
            :src="country.flag"
            :alt="country.name"
            class="w-auto h-10"
          />
          <span class="tracking-wider text-xl">{{ country.name }}</span>
        </div>
        <span class="tracking-widest text-lg">{{ country.gold }}</span>
        <span class="tracking-widest text-lg">{{ country.silver }}</span>
        <span class="tracking-widest text-lg">{{ country.bronze }}</span>
        <span class="font-bold tracking-widest text-lg">{{ totalMedals }}</span>
      </div>
    </div>
  </RouterLink>
</template>