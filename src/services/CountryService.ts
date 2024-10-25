import axios from 'axios'
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get(`/countries?_limit=${perPage}&_page=${page}`)
  },
  getCountry(id: string) {
    return apiClient.get('/countries/' + id)
  }
}
