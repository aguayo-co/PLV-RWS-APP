export default {
  install (Vue) {
    // Busca recursivamente en un objeto sin necesidad de verificar
    // que todas las propiedades estén definidas.
    //
    // @param  nestedObj El objeto.
    // @param  pathArr   Un arreglo con las llaves de la ruta a buscar.
    const getNestedObject = (nestedObj, pathArr) => {
      return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, nestedObj)
    }
    Vue.prototype.$getNestedObject = getNestedObject

    // Trae el primer error de un campo de la respuesta enviada por el api.
    // @param  e      La respuesta de axios.
    // @param  field  El campo del que se requiere el error.
    const getFirstError = (e, field) => {
      return Vue.prototype.$getNestedObject(e, ['response', 'data', 'errors', field, 0])
    }
    Vue.prototype.$getFirstError = getFirstError
  }
}
