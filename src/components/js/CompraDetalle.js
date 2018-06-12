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
  props: ['shoppingCartStep', 'errors'],
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
      'shipping_cost'
    ]),
    ...mapFields([
      'cart.gateway'
    ]),
    ...createComputedProps(editableProps),
    responseUrl () {
      const a = document.createElement('a')
      a.href = this.$router.resolve({name: 'compra', params: { path: this.id }, query: {gateway: this.gateway}}).href
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
        this.$emit('validate', null)
        if (Object.keys(this.errors).length) {
          return
        }
        this.continueToPaymentMethod()
        return
      }

      if (this.shoppingCartStep === 'medio-de-pago') {
        this.$emit('validate', 'medio-de-pago')
        if (Object.keys(this.errors).length) {
          return
        }
        this.continueToPayment()
      }
    },
    continueToPaymentMethod () {
      this.$emit('setShoppingCartStep', 'medio-de-pago')
    },
    continueToPayment () {
      // Este es el último paso.
      const gateway = this.gateway
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
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: 'Estamos confirmando tu compra.',
          body: 'Por favor no refresques esta página.'
        }
      }
      this.$store.dispatch('ui/showModal', modal)
      return shoppingCartAPI.getPayment('transfer').then((response) => {
        this.$router.push({name: 'compra', params: { path: this.id }})
      })
    },
    /**
     * Genera pago de cuando el valor es 0.
     */
    setTransferFree () {
      this.$emit('setShoppingCartStep', null)
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: 'Estamos confirmando tu compra.',
          body: 'Por favor no refresques esta página.'
        }
      }
      this.$store.dispatch('ui/showModal', modal)
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
