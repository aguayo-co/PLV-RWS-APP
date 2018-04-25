import { mapGetters } from 'vuex'

export default {
  name: 'CompraSale',
  props: ['sale'],
  data () {
    return {
      new_shipping_method_id: null
    }
  },
  computed: {
    shipping_method_id: {
      get () {
        return this.new_shipping_method_id || this.sale.shipping_method_id
      },
      set (shippingMethodId) {
        this.new_shipping_method_id = shippingMethodId
        const saleId = this.sale.id
        const data = {sales: {}}
        data.sales[saleId] = {
          shipping_method_id: shippingMethodId
        }
        this.$store.dispatch('cart/update', data).catch(() => {
          const modal = {
            name: 'ModalMessage',
            parameters: {
              type: 'alert',
              title: 'No pudimos cambiar tu método de envío. Intenta nuevamente.'
            }
          }
          this.$store.dispatch('ui/showModal', modal)
        }).finally(() => {
          this.new_shipping_method_id = null
        })
      }
    }
  },
  methods: {
    removeProduct (product) {
      this.$store.dispatch('cart/removeProduct', product)
    }
  }
}
