import axios from 'axios'

export default {
  install (Vue, store) {
    // Base Axios instance.
    const baseOptions = {
      baseURL: store.state.apiDomain,
      headers: {
        Accept: 'application/json'
      }
    }

    const baseErrorPopups = function (error) {
      let modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'alert'
        }
      }
      if (error.response && error.response.status === 401) {
        modal.parameters.title = 'No estás autenticado.'
        store.dispatch('user/logOut', modal)
        store.dispatch('ui/showModal', modal)
      }
      if (error.response && error.response.status === 403) {
        modal.parameters.title = 'No tiene permiso para esto.'
        store.dispatch('ui/showModal', modal)
      }
      throw error
    }

    Vue.axios = axios.create(baseOptions)
    Vue.axios.interceptors.response.use(null, baseErrorPopups)
    Vue.prototype.$axios = Vue.axios

    // Authenticated Axios instance.
    const authOptions = {
      ...baseOptions
    }
    Vue.axiosAuth = axios.create(authOptions)
    Vue.axiosAuth.interceptors.response.use(null, baseErrorPopups)
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
