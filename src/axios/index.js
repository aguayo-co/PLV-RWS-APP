/* global FormData */
import axios from 'axios'

export default {
  install (Vue, store) {
    // Instancia base de Axios.
    const baseOptions = {
      baseURL: store.state.apiDomain,
      headers: {
        Accept: 'application/json'
      }
    }

    /**
     * Funciones de ayuda.
     */

    /**
     * Errores de acceso son manejados acá (403 o 401).
     * Los demás los dejamos pasar y deben ser manejados por quien hizo
     * la petición.
     */
    const baseErrorPopups = (error) => {
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

    /**
     * Si tenemos un FormData, enviar como multipart/form-data.
     * Y usar Post en vez de patch.
     */
    const isFormData = (config) => {
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data'

        if (config.method.toLowerCase() === 'patch') {
          config.method = 'post'
          config.data.append('_method', 'PATCH')
        }
      }
    }

    /**
     * Asegura que tengamos un token.
     */
    const ensureToken = (config) => {
      const token = store.getters['user/token']
      config.headers = config.headers || {}
      config.headers.Authorization = 'Bearer ' + token
    }

    /**
     * Declaración de instancias de Axios globales.
     */

    /**
     * Axios sin autenticación.
     */
    Vue.axios = axios.create(baseOptions)
    Vue.axios.interceptors.response.use(null, baseErrorPopups)
    Vue.axios.interceptors.request.use((config) => {
      isFormData(config)
      return config
    })
    Vue.prototype.$axios = Vue.axios

    /**
     * Axios autenticada.
     */
    const authOptions = {
      ...baseOptions
    }
    Vue.axiosAuth = axios.create(authOptions)
    Vue.axiosAuth.interceptors.response.use(null, baseErrorPopups)
    Vue.axiosAuth.interceptors.request.use((config) => {
      isFormData(config)
      ensureToken(config)
      return config
    })
    Vue.prototype.$axiosAuth = Vue.axiosAuth
  }
}
