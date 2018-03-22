import axios from 'axios'

export default {
  install (Vue, store) {
    // Base Axios instance.
    const baseOptions = {
      baseURL: process.env.API_DOMAIN,
      headers: {
        Accept: 'application/json'
      }
    }
    Vue.axios = axios.create(baseOptions)
    Vue.prototype.$axios = Vue.axios

    // Authenticated Axios instance.
    const authOptions = {
      ...baseOptions
    }
    Vue.axiosAuth = axios.create(authOptions)
    Vue.prototype.$axiosAuth = Vue.axiosAuth
    // We intercept every request and add the current Bearer token.
    Vue.axiosAuth.interceptors.request.use(function (config) {
      const token = store.getters['user/token']

      config.headers = config.headers || {}
      config.headers.Authorization = 'Bearer ' + token
      return config
    })
  }
}
