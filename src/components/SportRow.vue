<script setup lang="ts">
import { computed } from 'vue'
import type { Sport } from '@/types'

const props = defineProps<{
  sport: Sport
}>()

const totalMedals = computed(() => {
  return props.sport.medals.gold + props.sport.medals.silver + props.sport.medals.bronze
})
</script>
<template>
  <div class="block transition-all duration-100 ease-in-out hover:bg-gray-300 active:bg-gray-400">
    <div class="py-2">
      <div
        class="grid grid-cols-[minmax(0,5.5fr)_repeat(4,1.5fr)] gap-2 items-center text-center px-4 h-16 border border-gray-300 rounded-md mx-16 my-0.5 bg-[#fbfbfd]"
      >
        <div class="flex items-center space-x-4">
          <span class="text-xl font-bold text-blue-900 mr-6 sm:mr-12 ml-4 flex justify-center">{{
            sport.sport
          }}</span>
          <span class="tracking-widest text-lg">{{ sport.medals.gold }}</span>
          <span class="tracking-widest text-lg">{{ sport.medals.silver }}</span>
          <span class="tracking-widest text-lg">{{ sport.medals.bronze }}</span>
          <span class="font-bold tracking-widest text-lg">{{ totalMedals }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
