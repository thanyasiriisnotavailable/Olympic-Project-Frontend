import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/chartchai-class/project-1-tiramisu-cake',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  getCountries() {
    return apiClient.get('/countries')
  },
  getCountry(id: string) {
    return apiClient.get('/countries/' + id)
  }
}