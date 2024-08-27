<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Country } from '@/types'
const props = defineProps<{
  country: Country
}>()
const { country } = toRefs(props)
</script>
<template>
 <div class="country" v-if="country">
    <h1>ISO code :{{ country.id }}</h1>
        <p><b>name:</b> {{ country.name }}</p>
        <p><b>capital:</b> {{ country.capital }}</p>
        <p><b>language:</b> {{ country.language }}</p>
        <img
            :src="country.flag"
            :alt="country.name"
            class="w-auto h-10 border-2 border-black-500"
          />
   
</div>
</template>
