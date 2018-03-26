import { mapState } from 'vuex'
import AddressEdit from '@/components/AddressEdit'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const addressFields = {
  new_address: null,
  new_region: null,
  new_zone: null
}

export default {
  components: {
    'address-edit': AddressEdit
  },
  data () {
    return {
      isActive: '',
      newAddress: false,
      newAddressData: {...addressFields},
      errorLog: {...addressFields}
    }
  },
  computed: {
    ...mapState('user', [
      'addresses'
    ])
  },
  created: function () {
    this.$store.dispatch('user/loadAddresses')
  },
  methods: {
    IsActive: function (e) {
      this.isActive = e
    },
    NotActive: function () {
      this.isActive = ''
    },
    toggleNewAddress: function (prop) {
      this.errorLog = {...addressFields}
      this.newAddressData = {...addressFields}
      this.newAddress = !this.newAddress
    },
    createAddress: function () {
      let data = {}
      // Para poder usarlo dentro de los forEach().
      const vm = this
      // Agrega la información a enviar.
      Object.keys(addressFields).forEach(function (key) {
        data[key.replace('new_', '')] = vm.newAddressData[key]
      })
      this.$store.dispatch('user/createAddress', data).then(() => {
        vm.toggleNewAddress()
      }).catch((e) => {
        // Si hay errores, mostrarlos.
        Object.keys(addressFields).forEach(function (key) {
          vm.errorLog[key] = vm.$getFirstError(e, key.replace('new_', ''))
        })
      })
    }
  }
}
