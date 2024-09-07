<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Country } from '@/types'
import SportRow from '@/components/SportRow.vue'

const props = defineProps<{
  country: Country
}>()

const { country } = toRefs(props)

// Extracting sports from the country object
const sports = country.value.sports
</script>

<template>
  <div
    class=" m-6 md:m-12 md:mt-8 md:mx-48 p-5 border border-gray-300 rounded-lg shadow-lg bg-[#2bb0b033] "
  >
    <div class="box-border py-2">
      <div
      class="grid items-center justify-items-center h-auto text-xl pb-4 gap-x-2.5 border-b-2 border-[#afb2b8] md:mx-16 grid-cols-[minmax(0,4.5fr)_repeat(4,_1.5fr)]"
      >
        <span class="text-lg md:text-2xl font-bold md:font-extrabold md:pr-20">Sport</span>
        <div class="flex justify-center items-center">
          <img src="/src/assets/gold-medal.svg" alt="gold medal" class="w-6 md:w-10" />
        </div>
        <div class="flex justify-center items-center">
          <img src="/src/assets/silver-medal.svg" alt="silver medal" class="w-6 md:w-10" />
        </div>
        <div class="flex justify-center items-center">
          <img src="/src/assets/bronze-medal.svg" alt="bronze medal" class="w-6 md:w-10" />
        </div>
        <span class="text-lg md:text-2xl font-bold md:font-extrabold pr-2">Total</span>
      </div>
    </div>

    <!-- Check if sports data is available -->
    <div v-if="sports && sports.length">
      <div>
        <SportRow v-for="sport in sports" :key="sport.sport" :sport="sport" />
      </div>
    </div>

    <!-- Show a message if no sports data is available -->
    <p v-else class="text-center text-lg font-medium text-gray-500">
      No sports information available.
    </p>
  </div>
</template>
