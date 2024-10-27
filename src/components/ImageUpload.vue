<script setup lang="ts">
import Uploader from 'vue-media-upload';
import { ref, defineProps, withDefaults, defineEmits } from 'vue';

interface CombinedProps {
  modelValue?: string;
  label?: string;
}

const props = withDefaults(defineProps<CombinedProps>(), {
  modelValue: '',
  label: '',
});

const emit = defineEmits(['update:modelValue']);

const media = ref(props.modelValue ? [{ name: props.modelValue }] : []);
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL);

const onChanged = (files: any) => {
  const singleFile = files[0];
  if (singleFile) {
    media.value = [singleFile];
    emit('update:modelValue', singleFile.name);
  }
};

const removeMedia = () => {
  media.value = [];
  emit('update:modelValue', '');
};
</script>

<template>
  <label v-if="props.label" class="block text-gray-700 text-sm font-semibold mb-2">
    {{ props.label }}
  </label>
  
  <Uploader
    v-if="media.length === 0"
    :server="uploadUrl"
    @change="onChanged"
    :multiple="false"
    :maxFiles="1"
  ></Uploader>
  
  <div v-else class="flex items-center space-x-3 mt-2">
    <img :src="media[0].name" alt="Uploaded" class="w-24 h-auto rounded-lg shadow-md"/>
    <button @click="removeMedia" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
      Remove
    </button>
  </div>
</template>