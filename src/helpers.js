export default {
  install (Vue) {
    // Evalúa si el valor es numérico
    //
    // @param  value EL valor a evaluar.
    const isNumeric = function (value) {
      if (value === null || value === undefined) {
        return false
      }
      return !isNaN(value)
    }
    Vue.isNumeric = isNumeric
    Vue.prototype.$isNumeric = isNumeric

    // Busca de forma recursiva en un objeto sin necesidad de verificar
    // que todas las propiedades estén definidas.
    //
    // @param  nestedObj El objeto.
    // @param  pathArr   Un arreglo con las llaves de la ruta a buscar.
    const getNestedObject = function (nestedObj, pathArr) {
      return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, nestedObj)
    }
    Vue.getNestedObject = getNestedObject
    Vue.prototype.$getNestedObject = getNestedObject

    // Trae el primer error de un campo de la respuesta enviada por el api.
    // @param  e      La respuesta de axios.
    // @param  field  El campo del que se requiere el error.
    const getFirstError = function (e, field) {
      return this.$getNestedObject(e, ['response', 'data', 'errors', field, 0])
    }
    Vue.getFirstError = getFirstError
    Vue.prototype.$getFirstError = getFirstError

    /**
     * Procesa una respuesta de axios, incorporando los mensajes de
     * error de los campos dados en el diccionario de errores.
     *
     * Los errores que no sean de los campos dados se muestran en un
     * Modal.
     *
     * @param {*} error La respuesta de axios.
     * @param {string[]} fields Los campos para los que se agregan errores en ErrorLog.

     * @return {*} Diccionario con los errores de los campos dados, si alguno tenía.
     */
    const handleApiErrors = function (e, fields = [], errorLog = {}) {
      let hasFieldErrors = false
      fields.forEach((field) => {
        hasFieldErrors = true
        Vue.set(errorLog, field, this.$getFirstError(e, field))
      })

      // Si hay errores en los campos pasados, no mostrar Modal.
      if (hasFieldErrors) {
        return
      }

      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'alert',
          title: 'Ha habido un problema.',
          body: ''
        }
      }

      const errors = this.$getNestedObject(e, ['response', 'data', 'errors'])
      // En caso de otros errores en campos, mostrar sólo estos.
      if (errors) {
        Object.keys(errors).forEach((field) => {
          const messages = errors[field]
          modal.parameters.body += messages.join('\n')
        })
        this.$store.dispatch('ui/showModal', modal)
        return
      }

      const message = this.$getNestedObject(e, ['response', 'data', 'message'])
      // Si no hay errores en campos, mostrar error genérico.
      if (message) {
        modal.parameters.body += message
      }

      this.$store.dispatch('ui/showModal', modal)
    }
    Vue.handleApiErrors = handleApiErrors
    Vue.prototype.$handleApiErrors = handleApiErrors
  }
}
