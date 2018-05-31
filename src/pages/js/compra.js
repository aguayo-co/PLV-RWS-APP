import { mapState } from 'vuex'
import CompraEnvioPago from '@/components/CompraEnvioPago'
import CompraDetalle from '@/components/CompraDetalle'
import CompraPagada from '@/components/CompraPagada'
import CompraPagando from '@/components/CompraPagando'
import orderAPI from '@/api/order'

export default {
  name: 'Compra',
  props: {
    path: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      order: null
    }
  },
  components: {
    CompraEnvioPago,
    CompraDetalle,
    CompraPagada,
    CompraPagando
  },
  computed: {
    orderId () {
      if (this.$isNumeric(this.path)) {
        return parseInt(this.path)
      }
      return null
    },
    shoppingCartStep () {
      if (this.$isNumeric(this.path)) {
        return null
      }
      return this.path
    },
    // Data from the shopping cart.
    ...mapState('cart', [
      'id',
      'due',
      'status'
    ]),
    orderTotal () {
      return this.order ? this.order.due : this.due
    },
    // Page status.
    isShoppingCart () {
      return !this.orderId
    },
    isPayment () {
      return this.orderStatus === 20 && this.paymentStatus !== 1
    },
    isPayed () {
      return this.orderStatus === 30 || this.paymentStatus === 1
    },
    // Data about the loaded order.
    orderStatus () {
      return this.$getNestedObject(this.order, ['status'])
    },
    paymentStatus () {
      return this.$getNestedObject(this.order, ['payments', 0, 'status'])
    }
  },
  created: function () {
    this.reloadShoppingCart()
    this.loadOrder()
  },
  methods: {
    setShoppingCartStep (step) {
      if (step === this.shoppingCartStep) {
        return
      }
      this.$router.push({name: 'compra', params: { path: step }})
    },
    reloadShoppingCart () {
      this.$store.commit('cart/clear')
      this.$store.dispatch('cart/load')
    },
    loadOrder () {
      this.order = null
      // Carga orden de URL si existe una a cargar.
      if (this.orderId) {
        orderAPI.load(this.orderId).then(response => {
          this.order = response.data
        })
      }
    }
  },
  watch: {
    'id' (to, from) {
      // If the ID in the URL is the one from the shopping cart,
      // remove ID form url.
      if (parseInt(to) === parseInt(this.orderId)) {
        this.$router.push({name: 'compra'})
      }
    },
    'status' (to, from) {
      // If shoppingCart status is changed, then push ID to URL
      // to load the order.
      if (to && to !== 10) {
        this.$router.push({name: 'compra', params: { path: this.id }})
      }
    },
    'path' (to, from) {
      if (to === from) {
        return
      }

      // If we changed from order to shoppingCart or viceversa
      // reload the shopping cart.
      if (this.orderId || this.$isNumeric(from)) {
        this.reloadShoppingCart()
      }

      // When URL changes, reload shoppingCart
      // and get order form url.
      this.loadOrder()
    }
  }
}
