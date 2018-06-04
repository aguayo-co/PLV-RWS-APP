import { mapState } from 'vuex'
import shoppingCartAPI from '@/api/shoppingCart'
import CompraPayU from '@/components/CompraPayU'
import { mapFields } from 'vuex-map-fields'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  coupon_code: null
}

/**
 * Los valores de los formularios los almacenamos en local hasta
 * que se guarden en el servidor, en ese momento pasan a Vuex.
 * Con esto generamos una propiedad computada que trae el valor
 * original si el formulario no ha recibido ningún valor.
 *
 * @param {string[]} props El listado de propiedades a computar.
 */
function createComputedProps (props) {
  let computed = {}
  Object.keys(props).forEach(function (key) {
    computed['new_' + key] = {
      get: function () {
        return this.newOrderData[key] !== null ? this.newOrderData[key] : this[key]
      },
      set: function (value) {
        this.newOrderData[key] = value
      }
    }
  })
  return computed
}

export default {
  name: 'CompraDetalle',
  components: {
    CompraPayU
  },
  props: ['shoppingCartStep'],
  data () {
    return {
      payUPayment: null,
      newOrderData: {...editableProps},
      errorLog: {...editableProps},
      disabled: {...editableProps}
    }
  },
  computed: {
    couponValid () {
      return this.coupon_code && this.newOrderData.coupon_code === null
    },
    ...mapState('cart', [
      'id',
      'due',
      'used_credits',
      'total',
      'coupon_discount',
      'coupon_code',
      'phone',
      'shipping_cost',
      'sales'
    ]),
    ...mapFields([
      'cart.gateway'
    ]),
    ...createComputedProps(editableProps),
    responseUrl () {
      const a = document.createElement('a')
      a.href = this.$router.resolve({name: 'compra', params: { path: this.id }}).href
      return a.protocol + '//' + a.host + a.pathname + a.search + a.hash
    }
  },
  methods: {
    /**
     * Guarda el teléfono de la orden.
     */
    updateCouponCode () {
      this.disabled.coupon_code = true
      const data = {
        coupon_code: this.new_coupon_code
      }
      this.errorLog.coupon_code = null
      this.$store.dispatch('cart/update', data).then(() => {
        this.new_coupon_code = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['coupon_code'], this.errorLog)
      }).finally(() => {
        this.disabled.coupon_code = false
      })
    },
    /**
     * Continúa al siguiente paso de la compra.
     */
    nextStep () {
      if (this.shoppingCartStep === null) {
        this.continueToPaymentMethod()
        return
      }

      if (this.shoppingCartStep === 'medio-de-pago') {
        this.continueToPayment()
      }
    },
    validateShoppingCart () {
      const errors = []
      Object.keys(this.sales).some((saleId) => {
        if (!this.sales[saleId].shipping_method_id) {
          errors.push('No has seleccionado el método de envío de alguna vendedora.')
          return false
        }
      })

      if (!this.phone) {
        errors.push('No has seleccionado el teléfono de la orden.')
      }

      if (errors.length) {
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'alert',
            title: 'Ha habido un problema.',
            body: errors[0]
          }
        }
        // De vuelta al primer paso
        this.$emit('setShoppingCartStep', null)
        // Muestra modal después de cambiar de ruta,
        // de lo contrario se cierra con el cambio.
        this.$store.dispatch('ui/showModal', modal)
        return false
      }
      return true
    },
    continueToPaymentMethod () {
      if (!this.validateShoppingCart()) {
        return
      }
      this.$emit('setShoppingCartStep', 'medio-de-pago')
    },
    continueToPayment () {
      if (!this.validateShoppingCart()) {
        return
      }

      // Este es el último paso.
      const gateway = this.gateway
      if (!gateway) {
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'alert',
            title: 'Ha habido un problema.',
            body: 'No has seleccionado el método de pago.'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
        return
      }

      let request
      if (gateway === 'mercado_pago') {
        request = this.setMercadoPagoPayment()
      } else if (gateway === 'pay_u') {
        request = this.setPayUPayment()
      } else if (gateway === 'transfer') {
        request = this.setTransferPayment()
      } else if (gateway === 'free') {
        request = this.setTransferFree()
      }

      request.catch((e) => {
        this.$handleApiErrors(e)
      })
    },
    /**
     * Envía al usuario a MercadoPago.
     */
    setMercadoPagoPayment () {
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: 'Te estamos enviando a MercadoPago.',
          body: 'Por favor no refresques esta página.'
        }
      }
      this.$store.dispatch('ui/showModal', modal)
      let data = {
        'back_urls[success]': this.responseUrl,
        'back_urls[pending]': this.responseUrl,
        'back_urls[failure]': this.responseUrl
      }
      return shoppingCartAPI.getPayment('mercado_pago', data).then((response) => {
        window.location = response.data.request_data
      })
    },
    /**
     * Envía al usuario a PayU.
     */
    setPayUPayment () {
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: 'Te estamos enviando a PayU.',
          body: 'Por favor no refresques esta página.'
        }
      }
      this.$store.dispatch('ui/showModal', modal)
      return shoppingCartAPI.getPayment('pay_u').then((response) => {
        this.payUPayment = {
          ...response.data.request_data,
          responseUrl: this.responseUrl
        }
      })
    },
    /**
     * Genera pago de transferencia.
     */
    setTransferPayment () {
      this.$emit('setShoppingCartStep', null)
      return shoppingCartAPI.getPayment('transfer').then((response) => {
        this.$router.push({name: 'compra', params: { path: this.id }})
      })
    },
    /**
     * Genera pago de cuando el valor es 0.
     */
    setTransferFree () {
      this.$emit('setShoppingCartStep', null)
      return shoppingCartAPI.getPayment('free').then((response) => {
        this.$router.push({name: 'compra', params: { path: this.id }})
      })
    }
  },
  watch: {
    /**
     * Calcula un timeout sin modificación para guardar
     * used_credits en el back.
     *
     * Esto se eliminaría si se usa un botón para enviar el formulario.
     */
    due (newDue, oldDue) {
      if (newDue < 0) {
        this.gateway = null
      }

      if (this.gateway === 'free' && newDue > 0) {
        this.gateway = null
        return
      }

      if (this.gateway !== 'free' && newDue === 0) {
        this.gateway = null
      }
    }
  }
}
