import { mapState } from 'vuex'

import CartStep from '@/components/CartStep'
import CompraDetalle from '@/components/CompraDetalle'
import CompraEnvioPago from '@/components/CompraEnvioPago'

export default {
  name: 'Compra',
  props: {
    step: {
      type: [String],
      default: null
    }
  },
  data () {
    return {
      loading: true,
      errors: {}
    }
  },
  components: {
    CartStep,
    CompraEnvioPago,
    CompraDetalle
  },
  computed: {
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
    queryCartId () {
      if (this.$isNumeric(this.$route.query.cartId)) {
        return parseInt(this.$route.query.cartId)
      }
    },
    hasChilexpress () {
      return Object.keys(this.sales).some((saleId) => {
        if (this.sales[saleId].is_chilexpress) {
          return true
        }
      })
    }
  },
  created () {
    // Elimina la posibilidad del usuario a volver a adelante.
    // Esto con le fin de que un usuario que volvió
    // De un método de pago no pueda volver a intentar el mismo
    // pago que ya debió ser cancelado.
    window.history.pushState(null, null)
    this.reloadShoppingCart()
  },
  methods: {
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
    setStep (newStep) {
      if (newStep === this.step) {
        return
      }
      this.$router.push({
        params: { step: newStep },
        query: { cartId: this.id }
      })
    },
    ensureCartId () {
      const cartId = this.id
      if (this.queryCartId !== cartId) {
        this.$router.push({query: { cartId: this.id }})
      }
    },
    reloadShoppingCart () {
      this.loading = true
      this.$store.commit('cart/clear')
      this.$store.dispatch('cart/load')
        .then(() => {
          if (!Object.keys(this.sales).length && this.step) {
            this.setStep(null)
          }
          this.ensureCartId()
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  watch: {
    '$route' () {
      this.ensureCartId()
    },
    'status' (status) {
      // If shoppingCart status is changed, then change to order URL.
      if (status && status !== 10) {
        this.$router.push({name: 'orden', params: { step: this.id }})
      }
    }
  }
}
