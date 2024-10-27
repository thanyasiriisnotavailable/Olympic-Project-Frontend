<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingSpinner from '@/components/Loading.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MyNavBar from '@/components/MyNavBar.vue'

const isLoading = ref(false);
const router = useRouter();
const route = useRoute();

onMounted(() => {
  router.beforeEach((to, from, next) => {
    // Determine if the current route or the next route is detail-view or sport-list-view
    const isFromDetailToSport = from.name === 'detail-view' && to.name === 'sport-list-view';
    const isFromSportToDetail = from.name === 'sport-list-view' && to.name === 'detail-view';
    const isFromLayoutToDetailOrSport = from.name === 'layout-view' && (to.name === 'detail-view' || to.name === 'sport-list-view');

    // Show loading spinner unless navigating between Detail and Sport views
    isLoading.value = !(isFromDetailToSport || isFromSportToDetail || isFromLayoutToDetailOrSport);
    
    next();
  });

  router.afterEach(() => {
    // Hide the loading spinner after a short delay
    setTimeout(() => {
      if (isLoading.value) {
        isLoading.value = false;
      }
    }, 500);
  });
});
</script>

<template>
  <div>
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <MyNavBar />
      <RouterView />
    </div>
  </div>
</template>