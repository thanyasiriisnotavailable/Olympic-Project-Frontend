import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null
    }),
    actions: {
        login(email: string, password: string) {
            return apiClient
                .post('/api/v1/auth/authenticate', {
                    username: email,
                    password: password
                })
                .then((response) => {
                    this.token = response.data.access_token
                    return response
                })
        }
    }
})