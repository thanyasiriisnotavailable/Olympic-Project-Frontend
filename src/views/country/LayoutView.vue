<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

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
const router = useRouter()
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
      if (error.response && error.response.status === 404) {
        router.push({
          name: '404-resource-view',
          params: { resource: 'country' }
        })
      } else {
        router.push({ name: 'network-error-view' })
      }
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
    <div class="comment px-6 py-5 max-w-screen-lg mx-auto bg-[#95bbde] rounded-lg shadow-lg">
      <div class="comment-section flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <!-- Comment Form -->
        <form class="comment-form w-full md:w-1/2 space-y-4" @submit="submitComment">
          <h4 class="text-2xl font-bold mb-2 text-gray-800">Cheer on your favorite athlete!</h4>
          <textarea
            name="comment"
            placeholder="Leave a message of support..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#404449]"
            rows="4"
          ></textarea>
          <button
            type="submit"
            class="w-full py-2 bg-[#404449] text-white rounded-lg hover:bg-[#0A1128] transition duration-200"
          >
            Comment
          </button>
        </form>

        <!-- Displaying Comments for the Current Country -->
        <div class="comment-list w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h4 class="text-xl font-semibold text-gray-700">Messages of Support:</h4>

          <!-- Scrollable comment items -->
          <div
            v-if="comments[country.id]?.length > 0"
            class="comment-items overflow-y-auto max-h-48 mt-4"
          >
            <ul class="space-y-3">
              <!-- Display all comments, but limit the visible height -->
              <li
                v-for="(comment, index) in comments[country.id]?.slice().reverse()"
                :key="index"
                class="comment-item bg-gray-100 p-3 rounded shadow-sm border-l-4 border-[#404449] pl-3"
              >
                {{ comment }}
              </li>
            </ul>
          </div>
          <!-- Message when no comments are available -->
          <div v-else class="text-gray-400 text-sm mt-4">
            <p class="text-base">Be the first to leave a comment!</p>
          </div>

          <!-- Scroll indicator for more comments -->
          <div
            v-if="comments[country.id]?.length > 3"
            class="text-right text-gray-400 text-sm mt-2"
          >
            <p class="text-base font-medium">Scroll for more...</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center min-h-screen">
    <p class="text-gray-700">Loading...</p>
  </div>
</template>
