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
  images: [],
  capital: '',
  language: '',
  continent: '',
  sports: [{ sport: '', medals: { gold: 0, silver: 0, bronze: 0 } }],
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
    sports: [{ sport: '', medals: { gold: 0, silver: 0, bronze: 0 } }],
    comments: [],
  });
};

// Add a new sport entry
const addSport = () => {
  country.value.sports.push({ sport: '', medals: { gold: 0, silver: 0, bronze: 0 } });
};

// Remove a sport entry by index
const removeSport = (index: number) => {
  country.value.sports.splice(index, 1);
};
</script>

<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 class="text-2xl font-bold text-blue-700 mb-6">Add New Country</h2>
    <form @submit.prevent="saveCountry">
      <!-- Country Fields -->
      <BaseInput v-model="country.name" label="Country Name" />
      <BaseInput v-model="country.flag" label="Country Flag (URL)" />
      <ImageUpload v-model="country.images"></ImageUpload>
      <BaseInput v-model="country.capital" label="Capital City" />
      <BaseInput v-model="country.language" label="Official Language" />
      <BaseSelection 
        v-model="country.continent" 
        label="Select Continent"    />

      <!-- Sports Section -->
      <div v-for="(sport, index) in country.sports" :key="index" class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">Sport Name</label>
          <button
            @click.prevent="removeSport(index)"
            class="text-red-500 hover:text-red-700 font-bold"
          >
            Delete Sport
          </button>
        </div>
        <BaseInput v-model="sport.sport" label="Sport Name" />

        <div class="flex space-x-4">
          <BaseInput 
            v-model.number="sport.medals.gold" 
            label="Gold Medals" 
            type="number" 
            min="0" 
          />
          <BaseInput 
            v-model.number="sport.medals.silver" 
            label="Silver Medals" 
            type="number" 
            min="0" 
          />
          <BaseInput 
            v-model.number="sport.medals.bronze" 
            label="Bronze Medals" 
            type="number" 
            min="0" 
          />
        </div>
      </div>

      <!-- Add Sport Button -->
      <button
        @click.prevent="addSport"
        class="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        + Add More Sports
      </button>

      <!-- Form Actions -->
      <div class="flex justify-between mt-6">
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
</template>
