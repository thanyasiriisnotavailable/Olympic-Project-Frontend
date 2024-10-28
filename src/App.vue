<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingSpinner from '@/components/Loading.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MyNavBar from '@/components/MyNavBar.vue';

const isLoading = ref(false);
const router = useRouter();
const route = useRoute();

// Reactive property to control navbar visibility
const showNavBar = ref(true);

// Watch the route for changes to hide/show MyNavBar based on route name
watch(
  () => route.name,
  (newRouteName) => {
    showNavBar.value = !['not-found', 'network-error-view'].includes(newRouteName as string);
  },
  { immediate: true }
);

onMounted(() => {
  router.beforeEach((to, from, next) => {
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
      <!-- Conditionally render MyNavBar based on the showNavBar property -->
      <MyNavBar v-if="showNavBar" />
      <RouterView />
    </div>
  </div>
</template>
