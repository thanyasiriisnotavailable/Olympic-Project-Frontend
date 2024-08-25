<script setup lang="ts">
import CountryRow from '@/components/CountryRow.vue'
import type { Country } from '@/types'
import { ref, onMounted } from 'vue'
import CountryService from '@/services/CountryService'

const countries = ref<Country[] | null>(null)

onMounted(() => {
  CountryService.getCountries()
    .then((response) => ((countries.value = response.data), console.log(countries.value)))
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div class="bg-034078 text-white py-15 px-5 w-full text-center mb-7 shadow-md h-[12rem] flex items-center justify-center">
    <h1 class="text-5xl font-bold m-0">Olympic Medal Table</h1>
  </div>
  <div class="box-border mb-11">
    <div class="grid items-center justify-items-center gap-x-2.5 h-14 text-xl px-4 grid-cols-[minmax(0,_5.5fr)_repeat(4,_1.5fr)] mx-16">
      <div class="flex items-center justify-self-start">
        <span class="mr-10 font-medium">Order</span>
        <span class="font-medium">NOCs</span>
      </div>
      <div>
        <img src="../assets/gold-medal.svg" alt="gold medal" width="40" />
      </div>
      <div>
        <img src="../assets/silver-medal.svg" alt="silver medal" width="40" />
      </div>
      <div>
        <img src="../assets/bronze-medal.svg" alt="bronze medal" width="40" />
      </div>
      <span class="font-medium">Total</span>
    </div>
    <div class="box-border">
      <CountryRow v-for="country in countries" :key="country.id" :country="country" />
    </div>
  </div>
</template>

<style scoped>
/* Custom colors */
.bg-034078 {
  background-color: #034078;
}
</style>