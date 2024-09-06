<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Country } from '@/types'

// Define the props to receive the country object
const props = defineProps<{
  country: Country
}>()

// Calculate total medals directly in the component
const totalMedals = computed(() => {
  const medals = { gold: 0, silver: 0, bronze: 0 }

  // Calculate the total medals for the country
  props.country.sports.forEach(sport => {
    medals.gold += sport.medals.gold
    medals.silver += sport.medals.silver
    medals.bronze += sport.medals.bronze
  })

  return medals
})

const total = computed(() => {
  const medals = totalMedals.value
  return medals.gold + medals.silver + medals.bronze
})
</script>

<template>
  <RouterLink
    class="block transition-all duration-100 ease-in-out hover:bg-gray-300 active:bg-gray-400"
    :to="{ name: 'detail-view', params: { id: country.id } }"
  >
    <div class="py-2">
      <div class="grid grid-cols-[minmax(0,5.5fr)_repeat(4,1.5fr)] gap-2 items-center text-center px-4 h-16 border border-gray-300 rounded-md mx-16 my-0.5 bg-[#fbfbfd]">
        <div class="flex items-center space-x-4">
          <span class="text-xl font-bold text-blue-900 mr-6 sm:mr-12 ml-4 flex justify-center">
            {{ country.order }}
          </span>
          <img
            :src="country.flag"
            :alt="country.name"
            class="w-auto h-10 border-2 border-black-500"
          />
          <span class="tracking-wider text-xl hidden sm:inline">
            {{ country.name }}
          </span>
          <span class="tracking-wider text-xl sm:hidden">
            {{ country.id }}
          </span>
        </div>
        <!-- Medal counts -->
        <span class="tracking-widest text-lg">{{ totalMedals.gold }}</span>
        <span class="tracking-widest text-lg">{{ totalMedals.silver }}</span>
        <span class="tracking-widest text-lg">{{ totalMedals.bronze }}</span>
        <span class="font-bold tracking-widest text-lg">
          {{ total }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>