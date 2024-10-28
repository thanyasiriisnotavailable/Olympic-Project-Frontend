<script setup lang="ts">
import { toRefs, defineProps, reactive } from 'vue'
import type { Country, Sport } from '@/types'
import NumberInputWithButtons from '@/components/NumberInputWithButtons.vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const props = defineProps<{
  country: Country
}>()

const { country } = toRefs(props)
const sports = country.value?.sports ?? []

const newSport = reactive<Sport>({
  sport: '',
  gold: 0,
  silver: 0,
  bronze: 0
})

function addSport() {
  if (newSport.sport.trim()) {
    sports.push({ ...newSport })
    newSport.sport = ''
    newSport.gold = 0
    newSport.silver = 0
    newSport.bronze = 0
  }
}

function confirmRemove(index: number) {
  if (confirm('Are you sure you want to remove this sport?')) {
    removeSport(index)
  }
}

function removeSport(index: number) {
  sports.splice(index, 1)
}
// Function to handle submission of all changes
function Update() {
  router.push({ name: 'sport-list-view', params: { id: country.value.id } })
}
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div
    class="m-6 md:m-12 md:mt-8 md:mx-48 p-5 border border-gray-300 rounded-lg shadow-lg bg-[#2bb0b033]"
  >
    <!-- Sports Header -->
    <div class="box-border py-2">
      <div
        class="grid items-center justify-items-center h-auto text-xl pb-4 gap-x-4 border-b-2 border-[#afb2b8] md:mx-16 grid-cols-[2fr_repeat(4,_1fr)_1fr]"
      >
        <span class="text-lg md:text-2xl font-bold md:font-extrabold md:pr-10">Sport</span>
        <img src="/src/assets/gold-medal.svg" alt="gold medal" class="w-6 md:w-10" />
        <img src="/src/assets/silver-medal.svg" alt="silver medal" class="w-6 md:w-10" />
        <img src="/src/assets/bronze-medal.svg" alt="bronze medal" class="w-6 md:w-10" />
        <span class="text-lg md:text-2xl font-bold md:font-extrabold pr-2">Total</span>
      </div>
    </div>

    <!-- List of Sports -->
    <transition-group name="fade" tag="div" class="space-y-4 md:mx-16">
      <div
        v-for="(sport, index) in sports"
        :key="sport.sport"
        class="grid grid-cols-[2fr_repeat(4,_1fr)_1fr] gap-x-4 items-center text-center h-16 border border-gray-300 rounded-md bg-[#fbfbfd] p-2"
      >
        <span class="text-base md:text-xl font-medium text-blue-900">{{ sport.sport }}</span>
        <NumberInputWithButtons v-model="sport.gold" :min="0" ariaLabel="Gold Medals" />
        <NumberInputWithButtons v-model="sport.silver" :min="0" ariaLabel="Silver Medals" />
        <NumberInputWithButtons v-model="sport.bronze" :min="0" ariaLabel="Bronze Medals" />
        <span class="text-xl font-bold text-blue-900">{{
          sport.gold + sport.silver + sport.bronze
        }}</span>

        <button @click="confirmRemove(index)" class="text-red-500 hover:text-red-700 font-bold">
          Remove
        </button>
      </div>
    </transition-group>

    <p v-if="!sports.length" class="text-center text-lg font-medium text-gray-500 mt-4">
      No sports information available.
    </p>

    <!-- Add New Sport Form -->
    <div class="mt-6 md:mx-16 grid grid-cols-[2fr_repeat(4,_1fr)_1fr] gap-x-4 items-center">
      <input
        v-model="newSport.sport"
        type="text"
        placeholder="Sport name"
        class="border p-2 rounded text-base md:text-xl font-medium text-blue-900"
      />
      <NumberInputWithButtons v-model="newSport.gold" :min="0" ariaLabel="Gold Medals" />
      <NumberInputWithButtons v-model="newSport.silver" :min="0" ariaLabel="Silver Medals" />
      <NumberInputWithButtons v-model="newSport.bronze" :min="0" ariaLabel="Bronze Medals" />
      <span></span>
      <!-- Placeholder to align with total column -->
      <button @click="addSport" class="p-2 bg-blue-500 text-white rounded">Add</button>
    </div>
  <div class="mt-6 flex justify-center">
    <button
      @click="Update"
      class="w-64 p-3 bg-green-500 text-white rounded hover:bg-green-600"
      >
      Update
    </button>
  </div>
    </div>
 
</template>
