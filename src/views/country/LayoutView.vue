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

  <div v-else class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
    <div class="flex flex-row gap-2">
      <svg
        aria-hidden="true"
        role="status"
        class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#1C64F2"
        />
      </svg>
      Loading...
    </div>
  </div>
</template>
