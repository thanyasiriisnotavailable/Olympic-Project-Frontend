import apiClient from "./AxiosClient"
import type { Country } from '@/types'

export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get(`/countries?_limit=${perPage}&_page=${page}`)
  },
  getCountry(id: string) {
    return apiClient.get('/countries/' + id)
  },
  saveCountry(country : Country){
    return apiClient.post('/countries',country)
  }
}
