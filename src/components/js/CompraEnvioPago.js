import { mapState, mapGetters } from 'vuex'
import AddressList from '@/components/AddressList'
import CompraSale from '@/components/CompraSale'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  phone: null
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
    computed['order_' + key] = {
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
  name: 'CompraEnvioPago',
  components: {
    'address-list': AddressList,
    'compra-sale': CompraSale
  },
  data () {
    return {
      editPhone: false,
      newOrderData: {...editableProps},
      errorLog: {...editableProps}
    }
  },
  computed: {
    ...mapState('cart', [
      'sales'
    ]),
    ...mapGetters('cart', [
      'address',
      'phone'
    ]),
    ...mapState('user', [
      'credits'
    ]),
    ...createComputedProps(editableProps)
  },
  methods: {
    /**
     * Cambia la propiedad data entre true/false.
     */
    toggle: function (prop) {
      this[prop] = !this[prop]
    },
    /**
     * Guarda el teléfono de la orden.
     */
    updatePhone: function () {
      const data = {
        phone: this.order_phone
      }
      this.$store.dispatch('cart/update', data).then(() => {
        this.toggle('editPhone')
        // Obliga a usar valores de Vuex.
        this.order_phone = null
        this.errorLog.phone = null
      }).catch((e) => {
        this.errorLog.phone = this.$getFirstError(e, 'phone')
      })
    }
  }
}
