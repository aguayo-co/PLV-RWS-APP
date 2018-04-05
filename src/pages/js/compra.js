import { mapState, mapGetters } from 'vuex'
import CompraEnvioPago from '@/components/CompraEnvioPago'

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
  name: 'Compra',
  components: {
    CompraEnvioPago
  },
  created: function () {
    this.$store.dispatch('cart/load')
  },
  data () {
    return {
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
      'total',
      'coupon_discount',
      'coupon_code'
    ]),
    ...createComputedProps(editableProps)
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
      this.$store.dispatch('cart/update', data).then(() => {
        this.new_coupon_code = null
        this.errorLog.coupon_code = null
      }).catch((e) => {
        this.errorLog.coupon_code = this.$getFirstError(e, 'coupon_code')
      }).finally(() => {
        this.disabled.coupon_code = false
      })
    }
  }
}
