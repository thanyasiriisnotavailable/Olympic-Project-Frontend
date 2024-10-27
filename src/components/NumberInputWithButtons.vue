<template>
  <div class="flex items-center space-x-1 w-full">
    <button
      @click="decrement"
      class="px-2 py-1 bg-gray-200 rounded"
      aria-label="Decrease value"
    >
      -
    </button>
    <input
      type="number"
      v-model.number="localValue"
      :aria-label="ariaLabel"
      class="w-16 text-center border border-gray-300 rounded p-1"
    />
    <button
      @click="increment"
      class="px-2 py-1 bg-gray-200 rounded"
      aria-label="Increase value"
    >
      +
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';

export default defineComponent({
  name: 'NumberInputWithButtons',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    ariaLabel: {
      type: String,
      default: 'Numeric input' // For better accessibility
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const localValue = ref(props.modelValue);

    const increment = () => {
      localValue.value++;
    };

    const decrement = () => {
      localValue.value = Math.max(localValue.value - 1, props.min);
    };

    watch(localValue, (newVal) => {
      emit('update:modelValue', newVal);
    });

    watch(
      () => props.modelValue,
      (newVal) => {
        localValue.value = newVal;
      }
    );

    return { localValue, increment, decrement };
  }
});
</script>

<style scoped>
/* Optional custom styling */
input {
  min-width: 4rem;
  text-align: center;
}
</style>
