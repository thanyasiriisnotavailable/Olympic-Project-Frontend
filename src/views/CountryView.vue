<script setup lang="ts">
import CountryRow from '@/components/CountryRow.vue';
import type { Country } from '@/types';
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CountryService from '@/services/CountryService';
const route = useRoute();
const router = useRouter();

const countries = ref<Country[] | null>(null);
const totalCountry = ref(0);

const perPageInput = ref<number | null>(parseInt(route.query.perPage as string) || 5); // Initialize from the query param

const perPage = computed(() => perPageInput.value ?? 5);

const page = computed(() => parseInt(route.query.page as string) || 1);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalCountry.value / perPage.value);
  return page.value < totalPages;
});

const updatePerPage = () => {
  router.push({ name: 'country', query: { page: 1, perPage: perPageInput.value } });
};

onMounted(() => {
  watchEffect(() => {
    countries.value = null;
    CountryService.getCountries(perPage.value, page.value)
      .then((response) => {
        countries.value = response.data;
        totalCountry.value = parseInt(response.headers['x-total-count']);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  });
});

watch(perPageInput, () => {
  updatePerPage();
});

const isDropdownVisible = ref(false); // State to manage dropdown visibility

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
</script>

<template>
  <div class="bg-[#141d64] text-[#ecc957] py-15 px-5 w-full text-center mb-7 shadow-md h-auto flex flex-col items-center justify-center">
    <h1 class="text-3xl md:text-5xl font-bold m-0 pt-5">Olympic Medal Table</h1>
    <div class="perpage-box mt-4 mx-5 w-full md:w-1/2 justify-items-center relative left-[24%] translate-x-[-24%]">
      <div class="w-full px-4 mb-3">
        <div class="flex flex-col items-center relative">
          <div class="w-full">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded w-full md:w-1/2">
              <!-- Make input read-only and trigger dropdown on click -->
              <div
                id="perPageInput"
                class="p-1 px-2 appearance-none outline-none w-full text-gray-800 cursor-pointer"
                @click="toggleDropdown"
              >
                {{ perPageInput }} countries per page
              </div>
              <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                <button @click="toggleDropdown" class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up w-4 h-4" :class="{'rotate-180 transition-transform duration-300 ease-in-out': isDropdownVisible}">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- Dropdown with selection options -->
          <div v-if="isDropdownVisible" class="absolute shadow bg-white top-full z-40 left-0 rounded max-h-60 overflow-y-auto w-full md:w-6/12">
            <div class="flex flex-col w-full">
              <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-[#468bd9]" v-for="n in 20" :key="n" @click="perPageInput = n; isDropdownVisible = false">
                <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100 text-[#001f54] hover:text-[#FEFCFB] hover:font-bolder">
                  <div class="w-full items-center flex">
                    <div class="mx-2 -mt-1">{{ n }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="box-border mb-11">
    <div class="grid items-center justify-items-center gap-x-2.5 h-14 text-lg md:text-xl px-6 md:px-4 md:mx-16 grid-cols-[minmax(0,_5.5fr)_repeat(4,_1.5fr)] font-medium">
      <div class="flex items-center justify-self-start">
        <span class="mr-4 sm:mr-10">Order</span>
        <span>NOCs</span>
      </div>
      <div>
        <img src="../assets/gold-medal.svg" alt="gold medal" class="w-8 md:w-8 lg:w-10" />
      </div>
      <div>
        <img src="../assets/silver-medal.svg" alt="silver medal" class="w-8 md:w-8 lg:w-10" />
      </div>
      <div>
        <img src="../assets/bronze-medal.svg" alt="bronze medal" class="w-8 md:w-8 lg:w-10" />
      </div>
      <span>Total</span>
    </div>
    <div class="box-border">
      <CountryRow v-for="country in countries" :key="country.id" :country="country" />
      <div class="flex justify-between gap-2 md:px-16 py-2 px-1">
        <!-- Prev Page Button -->
        <RouterLink
          v-if="page > 1"
          :to="{ name: 'country', query: { page: page - 1, perPage: perPageInput } }"
          class="inline-flex items-center border border-[#4274a3] px-3 py-1.5 rounded-md text-[#4274a3] hover:bg-[#c9d3dd] bg-indigo-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span class="ml-1 font-bold text-lg">Back</span>
        </RouterLink>

        <!-- Next Page Button -->
        <RouterLink
          v-if="hasNextPage"
          :to="{ name: 'country', query: { page: page + 1, perPage: perPageInput } }"
          class="inline-flex items-center border border-[#4274a3] px-3 py-1.5 rounded-md text-[#FEFCFB] hover:bg-[#31618e] bg-[#4274a3] ml-auto"
        >
          <span class="mr-1 font-bold text-lg">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
