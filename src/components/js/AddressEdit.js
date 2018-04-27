// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  number: null,
  street: null,
  additional: null,
  region: null,
  province: null,
  commune: null
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
    provinces: function () {
      const region = this.new_region
      const provinces = this.$getNestedObject(this.regionsList, [region, 'children'])
      if (provinces) {
        return Object.keys(provinces)
      }
    },
    communes: function () {
      const region = this.new_region
      const province = this.new_province
      const communes = this.$getNestedObject(this.regionsList, [region, 'children', province, 'children'])
      if (communes) {
        return Object.keys(communes)
      }
    }
  },
  methods: {
    // Asegura que el campo se considere vacío cuando le padre cambia.
    changed (field) {
      if (field === 'region') {
        this.new_province = false
      }
      if (field === 'province') {
        this.new_commune = false
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
        this.newAddressData = {...editableProps}
        this.errorLog = {...editableProps}
        this.close()
      }).catch((e) => {
        this.$handleApiErrors(e, Object.keys(editableProps), this.errorLog)
      })
    }
  }
}
