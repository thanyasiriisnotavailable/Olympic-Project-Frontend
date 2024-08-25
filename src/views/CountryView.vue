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
  <div class="wallpaper">
    <h1>Olympic Medal Table</h1>
  </div>
  <div class="table" style="box-sizing: border-box;">
    <div class="table-header">
      <div class="noc"> 
        <span style="margin-right: 1rem;" >Order</span>
        <span>NOCs</span>
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
      <span>Totals</span>
    </div>
    <div class="countries" style="box-sizing: border-box;">
      <CountryRow v-for="country in countries" :key="country.id" :country="country" />
    </div>
  </div>
</template>

<style scoped>
.table-header {
  height: 3.5rem;
  font-size: 1.5rem;
  position: relative;
  column-gap: 0.625rem;
  padding: 0 1rem;
  grid-template-columns: minmax(0, 5.5fr) repeat(4, 1.5fr);
  align-items: center;
  display: grid;
  justify-items: center;
}

.noc {
  display: flex;
  align-items: center;
  justify-self: left;
}
</style>
