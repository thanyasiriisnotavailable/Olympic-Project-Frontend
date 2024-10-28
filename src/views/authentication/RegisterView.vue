<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
const router = useRouter()
const authStore = useAuthStore()

const validationSchema = yup.object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const { errors, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }
})

const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const username = firstname; // Bind username to firstname dynamically

const onSubmit = handleSubmit(async (values) => {
    try {
        // Pass username as firstname
        const user = {
            ...values,
            username: values.firstname // Set username to equal firstname
        }

        await authStore.register(user.email, user.password, user.firstname, user.lastname, user.username)
        console.log(user.email, user.password, user.firstname, user.lastname, user.username)

        messageStore.updateMessage('Registration successful! Please log in.')
        setTimeout(() => {
            messageStore.resetMessage()
            router.push({ name: 'login' }) // Redirect to the login page after successful registration
        }, 3000);
    } catch (error) {
        messageStore.updateMessage('Registration failed: ' + error.response.data.message)
        setTimeout(() => {
            messageStore.resetMessage()
        }, 3000);
    }
})
</script>


<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register a new account
            </h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onSubmit">
                <div>
                    <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <InputText v-model="firstname" placeholder="First Name" :error="errors['firstname']" />
                </div>
                <div>
                    <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <InputText v-model="lastname" placeholder="Last Name" :error="errors['lastname']" />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <InputText v-model="email" type="email" placeholder="Email address" :error="errors['email']" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <InputText v-model="password" type="password" placeholder="Password" :error="errors['password']" />
                </div>
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-[#4274a3] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#39658e]">
                        Sign up
                    </button>
                </div>
            </form>
            <p class="mt-10 text-center text-sm text-gray-500">
                Already a member?
                <router-link to="/login" class="font-semibold leading-6 text-[#4274a3] hover:text-[#39658e]"> Login here</router-link>
            </p>
        </div>
    </div>
</template>