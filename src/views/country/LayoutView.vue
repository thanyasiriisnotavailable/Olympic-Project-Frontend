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
  <div v-if="country" class="bg-[#f2efef] min-h-screen">
    <div>
      <nav
        class="flex items-center justify-between relative bg-[#141d64] shadow-md p-5 pb-3 md:px-5 md:py-2"
      >
        <!-- Left Section: Button -->
        <div>
          <router-link
            :to="{ name: 'country' }"
            class="text-[#ecc957] text-4xl rounded font-black tracking-wider transition duration-150 ease-in-out hover:text-[#ecc957d0] flex items-center space-x-5"
          >
            <!-- Olympic icon for mobile view -->
            <img src="/olympic-icon.png" alt="Olympic Icon" class="w-24 h-auto" />
            <!-- Olympic Medal Table text for desktop view -->
            <h1 class="hidden md:block">Olympic Medal Table</h1>
          </router-link>
        </div>

        <!-- Right Section: Links (aligned to the right) -->
        <div class="flex space-x-2 md:space-x-5">
          <!-- Details Button -->
          <router-link
            :to="{ name: 'detail-view', params: { id: props.id } }"
            :class="[
              'px-3 py-2 md:px-4 md:py-2 text-lg md:text-xl font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none',
              route.name === 'detail-view'
                ? 'bg-[#afb7c2] text-white text-sm cursor-default'
                : 'bg-[#FEFCFB] text-[#034078] text-lg hover:bg-[#858990] hover:text-white'
            ]"
            :disabled="route.name === 'detail-view'"
          >
            Details
          </router-link>

          <!-- Table Button -->
          <router-link
            :to="{ name: 'sport-list-view', params: { id: props.id } }"
            :class="[
              'px-2 py-2 md:px-4 md:py-2 md:text-xl font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none',
              route.name === 'sport-list-view'
                ? 'bg-[#afb7c2] text-white text-sm cursor-default'
                : 'bg-[#FEFCFB] text-[#034078] text-lg hover:bg-[#858990] hover:text-white'
            ]"
            :disabled="route.name === 'sport-list-view'"
          >
            Sport
          </router-link>
        </div>
      </nav>
    </div>

    <h1 class="text-center text-3xl font-bold my-6">{{ country.name }}</h1>
    <div class="flex space-x-2 md:space-x-5">
         
    </div>
    <div>
      <RouterView :country="country" />
    </div>

    <!-- Full Width Comment Section -->
    <div class="comment flex justify-center items-center mx-auto my-10 bg-[#4274a3]">
      <div class="comment-section flex w-full px-6 space-x-6">
        <!-- Comment Form (2/5) -->
        <form
          class="comment-form flex-shrink-0 w-2/5 space-y-4 px-6 py-5 bg-[#4274a3]"
          @submit="submitComment"
        >
          <h4 class="text-2xl font-bold mb-2 text-[#0e1736]">Cheer on your favorite athlete!</h4>
          <textarea
            name="comment"
            placeholder="Leave a message of support..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#404449]"
            rows="4"
          ></textarea>
          <button
            type="submit"
            class="w-full py-2 bg-[#0e1736] text-white rounded-lg hover:bg-[#0A1128] transition duration-200"
          >
            Comment
          </button>
        </form>

        <!-- Displaying Comments (3/5) -->
        <div class="comment-list flex-grow w-3/5 space-y-4 px-6 py-6 bg-[#4274a3]">
          <div class="w-full h-full bg-white p-4 rounded-lg shadow-md">
            <h4 class="text-xl font-semibold text-gray-700">Messages of Support:</h4>
            <div v-if="comments[country.id]?.length > 0" class="mt-4">
              <ul class="space-y-3">
                <li
                  v-for="(comment, index) in comments[country.id]?.slice().reverse()"
                  :key="index"
                  class="comment-item bg-gray-100 p-3 rounded shadow-sm border-l-4 border-[#404449] pl-3"
                >
                  {{ comment }}
                </li>
              </ul>
            </div>
            <div v-else class="text-gray-400 text-sm mt-4">
              <p class="text-base">Be the first to leave a comment!</p>
            </div>
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