<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import type { Country } from '@/types'
import CountryService from '@/services/CountryService'
import { useCommentStore } from '@/stores/comment'
import { storeToRefs } from 'pinia'

const store = useCommentStore()
const { comments } = storeToRefs(store)

const country = ref<Country | null>(null)

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const route = useRoute()

const submitComment = (e: Event) => {
  e.preventDefault()
  const commentInput = (e.target as HTMLFormElement).comment as HTMLTextAreaElement
  const newComment = commentInput.value.trim()

  if (newComment && country.value) {
    store.addComment(country.value.id, newComment) // Pass country ID when adding a comment
    commentInput.value = ''
  }
}

onMounted(() => {
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

      <!-- Comment Form -->
      <form class="comment-form space-y-4" @submit="submitComment">
        <textarea
          name="comment"
          placeholder="Leave a message of support..."
          class="w-full p-2 border rounded"
        ></textarea>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Comment
        </button>
      </form>

      <!-- Displaying Comments for the Current Country -->
      <div v-if="comments[country.id]?.length" class="mt-6 space-y-4">
        <h4 class="text-lg font-semibold">Messages of Support:</h4>
        <ul>
          <li
            v-for="(comment, index) in comments[country.id]"
            :key="index"
            class="bg-white p-4 rounded shadow"
          >
            {{ comment }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center min-h-screen">
    <p class="text-gray-700">Loading...</p>
  </div>
</template>
