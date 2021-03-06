import MultiSelect from 'vue-multiselect'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  number: null,
  street: null,
  additional: null,
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
        this.newAddressData[key] = value
      }
    }
  })
  return computed
}

export default {
  props: ['address', 'multiSelectOptions'],
  components: { MultiSelect },
  data () {
    return {
      newAddressData: {...editableProps},
      errorLog: {...editableProps},
      value: []
    }
  },
  computed: {
    ...createComputedProps(editableProps)
  },
  methods: {
    isValid () {
      const vue = this
      return Object.keys(this.errorLog).every((key) => {
        return !vue.errorLog[key]
      })
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
    updateAddress (event) {
      if (!this.new_street) this.errorLog.street = 'Debes especificar una calle'
      if (!this.new_number) this.errorLog.number = 'Debes especificar un número'
      if (!this.new_commune) this.errorLog.commune = 'Debes especificar una comuna'

      if (!this.isValid()) {
        return
      }

      const buttons = event.target.querySelectorAll('button')
      buttons.forEach((button) => {
        button.disabled = true
      })

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
        this.$emit('updatedAddress', data)
        this.newAddressData = {...editableProps}
        this.errorLog = {...editableProps}
        this.close()
      }).catch((e) => {
        this.$handleApiErrors(e, Object.keys(editableProps), this.errorLog)

        buttons.forEach((button) => {
          button.disabled = true
        })
      })
    }
  }
}
