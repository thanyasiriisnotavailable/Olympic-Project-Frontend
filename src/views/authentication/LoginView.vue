<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
const router = useRouter()

import MyNavBar from '@/components/MyNavBar.vue'

const validationSchema = yup.object({
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})
const authStore = useAuthStore()

const { value: email} = useField<string>('email')
const { value: password} = useField<string>('password')
const onSubmit = handleSubmit((values) => {
  const messageStore = useMessageStore()
  authStore.login(values.email, values.password)
  .then(() => {
      router.push({ name: 'country' })
    })
    .catch((error) => {
      console.log("Login failed:", error)
    messageStore.updateMessage('could not login')
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
    })
})
</script>

<template>
  
  <div class="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-16 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">  
      <img
        class="mx-auto h-20 w-auto"
        src="/src/assets/Login user.png"
        alt="Your Company"
      />
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:text-3xl">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <InputText type="text" v-model="email" placeholder="Email address" :error="errors['email']" />
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-[#4274a3] hover:text-[#39658e]">
                Forgot password?
              </a>
            </div>
          </div>
          <InputText type="password" v-model="password" placeholder="Password" :error="errors['password']" />
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-[#4274a3] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>
      <p class="mt-8 text-center text-sm text-gray-500">
        Not a member?
        <a href="#" class="font-semibold text-[#4274a3] hover:text-[#39658e]">
          Try to register here
        </a>
      </p>
    </div>
  </div>
</template>