import { mapState } from 'vuex'
import AddressEdit from '@/components/AddressEdit'
import userAddressesAPI from '@/api/userAddresses'
import MultiSelect from 'vue-multiselect'

const addressFields = {
  number: null,
  street: null,
  additional: null,
  commune: null
}

export default {
  components: {
    AddressEdit,
    MultiSelect
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
    addressesList () {
      if (!this.inShoppingCart) {
        return this.addresses
      }

      const filteredAddresses = {}
      Object.keys(this.addresses).forEach((addressId) => {
        const address = this.addresses[addressId]
        if (address.can_deliver_chilexpress) {
          filteredAddresses[addressId] = address
        }
      })
      return Object.keys(filteredAddresses).length ? filteredAddresses : null
    },
    ...mapState('user', [
      'favorite_address_id',
      'addresses'
    ]),
    ...mapState('cart', [
      'address'
    ]),
    cartAddressId: {
      get () {
        return this.$getNestedObject(this.address, ['id'])
      },
      set (newId) {
        this.setForOrder(newId)
      }
    },
    multiSelectOptions: function () {
      const options = []
      Object.keys(this.regionsList).forEach((regionKey) => {
        const region = this.regionsList[regionKey]
        const provinces = region.children

        const option = {
          region: region.name,
          communes: []
        }

        Object.keys(provinces).forEach((provinceKey) => {
          const province = provinces[provinceKey]
          const communes = province.children

          Object.keys(communes).forEach((communeKey) => {
            const commune = communes[communeKey]
            option.communes.push(commune.name)
          })
        })

        options.push(option)
      })
      return options
    }
  },
  methods: {
    isValid () {
      const vue = this
      return Object.keys(this.errorLog).every((key) => {
        return !vue.errorLog[key]
      })
    },
    IsActive (e) {
      this.toggleNewAddress(false)
      this.isActive = e
    },
    toggleNewAddress (open = null) {
      this.isActive = null
      this.errorLog = {...addressFields}
      this.newAddressData = {...addressFields}
      // Si no tenemos una acci??n espec??fica, cambia estado actual.
      if (open === null) {
        this.newAddress = !this.newAddress
        return
      }
      this.newAddress = open
    },
    setFavorite (addressId) {
      const data = {
        favorite_address_id: addressId
      }
      this.$store.dispatch('user/update', data)
    },
    setForOrder (addressId) {
      const data = {
        address_id: addressId
      }
      this.$store.dispatch('cart/update', data)
    },
    createAddress (event) {
      if (!this.newAddressData.street) this.errorLog.street = 'Debes especificar una calle'
      if (!this.newAddressData.number) this.errorLog.number = 'Debes especificar un n??mero'
      if (!this.newAddressData.commune) this.errorLog.commune = 'Debes especificar una comuna'

      if (!this.isValid()) {
        return
      }

      const buttons = event.target.querySelectorAll('button')
      buttons.forEach((button) => {
        button.disabled = true
      })

      // Para poder usarlo dentro de los forEach().
      this.$store.dispatch('user/createAddress', this.newAddressData).then((response) => {
        if (this.inShoppingCart) {
          // Usa la direcci??n reci??n creada en la orden.
          this.setForOrder(response.data.id)
        }
        this.toggleNewAddress()
      }).catch((e) => {
        // Si hay errores, mostrarlos.
        this.$handleApiErrors(e, Object.keys(addressFields), this.errorLog)

        buttons.forEach((button) => {
          button.disabled = true
        })
      })
    }
  },
  created () {
    userAddressesAPI.getRegions().then((response) => {
      this.regionsList = response.data
    })
  }
}
