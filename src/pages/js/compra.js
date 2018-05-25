import { mapState } from 'vuex'
import CompraEnvioPago from '@/components/CompraEnvioPago'
import CompraDetalle from '@/components/CompraDetalle'
import CompraPagada from '@/components/CompraPagada'
import CompraPagando from '@/components/CompraPagando'
import orderAPI from '@/api/order'

export default {
  name: 'Compra',
  props: ['order_id'],
  data () {
    return {
      shoppingCartStep: null,
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
      return !this.order_id
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
    this.loadOrder()
  },
  methods: {
    loadOrder () {
      // Carga orden de URL si existe un a cargar.
      if (this.order_id) {
        orderAPI.load(this.order_id).then(response => {
          this.order = response.data
        })
      }
    }
  },
  watch: {
    'id' (to, from) {
      if (parseInt(to) === parseInt(this.order_id)) {
        this.$router.push({name: 'compra'})
      }
    },
    'status' (to, from) {
      if (to && to !== 10) {
        this.$router.push({name: 'compra', params: { order_id: to }})
      }
    },
    '$route' (to, from) {
      this.order = null
      this.$store.commit('cart/clear')
      this.$store.dispatch('cart/load', to.params.id).then(() => {
        this.loadOrder()
      })
    }
  }
}
