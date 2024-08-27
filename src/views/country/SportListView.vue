<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Country } from '@/types'
import SportRow from '@/components/SportRow.vue';
const props = defineProps<{
  country: Country
}>()

const { country } = toRefs(props)

// Extracting sports from the country object
const sports = country.value.sports
</script>

<template>
  <div>
    <div class="box-border mb-11">
      <div
        class="grid items-center justify-items-center gap-x-2.5 h-14 text-xl px-4 grid-cols-[minmax(0,_5.5fr)_repeat(4,_1.5fr)] mx-16"
      >
        <div class="flex items-center justify-self-start">
          <span class="font-medium">Sport</span>
        </div>
        <div>
          <img src="/src/assets/gold-medal.svg" alt="gold medal" width="40" />
        </div>
        <div>
          <img src="/src/assets/silver-medal.svg" alt="silver medal" width="40" />
        </div>
        <div>
          <img src="/src/assets/bronze-medal.svg" alt="bronze medal" width="40" />
        </div>
        <span class="font-medium">Total</span>
      </div>
    </div>

    <!-- Check if sports data is available -->
    <div v-if="sports && sports.length">
      <div>
        <SportRow v-for="sport in sports" :key="sport.sport" :sport="sport" />
      </div>
    </div>
    
    <!-- Show a message if no sports data is available -->
    <p v-else class="text-center text-lg font-medium text-gray-500">No sports information available.</p>
  </div>
</template>
