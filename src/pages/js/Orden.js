import { mapState } from 'vuex'

import orderAPI from '@/api/order'
import CartStep from '@/components/CartStep'
import CompraCancelada from '@/components/CompraCancelada'
import CompraPago from '@/components/CompraPago'
import CompraTransferencia from '@/components/CompraTransferencia'

export default {
  name: 'Compra',
  props: ['orderId'],
  data () {
    return {
      loading: true,
      order: null,
      errors: {}
    }
  },
  components: {
    CartStep,
    CompraPago,
    CompraTransferencia,
    CompraCancelada
  },
  computed: {
    ...mapState('cart', {
      shoppingCartId: 'id'
    }),
    isInPayment () {
      // paymentStatus => 1 cuando es por transferencia y está pendiente
      // de validación por las administradoras.
      return this.orderStatus === 20 && this.paymentStatus !== 1
    },
    isTransfer () {
      return this.$getNestedObject(this.activePayment, ['gateway']) === 'Transfer'
    },
    isPayed () {
      // paymentStatus => 1 cuando es por transferencia y está pendiente
      // de validación por las administradoras.
      return this.orderStatus === 30 || this.paymentStatus === 1
    },
    isCanceled () {
      return this.orderStatus === 99
    },
    // Data about the loaded order.
    orderStatus () {
      return this.$getNestedObject(this.order, ['status'])
    },
    activePayment () {
      return this.$getNestedObject(this.order, ['active_payment'])
    },
    paymentStatus () {
      return this.$getNestedObject(this.activePayment, ['status'])
    }
  },
  created () {
    this.loadOrder()
  },
  methods: {
    processMercadoPagoCallback () {
      switch (this.$route.query.prilov_status) {
        case 'success':
          return orderAPI.mercadoPagoCallback(this.$route.query)

        // Envía al usuario devuelta al carro para que intente
        // El pago de nuevo.
        case 'failure':
          this.$router.push({
            name: 'compra',
            params: { step: 'medio-de-pago' },
            query: {cartId: this.orderId}
          })
      }
    },
    processPayUCallback () {
      switch (this.$route.query.polTransactionState) {
        case '4':
          return orderAPI.payUCallback(this.$route.query)

        // Envía al usuario devuelta al carro para que intente
        // El pago de nuevo.
        case '6':
          this.$router.push({
            name: 'compra',
            params: { step: 'medio-de-pago' },
            query: {cartId: this.orderId}
          })
      }
    },
    processGatewayCallback () {
      switch (this.$route.query.gateway) {
        case 'pay_u':
          return this.processPayUCallback()

        case 'mercado_pago':
          return this.processMercadoPagoCallback()
      }
    },
    async loadOrder () {
      this.loading = true
      this.order = null

      await this.processGatewayCallback()

      // Carga orden de URL si existe una a cargar.
      return orderAPI.load(this.orderId)
        .then(response => {
          const order = response.data
          // If shoppingCart status is changed, then push ID to URL
          // to load the order.
          if (order.status === 10) {
            this.$router.push({name: 'compra'})
            return
          }

          this.order = response.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
