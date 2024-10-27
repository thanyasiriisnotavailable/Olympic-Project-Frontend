<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CountryService from '@/services/CountryService';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelection from '@/components/BaseSelection.vue';
import type { Country } from '@/types';
import ImageUpload from '@/components/ImageUpload.vue';

// State to store country data
const country = ref<Country>({
  orderNo: 0,
  id: '',
  name: '',
  flag: '',
  capital: '',
  language: '',
  continent: '',
  sports: [{ sport: '', gold: 0, silver: 0, bronze: 0 }],
  comments: [],
});

// Router for navigation
const router = useRouter();

// Save the country and navigate to the detail view
function saveCountry() {
  CountryService.saveCountry(country.value)
    .then((response) => {
      router.push({ name: 'detail-view', params: { id: response.data.id } });
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}

// Reset the form values
const cancel = () => {
  Object.assign(country.value, {
    orderNo: 0,
    id: '',
    name: '',
    flag: '',
    capital: '',
    language: '',
    continent: '',
    sports: [{ sport: '', gold: 0, silver: 0, bronze: 0 }],
    comments: [],
  });
};

// Add a new sport entry
const addSport = () => {
  country.value.sports.push({ sport: '', gold: 0, silver: 0, bronze: 0 });
};

// Remove a sport entry by index
const removeSport = (index: number) => {
  country.value.sports.splice(index, 1);
};
</script>

<template>
  <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div class="container max-w-screen-lg mx-auto">
      <h2 class="font-semibold text-xl text-gray-600 mb-4">Add New Country</h2>
      <div class="bg-white rounded shadow-lg p-4 md:p-8 mb-6">
        <form @submit.prevent="saveCountry" class="grid gap-4 text-sm grid-cols-1 md:grid-cols-2">
          <div class="mb-4">
            <BaseInput v-model="country.id" label="ISO Country Code" />
          </div>
          <div class="mb-4">
            <BaseInput v-model="country.name" label="Country Name" />
          </div>
          <div class="mb-4 ">
            <ImageUpload v-model="country.flag" label="Country Flag" />
          </div>
          <div class="mb-4">
            <BaseSelection v-model="country.continent" label="Select Continent" />
          </div>
          <div class="mb-4">
            <BaseInput v-model="country.capital" label="Capital City" />
          </div>
          <div class="mb-4">
            <BaseInput v-model="country.language" label="Official Language" />
          </div>
          

          <!-- Sports Section -->
          <div class="mb-4 md:col-span-2">
            <h3 class="font-semibold text-lg text-gray-600 mb-2">Sports</h3>
            <div v-for="(sport, index) in country.sports" :key="index" class="flex flex-col md:flex-row mb-4 items-center justify-between">
              <div class="flex-1 mr-2">
                <BaseInput v-model="sport.sport" label="Sport Name" />
              </div>
              <div class="flex space-x-4">
                <div class="flex flex-col">
                  <label class="text-sm">Gold Medals</label>
                  <BaseInput v-model="sport.gold" type="number" min="0" />
                </div>
                <div class="flex flex-col">
                  <label class="text-sm">Silver Medals</label>
                  <BaseInput v-model="sport.silver" type="number" min="0" />
                </div>
                <div class="flex flex-col">
                  <label class="text-sm">Bronze Medals</label>
                  <BaseInput v-model="sport.bronze" type="number" min="0" />
                </div>
              </div>
              <button
                @click.prevent="removeSport(index)"
                class="text-red-500 hover:text-red-700 font-bold mt-2 md:mt-0"
              >
                Delete
              </button>
            </div>
          </div>

          <!-- Add Sport Button -->
          <div class="mb-4 md:col-span-2">
            <button
              @click.prevent="addSport"
              class="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              + Add More Sports
            </button>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-between mt-6 md:col-span-2">
            <button
              type="submit"
              class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              @click.prevent="cancel"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
