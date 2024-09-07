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
  <div>
    <div class="py-2">
      <div
      class="grid grid-cols-[minmax(0,4.5fr)_repeat(4,1.5fr)] gap-2 items-center text-center h-16 md:mx-16 border border-gray-300 rounded-md bg-[#fbfbfd]"
      >
        <span class="md:pr-20 text-base md:text-xl font-medium text-blue-900">{{ sport.sport }}</span>
        <span class="tracking-widest text-base md:text-lg">{{ sport.medals.gold }}</span>
        <span class="tracking-widest text-base md:text-lg">{{ sport.medals.silver }}</span>
        <span class="tracking-widest text-base md:text-lg">{{ sport.medals.bronze }}</span>
        <span class="font-bold tracking-widest text-base md:text-lg pr-4">{{ totalMedals }}</span>
      </div>
    </div>
  </div>
</template>
