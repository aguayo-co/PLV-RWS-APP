import { mapState } from 'vuex'
import shoppingCartAPI from '@/api/shoppingCart'
import CompraPayU from '@/components/CompraPayU'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  phone: null,
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
      'payment_method'
    ]),
    ...createComputedProps(editableProps),
    responseUrl () {
      const a = document.createElement('a')
      a.href = this.$router.resolve({name: 'compra', params: { id: this.id }}).href
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
      const paymentMethod = this.payment_method
      let request
      if (paymentMethod === 'pay_u') {
        request = this.setPayUPayment()
      }
      if (paymentMethod === 'transfer') {
        request = this.setTransferPayment()
      }
      request.catch((e) => {
        this.$handleApiErrors(e, [], this.errorLog)
      })
    },
    /**
     * Envía al usuario a PayU.
     */
    setPayUPayment () {
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
      const vm = this
      return shoppingCartAPI.getPayment('transfer').then((response) => {
        vm.$router.push({name: 'compra', params: { id: vm.id }})
      })
    }
  }
}
