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
  props.country.sports.forEach((sport) => {
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
    <div class="py-1 md:py-2 mx-1 md:mx-0">
      <div
        class="grid grid-cols-[minmax(0,_5.5fr)_repeat(4,_1.5fr)] gap-2 items-center text-center px-4 md:px-4 mx-0 md:mx-16 h-16 border border-gray-300 rounded-md my-0.5 bg-[#fbfbfd]"
      >
        <div class="flex items-center space-x-9 md:space-x-4">
          <span
            class="font-bold text-blue-900 mr-3 md:mr-12 ml-2 md:ml-4 flex justify-center text-lg md:text-xl"
          >
            {{ country.order }}
          </span>
          <img
            :src="country.flag"
            :alt="country.name"
            class="w-13 h-8 md:w-auto md:h-10 border-2 border-black-500"
          />
          <span class="tracking-wider hidden lg:inline text-lg">
            {{ country.name }}
          </span>
          <span class="tracking-wider hidden md:inline lg:hidden">
            {{ country.id }}
          </span>
        </div>
        <!-- Medal counts -->
        <span class="tracking-widest text-sm md:text-lg">{{ totalMedals.gold }}</span>
        <span class="tracking-widest text-sm md:text-lg">{{ totalMedals.silver }}</span>
        <span class="tracking-widest text-sm md:text-lg">{{ totalMedals.bronze }}</span>
        <span class="font-bold tracking-widest text-sm md:text-lg">
          {{ total }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
