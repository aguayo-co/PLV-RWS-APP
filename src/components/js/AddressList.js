import { mapState } from 'vuex'
import AddressEdit from '@/components/AddressEdit'
import userAddressesAPI from '@/api/userAddresses'

const addressFields = {
  address: null,
  region: null,
  city: null,
  zone: null
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
    ...mapState('cart', [
      'address'
    ]),
    cartAddressId: {
      get () {
        return this.address.id
      },
      set (newId) {
        this.setForOrder(this.addresses[newId])
      }
    },
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
      // Para poder usarlo dentro de los forEach().
      this.$store.dispatch('user/createAddress', this.newAddressData).then((response) => {
        if (this.inShoppingCart) {
          // Usa la dirección recién creada en la orden.
          this.setForOrder(response.data)
        }
        this.toggleNewAddress()
      }).catch((e) => {
        // Si hay errores, mostrarlos.
        this.$handleApiErrors(e, Object.keys(addressFields), this.errorLog)
      })
    }
  },
  created () {
    userAddressesAPI.getRegions().then((response) => {
      this.regionsList = response.data
    })
  }
}
