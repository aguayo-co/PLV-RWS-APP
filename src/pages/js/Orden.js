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
      // Only send callback if rejected or approved.
      // Other states wait for PayU to send callback.
      const state = this.$route.query.collection_status
      if (['approved'].indexOf(state) === -1) {
        return
      }

      return orderAPI.mercadoPagoCallback(this.$route.query)
    },
    processPayUCallback () {
      // Only send callback if rejected or approved.
      // Other states wait for PayU to send callback.
      const state = this.$route.query.transactionState
      if (['4', '6'].indexOf(state) === -1) {
        return
      }

      return orderAPI.payUCallback(this.$route.query)
    },
    processGatewayCallback () {
      switch (this.$route.query.gateway) {
        case 'pay_u':
          return this.processPayUCallback()

        case 'mercado_pago':
          return this.processMercadoPagoCallback()
      }
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
            if (vm.hasChilexpress && !vm.address) vm.$set(vm.errors, 'address', 'No has seleccionado una dirección.')
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
