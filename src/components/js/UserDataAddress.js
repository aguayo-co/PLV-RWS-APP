// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  address: null,
  region: null,
  zone: null
}

// Los valores de los formularios los almacenamos en local
// hasta que se guarden en el servidor, en ese momento
// pasan a Vuex.
// Con esto generamos una propiedad computada
// Que trae el valor original si el formulario no
// ha recibido ningún valor.
function createComputedProps (props) {
  let computed = {}
  Object.keys(props).forEach(function (key) {
    computed['new_' + key] = {
      get: function () {
        return this.newAddressData[key] !== null ? this.newAddressData[key] : this.address[key]
      },
      set: function (value) {
        this.newAddressData[key] = value
      }
    }
  })
  return computed
}

export default {
  props: ['address'],
  data () {
    return {
      newAddressData: {...editableProps},
      errorLog: {...editableProps}
    }
  },
  computed: {
    ...createComputedProps(editableProps)
  },
  methods: {
    close () {
      this.$emit('close')
    },
    deleteAddress () {
      let data = {
        id: this.address.id
      }

      // Crea el objeto a enviar.
      this.$store.dispatch('user/deleteAddress', data)
    },
    updateAddress () {
      let data = {
        id: this.address.id
      }
      // Para poder usarlo dentro de los forEach().
      const vm = this

      // Crea el objeto a enviar.
      Object.keys(editableProps).forEach(function (key) {
        data[key] = vm['new_' + key]
      })
      // Guarda la dirección
      this.$store.dispatch('user/updateAddress', data).then(() => {
        // Elimina datos locales, para que se usen los de Vuex
        Object.keys(editableProps).forEach(function (key) {
          vm[key] = null
        })
        this.close()
      }).catch((e) => {
        // Si hay errores, mostrarlos.
        Object.keys(editableProps).forEach(function (key) {
          vm.errorLog[key] = vm.$getFirstError(e, key)
        })
      })
    }
  }
}
