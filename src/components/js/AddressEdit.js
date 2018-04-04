// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  address: null,
  region: null,
  city: null,
  zone: null
}

/**
 * Los valores de los formularios los almacenamos en local hasta
 * que se guarden en el servidor, en ese momento pasan a Vuex.
 * Con esto generamos una propiedad computada que trae el valor
 * original si el formulario no ha recibido ningún valor.
 *
 * @param {string[]} props El listado de propiedades a computar.
 */
function createComputedProps (props) {
  let computed = {}
  Object.keys(props).forEach(function (key) {
    computed['new_' + key] = {
      get: function () {
        return this.newAddressData[key] !== null ? this.newAddressData[key] : this.address[key]
      },
      set: function (value) {
        // Dispara cambio en el campo. Con esto los hijos son cambiados a valor vacío.
        this.changed(key)
        this.newAddressData[key] = value
      }
    }
  })
  return computed
}

export default {
  props: ['address', 'regionsList'],
  data () {
    return {
      newAddressData: {...editableProps},
      errorLog: {...editableProps}
    }
  },
  computed: {
    ...createComputedProps(editableProps),
    regions: function () {
      return Object.keys(this.regionsList)
    },
    cities: function () {
      const region = this.new_region
      const cities = this.$getNestedObject(this.regionsList, [region, 'children'])
      if (cities) {
        return Object.keys(cities)
      }
    },
    zones: function () {
      const region = this.new_region
      const city = this.new_city
      const zones = this.$getNestedObject(this.regionsList, [region, 'children', city, 'children'])
      if (zones) {
        return Object.keys(zones)
      }
    }
  },
  methods: {
    // Asegura que el campo se considere vacío cuando le padre cambia.
    changed (field) {
      if (field === 'region') {
        this.new_city = false
      }
      if (field === 'city') {
        this.new_zone = false
      }
    },
    close () {
      this.errorLog = {...editableProps}
      this.newAddressData = {...editableProps}
      this.$emit('close')
    },
    deleteAddress () {
      let data = {
        id: this.address.id
      }
      this.$store.dispatch('user/deleteAddress', data)
    },
    updateAddress () {
      let data = {
        id: this.address.id
      }
      // Para poder usarlo dentro de los forEach().
      const vm = this
      // Agrega la información a enviar.
      Object.keys(editableProps).forEach(function (key) {
        data[key] = vm['new_' + key]
      })
      // Guarda la dirección
      this.$store.dispatch('user/updateAddress', data).then(() => {
        // Elimina datos locales, para que se usen los de Vuex
        vm.newAddressData = {...editableProps}
        vm.errorLog = {...editableProps}
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
