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
        this.setForOrder(this.addresses[newId])
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
    IsActive (e) {
      this.toggleNewAddress(false)
      this.isActive = e
    },
    toggleNewAddress (open = null) {
      this.isActive = null
      this.errorLog = {...addressFields}
      this.newAddressData = {...addressFields}
      if (open === null) {
        this.newAddress = !this.newAddress
        return
      }
      this.newAddress = open
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
    createAddress (event) {
      event.target.disabled = true

      this.errorLog = {}
      if (!this.newAddressData.street) this.errorLog.street = 'Debes especificar una calle'
      if (!this.newAddressData.number) this.errorLog.number = 'Debes especificar un número'
      if (!this.newAddressData.commune) this.errorLog.commune = 'Debes especificar una comuna'

      if (Object.keys(this.errorLog).length === 0) {
        // Para poder usarlo dentro de los forEach().
        this.$store.dispatch('user/createAddress', this.newAddressData).then((response) => {
          if (this.inShoppingCart) {
            // Usa la dirección recién creada en la orden.
            this.setForOrder(response.data)
            this.setFavorite(response.data)
          }
          this.toggleNewAddress()
        }).catch((e) => {
          // Si hay errores, mostrarlos.
          this.$handleApiErrors(e, Object.keys(addressFields), this.errorLog)
          event.target.disabled = false
        })
      } else {
        event.target.disabled = false
      }
    }
  },
  created () {
    userAddressesAPI.getRegions().then((response) => {
      this.regionsList = response.data
    })
  }
}
