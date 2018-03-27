import { mapState } from 'vuex'
import AddressEdit from '@/components/AddressEdit'
import userAddressesAPI from '@/api/userAddresses'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const addressFields = {
  new_address: null,
  new_region: null,
  new_city: null,
  new_zone: null
}

export default {
  components: {
    'address-edit': AddressEdit
  },
  data () {
    return {
      isActive: '',
      regionsList: {},
      newAddress: false,
      newAddressData: {...addressFields},
      errorLog: {...addressFields}
    }
  },
  computed: {
    ...mapState('user', [
      'addresses'
    ]),
    regions: function () {
      return Object.keys(this.regionsList)
    },
    cities: function () {
      const region = this.newAddressData.new_region
      const cities = this.$getNestedObject(this.regionsList, [region, 'children'])
      if (cities) {
        return Object.keys(cities)
      }
    },
    zones: function () {
      const region = this.newAddressData.new_region
      const city = this.newAddressData.new_city
      const zones = this.$getNestedObject(this.regionsList, [region, 'children', city, 'children'])
      if (zones) {
        return Object.keys(zones)
      }
    }
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
  },
  created: function () {
    this.$store.dispatch('user/loadAddresses')
    const vm = this
    userAddressesAPI.getRegions().then((response) => {
      vm.regionsList = response.data
    })
  }
}
