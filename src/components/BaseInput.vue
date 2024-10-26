<script setup lang="ts">
  import { defineProps, withDefaults,  } from 'vue';
  
  interface BaseInputProps {
    label: string;
  }
  
  // Define props with default values
  const props = withDefaults(defineProps<BaseInputProps>(), {
    label: '',
  });
  
  // Define modelValue as the input model
  const modelValue = defineModel();

  </script>
<template>
  <div class="mb-4">
    <!-- Render label if provided -->
    <label v-if="label" class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
        v-model="modelValue"
        :placeholder="props.label"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
</template>
