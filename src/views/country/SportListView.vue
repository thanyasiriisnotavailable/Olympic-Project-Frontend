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
    class="container m-12 mx-auto p-5 border border-gray-300 rounded-lg flex-grow bg-gray-50 shadow-lg"
  >
    <div class="box-border py-2">
      <div
        class="grid items-center justify-items-center gap-x-2.5 h-auto text-xl py-4 grid-cols-[minmax(0,_5.5fr)_repeat(4,_1.5fr)] mx-16 border-b-2 border-gray-300"
      >
        <span class="text-2xl font-extrabold mr-6 sm:mr-12 ml-4 flex justify-center">Sport</span>
        <div class="flex justify-center items-center">
          <img src="/src/assets/gold-medal.svg" alt="gold medal" width="40" />
        </div>
        <div class="flex justify-center items-center">
          <img src="/src/assets/silver-medal.svg" alt="silver medal" width="40" />
        </div>
        <div class="flex justify-center items-center">
          <img src="/src/assets/bronze-medal.svg" alt="bronze medal" width="40" />
        </div>
        <span class="text-2xl font-extrabold ">Total</span>
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
