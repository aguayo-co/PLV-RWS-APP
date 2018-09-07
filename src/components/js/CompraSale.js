export default {
  name: 'CompraSale',
  props: ['sale', 'errors'],
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
        this.$emit('isProcessing', 'shippingMethod' + saleId)
        this.$emit('clearError', 'shippingMethod' + saleId)
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
          this.$emit('isProcessing', 'shippingMethod' + saleId, false)
        })
      }
    }
  },
  beforeDestroy () {
    this.$emit('isProcessing', 'shippingMethod' + this.sale.id, false)
    // Cuando se elimina el último producto de esta venta,
    // no se alcanza a disparar el evento de removeProduct()...finally()
    // así que disparamos acá.
    Object.keys(this.sale.products).forEach(id => {
      this.$emit('isProcessing', 'removeProduct' + id, false)
    })
  },
  methods: {
    removeProduct (product) {
      const name = 'removeProduct' + product.id
      this.$emit('isProcessing', name)
      this.$store.dispatch('cart/removeProduct', product)
        .finally(() => {
          // No se dispara correctamente cuando es el último producto
          // de la lista.
          this.$emit('isProcessing', name, false)
        })
    },
    shippingMethods (sale) {
      const filteredShippingMethods = []
      const shippingMethods = sale.user_shipping_methods
      Object.keys(shippingMethods).forEach(function (key) {
        const shippingMethod = shippingMethods[key]

        // Skip Chilexpress if sale does not allow it.
        if (shippingMethod.slug.includes('chilexpress') && sale.allow_chilexpress === false) {
          return
        }

        filteredShippingMethods.push(shippingMethod)
      })
      return filteredShippingMethods
    }
  }
}
