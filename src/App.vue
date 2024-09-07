<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingSpinner from '@/components/Loading.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isLoading = ref(false);

const router = useRouter();

onMounted(() => {
 
  router.beforeEach((to, from, next) => {
    isLoading.value = true;
    next();
  });


  router.afterEach(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 500); 
  });
});
</script>

<template>
  <div>
    <div v-if="isLoading" class="">
      <LoadingSpinner />
    </div>
    <div v-else>
      <RouterView />
    </div>
  </div>
</template>
