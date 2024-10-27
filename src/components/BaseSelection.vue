<script setup lang="ts">
 import { defineProps, withDefaults } from 'vue';
  
  interface BaseSelectionProps {
    label: string;
  }
  
  // Define props with default values
  const props = withDefaults(defineProps< BaseSelectionProps>(), {
    label: '',
  });
  
  // Define modelValue as the input model
  const modelValue = defineModel();

  </script>

<template>
  <!-- Dropdown for selecting continent -->
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">{{ props.label }}</label>
    <select
      v-model="modelValue"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    >
      <option value="" disabled>Select Continent</option>
      <option value="Asia">Asia</option>
      <option value="Africa">Africa</option>
      <option value="North America">North America</option>
      <option value="South America">South America</option>
      <option value="Europe">Europe</option>
      <option value="Australia">Australia</option>
      <option value="Antarctica">Antarctica</option>
    </select>
  </div>
</template>
