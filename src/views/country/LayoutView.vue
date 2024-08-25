<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import type { Country } from '@/types'
import CountryService from '@/services/CountryService'
const country = ref<Country | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
onMounted(() => {
  console.log('Mounted with props:', props)
  CountryService.getCountry(props.id)
    .then((response) => {
      country.value = response.data
    })
    .catch((error) => {
      console.error('There was an error fetching the passenger data!', error)
    })
})
</script>
<template>
  <div class="airline" v-if="country">
    <RouterView :country="country" />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
