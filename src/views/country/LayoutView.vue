<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import type { Country } from '@/types'
import CountryService from '@/services/CountryService'
import { useCommentStore } from '@/stores/comment'
import { storeToRefs } from 'pinia'

const store = useCommentStore()
const { comment } = storeToRefs(store)

const country = ref<Country | null>(null)
const showFlashMessage = ref(false)

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const route = useRoute()

const submitComment = (e: Event) => {
  e.preventDefault()
  if (comment.value.trim()) {
    store.updateComment(comment.value)
    showFlashMessage.value = true

    setTimeout(() => {
      showFlashMessage.value = false
      store.resetComment()
    }, 3000)
  }
}

onMounted(() => {
  console.log('Mounted with props:', props)
  CountryService.getCountry(props.id)
    .then((response) => {
      country.value = response.data
    })
    .catch((error) => {
      console.error('There was an error fetching the country data!', error)
    })
})
</script>

<template>
  <div v-if="country" class="bg-gray-100 min-h-screen">
    <div>
      <nav class="flex items-center justify-between relative bg-[#034078] shadow-md py-4">
        <!-- Left Section: Button -->
        <div>
          <router-link
            :to="{ name: 'country' }"
            class="text-[#41bde0] text-2xl px-12 rounded font-black tracking-wider transition duration-150 ease-in-out hover:text-[#41bde0d6]"
          >
            Olympic Medal Table
          </router-link>
        </div>

        <!-- Right Section: Links (aligned to the right) -->
        <div class="ml-auto flex space-x-6">
          <router-link
            :to="{ name: 'detail-view', params: { id: props.id } }"
            :class="[
              'text-xl font-semibold transition duration-150 ease-in-out focus:outline-none hover:text-[#afb7c2]',
              route.name === 'detail-view' ? 'text-[#afb7c2]' : 'text-[#FEFCFB]'
            ]"
          >
            Country Details
          </router-link>
          <!-- Divider -->
          <div class="h-8 border-l-2 border-gray-400"></div>
          <router-link
            :to="{ name: 'sport-list-view', params: { id: props.id } }"
            :class="[
              'pr-12 text-xl font-semibold transition duration-150 ease-in-out focus:outline-none hover:text-[#afb7c2]',
              route.name === 'sport-list-view' ? 'text-[#afb7c2]' : 'text-[#FEFCFB]'
            ]"
          >
            Sports Table
          </router-link>
        </div>
      </nav>
    </div>

    <div>
      <RouterView :country="country" />
    </div>

    <!-- Comment cheer -->
    <div class="comment px-10 py-5 max-w-screen-lg mx-auto">
      <h3 class="text-xl font-bold mb-2">Cheer on your favorite athlete!</h3>
      <span v-if="showFlashMessage" class="text-[#30ba42]"
        >Thank you for sharing your positivity!</span
      >
      <form class="comment-form space-y-4" @submit="submitComment">
        <textarea
          v-model="comment"
          name="comment"
          placeholder="Leave a message of support..."
          class="w-full p-2 border rounded"
        ></textarea>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Comment
        </button>
      </form>

      <!-- Flash message -->
      <div v-if="showFlashMessage" id="flashMessage">
        <h4>{{ comment }}</h4>
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center min-h-screen">
    <p class="text-gray-700">Loading...</p>
  </div>
</template>

<style>
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#flashMessage {
  background-color: #4caf50; /* Green background */
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
  animation: fadeSlideIn 0.5s ease-in-out;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
