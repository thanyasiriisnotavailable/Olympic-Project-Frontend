<script setup lang="ts">
import { computed } from 'vue'
import type { Country } from '@/types'
const props = defineProps<{
  country: Country
}>()
const totalMedals = computed(() => {
  return props.country.gold + props.country.silver + props.country.bronze
})
</script>
<template>
<RouterLink class="country-link" :to="{ name: 'detail-view', params: { id: country.id } }">
<div class="country-row">
<div class="country-data">
<div class="country-head">
<span class="order-number">{{ country.order }}</span>
<img
            :src="country.flag"
            :alt="country.name"
            class="country-flag"
            style="margin-right: 1rem"
          />
<span style="letter-spacing: 0.1rem">{{ country.name }}</span>
</div>
<span style="letter-spacing: 0.1rem">{{ country.gold }}</span>
<span style="letter-spacing: 0.1rem">{{ country.silver }}</span>
<span style="letter-spacing: 0.1rem">{{ country.bronze }}</span>
<span style="font-weight: bold; letter-spacing: 0.1rem">{{ totalMedals }}</span>
</div>
</div>
</RouterLink>
</template>
<style scoped>
.country-class {
  padding: 0.5rem 0 0;
}
.country-row {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}
.country-data {
  height: 3.5rem;
  font-size: 1.5rem;
  position: relative;
  column-gap: 0.625rem;
  padding: 0 1rem;
  grid-template-columns: minmax(0, 5.5fr) repeat(4, 1.5fr);
  align-items: center;
  display: grid;
  justify-items: center;
}
.country-head {
  display: grid;
  grid-template-columns: auto auto 1fr;
  justify-self: left;
  max-width: 100%;
  align-items: center;
}
.order-number {
  color: #001f54;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25rem;
  min-width: 0.75rem;
  text-align: left;
  margin-right: 4rem;
  font-style: bold;
}
.country-flag {
  width: 40px;
  height: auto;
}
.country-name {
  font-size: 18px;
  font-weight: 600;
  color: #001f54;
}
.medal-count {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}
.medal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.gold {
  background-color: #ffd700;
}
.silver {
  background-color: #c0c0c0;
}
.bronze {
  background-color: #cd7f32;
}
.total-medals {
  font-weight: bold;
  color: #001f54;
  font-size: 20px;
}
</style>