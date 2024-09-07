<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'
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
const router = useRouter()
const submitComment = (e: Event) => {
  e.preventDefault()
  const commentInput = (e.target as HTMLFormElement).comment as HTMLTextAreaElement
  const newComment = commentInput.value.trim()

  if (newComment && country.value) {
    store.addComment(country.value.id, newComment)
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
  <div v-if="country" class="bg-[#f2efef] min-h-screen ">
    <div>
      <nav class="flex items-center justify-between relative  bg-[#141d64] shadow-md p-5 pb-1 md:p-10 ">
        <!-- Left Section: Button -->
        <div>
          <router-link
            :to="{ name: 'country' }"
            class="text-[#dbc26c] text-4xl px-4 sm:px-12 rounded font-black tracking-wider transition duration-150 ease-in-out hover:text-[#41bde0d6] flex items-center"
          >
            <!-- Olympic icon for mobile view -->
            <img src="/olympic-icon.png" alt="Olympic Icon" class="w-24 h-auto block sm:hidden" />
            <!-- Olympic Medal Table text for desktop view -->
            <span class="hidden sm:block">Olympic Medal Table</span>
          </router-link>
        </div>

        <!-- Right Section: Links (aligned to the right) -->
        <div class=" flex space-x-4 ">
          <router-link
            :to="{ name: 'detail-view', params: { id: props.id } }"
            :class="[
              'text-xl font-semibold transition duration-150 ease-in-out focus:outline-none hover:text-[#afb7c2]',
              route.name === 'detail-view' ? 'text-[#afb7c2]' : 'text-[#FEFCFB]'
            ]"
          >
            Details
          </router-link>
          <!-- Divider -->
          <div class="h-8 border-l-2 border-gray-400"></div>
          <router-link
            :to="{ name: 'sport-list-view', params: { id: props.id } }"
            :class="[
              'text-xl font-semibold transition duration-150 ease-in-out focus:outline-none hover:text-[#afb7c2]',
              route.name === 'sport-list-view' ? 'text-[#afb7c2]' : 'text-[#FEFCFB]'
            ]"
          >
            Table
          </router-link>
        </div>
      </nav>
    </div>

    <div>
      <RouterView :country="country" />
    </div>

    <!-- Comment cheer -->
    <div class="comment flex justify-center items-center mx-auto my-10 max-w-screen-lg">
      <div
        class="comment-section px-6 mb-6 flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6 lg:w-full"
      >
        <!-- Comment Form -->
        <form
          class="comment-form w-full space-y-4 px-6 py-5 bg-[#95bbde] rounded-lg shadow-lg"
          @submit="submitComment"
        >
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
        <div class="comment-list w-full space-y-4 px-6 py-6 bg-[#95bbde] rounded-lg shadow-lg">
          <div class="w-full h-full bg-white p-4 rounded-lg shadow-md">
            <h4 class="text-xl font-semibold text-gray-700">Messages of Support:</h4>

            <!-- Scrollable comment items -->
            <div
              v-if="comments[country.id]?.length > 0"
              :class="[
                'comment-items mt-4',
                comments[country.id].length > 2 ? 'overflow-y-auto max-h-48' : ''
              ]"
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
              v-if="comments[country.id]?.length > 2"
              class="text-right text-gray-400 text-sm mt-2"
            >
              <p class="text-base font-medium">Scroll for more...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
</template>
