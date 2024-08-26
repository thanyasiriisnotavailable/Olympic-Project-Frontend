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
  <div class="bg-034078 text-white py-15 px-5 w-full text-center mb-7 shadow-md h-[12rem] flex items-center justify-center">
    <h1 class="text-5xl font-bold m-0">Olympic Medal Table</h1>
    <div class="table">
      <div class="perpage-box">
        <label for="perPage">Countries per Page: </label>

        <select id="perPage" type="number" list="number-options" v-model="perPageInput">
          <option v-for="n in 20" :key="n" :value="n">{{ n }}</option>
        </select>
        <button @click="updatePerPage">Apply</button>
      </div>
    </div>
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
/* Custom colors */
.bg-034078 {
  background-color: #034078;
}
</style>
