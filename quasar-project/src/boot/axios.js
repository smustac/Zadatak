import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Create an Axios instance with your backend URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Express backend URL
  headers: {
    'Content-Type': 'application/json'
  }
})

export default boot(({ app }) => {
  // Make axios and api available globally via this.$axios / this.$api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
