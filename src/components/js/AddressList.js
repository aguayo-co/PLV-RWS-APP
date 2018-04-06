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
    AddressEdit
  },
  props: {
    inShoppingCart: {
      type: Boolean,
      default: false
    }
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
      'favorite_address_id',
      'addresses'
    ]),
    regions () {
      return Object.keys(this.regionsList)
    },
    cities () {
      const region = this.newAddressData.new_region
      const cities = this.$getNestedObject(this.regionsList, [region, 'children'])
      if (cities) {
        return Object.keys(cities)
      }
    },
    zones () {
      const region = this.newAddressData.new_region
      const city = this.newAddressData.new_city
      const zones = this.$getNestedObject(this.regionsList, [region, 'children', city, 'children'])
      if (zones) {
        return Object.keys(zones)
      }
    }
  },
  methods: {
    IsActive (e) {
      this.isActive = e
    },
    NotActive () {
      this.isActive = ''
    },
    toggleNewAddress (prop) {
      this.errorLog = {...addressFields}
      this.newAddressData = {...addressFields}
      this.newAddress = !this.newAddress
    },
    setFavorite (address) {
      const data = {
        favorite_address_id: address.id
      }
      this.$store.dispatch('user/update', data)
    },
    setForOrder (address) {
      const data = {
        address_id: address.id
      }
      this.$store.dispatch('cart/update', data)
    },
    createAddress () {
      let data = {}
      // Para poder usarlo dentro de los forEach().
      const vm = this
      // Agrega la información a enviar.
      Object.keys(addressFields).forEach(function (key) {
        data[key.replace('new_', '')] = vm.newAddressData[key]
      })
      this.$store.dispatch('user/createAddress', data).then((response) => {
        if (this.inShoppingCart) {
          // Usa la dirección recién creada en la orden.
          vm.setForOrder(response.data)
        }
        vm.toggleNewAddress()
      }).catch((e) => {
        // Si hay errores, mostrarlos.
        Object.keys(addressFields).forEach(function (key) {
          vm.errorLog[key] = vm.$getFirstError(e, key.replace('new_', ''))
        })
      })
    }
  },
  created () {
    const vm = this
    userAddressesAPI.getRegions().then((response) => {
      vm.regionsList = response.data
    })
  }
}
