<script setup lang="ts">
import CountryRow from '@/components/CountryRow.vue'
import type { Country } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CountryService from '@/services/CountryService'
const route = useRoute()
const router = useRouter()

const countries = ref<Country[] | null>(null)
const totalCountry = ref(0)

const perPageInput = ref(parseInt(route.query.perPage as string) || 5)
const perPage = computed(() => parseInt(route.query.perPage as string) || 5 || perPageInput.value)
const page = computed(() => parseInt(route.query.page as string) || 1)

const hasNextPage = computed(() => {
const totalPages = Math.ceil(totalCountry.value / perPage.value)
return page.value < totalPages
})
const updatePerPage = () => {
  router.push({ name: 'country', query: { page: 1, perPage: perPageInput.value } })
}


onMounted(() => {
watchEffect(() => {
  CountryService.getCountries(perPage.value, page.value)
    .then((response) => {
      countries.value = response.data
      totalCountry.value = parseInt(response.headers['x-total-count'])
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
})
</script>

<template>
  <div class="wallpaper">
    
    <h1>Olympic Medal Table</h1>
    <div class="table">

      <div class="perpage-box">
    <label for="perPage">Countries per Page: </label>

    <select  id="perPage"
      type="number"
      list="number-options"
      v-model="perPageInput">
      <option v-for="n in 20" :key="n" :value="n">{{ n }}</option>
      
    </select>
    <button @click="updatePerPage">Apply</button>
  </div>
  </div>
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
      <div class="flex w-[290px] mt-4">
      <RouterLink
        class="flex-1 text-blue-700 hover:underline text-left"
        :to="{ name: 'country', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        class="flex-1 text-blue-700 hover:underline text-right"
        :to="{ name: 'country', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
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
