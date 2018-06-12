import { mapState } from 'vuex'
import CompraEnvioPago from '@/components/CompraEnvioPago'
import CompraDetalle from '@/components/CompraDetalle'
import CompraPago from '@/components/CompraPago'
import CompraTransferencia from '@/components/CompraTransferencia'
import CompraCancelada from '@/components/CompraCancelada'
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
      order: null,
      errors: {}
    }
  },
  components: {
    CompraEnvioPago,
    CompraDetalle,
    CompraPago,
    CompraTransferencia,
    CompraCancelada
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
      'status',
      'sales',
      'address',
      'gateway',
      'phone'
    ]),
    orderTotal () {
      return this.order ? this.order.due : this.due
    },
    // Page status.
    isShoppingCart () {
      return !this.orderId
    },
    isPayment () {
      // paymentStatus => 1 cuando es por transferencia y está pendiente
      // de validación por las administradoras.
      return this.orderStatus === 20 && this.paymentStatus !== 1
    },
    isTransfer () {
      return this.isPayment && this.$getNestedObject(this.order, ['payments', 0, 'gateway']) === 'Transfer'
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
    paymentStatus () {
      return this.$getNestedObject(this.order, ['payments', 0, 'status'])
    }
  },
  created: function () {
    this.reloadShoppingCart()
    const loadOrderPromise = this.loadOrder()

    if (!loadOrderPromise) {
      return
    }

    loadOrderPromise.then(() => {
      if (this.$route.query.gateway) {
        this.processGatewayCallback()
      }
    })
  },
  methods: {
    processGatewayCallback () {
      // If Order already is out fo payment step, do nothing.
      if (!this.isPayment) {
        return
      }

      // For now, only process PayU callbacks.
      if (this.$route.query.gateway !== 'pay_u') {
        return
      }

      // Only send callback if rejected or approved.
      // Other states wait for PayU to send callback.
      const state = this.$route.query.transactionState
      if (['4', '6'].indexOf(state) === -1) {
        return
      }

      orderAPI.payUCallback(this.$route.query).then(() => {
        this.loadOrder()
      })
    },
    /**
     * Ejecuta validaciones para el proceso de pago.
     * Cada validación debe pertenecer a un paso.
     * Cada validación es responsable por eliminar y poner errores.
     */
    validate (finalStep) {
      const vm = this
      Object.keys(this.errors).forEach(key => {
        vm.$delete(vm.errors, key)
      })
      const validations = [
        {
          _step: null,
          phone () {
            if (!vm.phone) vm.$set(vm.errors, 'phone', 'El teléfono es obligatorio.')
          },
          address () {
            if (!vm.address) vm.$set(vm.errors, 'address', 'No has seleccionado una dirección.')
          },
          /**
           * Valida que se haya seleccionado método de envío para cada Sale.
           */
          shippingMethods () {
            Object.keys(vm.sales).some((saleId) => {
              if (!vm.sales[saleId].shipping_method_id) {
                vm.$set(vm.errors, 'shippingMethod' + saleId, 'No has seleccionado el método de envío.')
              }
            })
          }
        },
        {
          _step: 'medio-de-pago',
          gateway () {
            if (!vm.gateway) vm.$set(vm.errors, 'gateway', 'Tienes que seleccionar un método de pago.')
          }
        }
      ]

      // Itera por todos los pasos.
      // Si encuentra errores en alguno, manda al usuario a ese paso y
      // detiene la validación.
      // Usa "some" y no "forEach" para poder romper el loop.
      validations.some(stepValidations => {
        Object.keys(stepValidations).forEach(validation => {
          if (typeof stepValidations[validation] === 'function') stepValidations[validation]()
        })

        // Rompe cuando encuentra errores en un paso.
        if (Object.keys(vm.errors).length) {
          this.setShoppingCartStep(stepValidations._step)
          return true
        }

        // Termina en el paso solicitado.
        if (finalStep === stepValidations._step) {
          return true
        }
      })
    },
    clearError (field) {
      this.$delete(this.errors, field)
    },
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
        return orderAPI.load(this.orderId).then(response => {
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
