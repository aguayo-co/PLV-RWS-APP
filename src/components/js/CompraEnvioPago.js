import { mapState } from 'vuex'
import AddressList from '@/components/AddressList'
import CompraSale from '@/components/CompraSale'
import { mapFields } from 'vuex-map-fields'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  phone: null,
  used_credits: null,
  shipping_information: null
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
  name: 'CompraEnvioPago',
  components: {
    AddressList,
    CompraSale
  },
  props: ['shoppingCartStep'],
  data () {
    return {
      userDataTimeout: null,
      editPhone: false,
      newOrderData: {...editableProps},
      errorLog: {...editableProps},
      disabled: {...editableProps}
    }
  },
  computed: {
    ...mapState('cart', [
      'sales',
      'address',
      ...Object.keys(editableProps)
    ]),
    ...mapFields([
      'cart.gateway'
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
    toggle (prop) {
      this[prop] = !this[prop]
    },
    /**
     * Guarda el teléfono de la orden.
     */
    updatePhone () {
      const data = {
        phone: this.new_phone
      }
      this.errorLog.phone = null
      this.$store.dispatch('cart/update', data).then(() => {
        this.toggle('editPhone')
        // Obliga a usar valores de Vuex.
        this.new_phone = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['phone'], this.errorLog)
      })
    },
    /**
     * Guarda el teléfono de la orden.
     */
    updateUsedCredits () {
      this.disabled.used_credits = true
      const data = {
        used_credits: this.new_used_credits || 0
      }
      this.errorLog.used_credits = null
      this.$store.dispatch('cart/update', data).then(() => {
        this.new_used_credits = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['used_credits'], this.errorLog)
      }).finally(() => {
        this.disabled.used_credits = false
      })
    },
    updateShippingInformation (address) {
      const data = {
        address_id: address.id
      }
      this.$store.dispatch('cart/update', data)
    }
  },
  watch: {
    /**
     * Calcula un timeout sin modificación para guardar
     * used_credits en el back.
     *
     * Esto se eliminaría si se usa un botón para enviar el formulario.
     */
    new_used_credits: function (newUsedCredits, oldUsedCredits) {
      window.clearTimeout(this.userDataTimeout)
      this.errorLog.used_credits = null
      // Si usa lo que ya había asignado, no hacer nada.
      if (parseInt(this.new_used_credits) === parseInt(this.used_credits)) {
        this.new_used_credits = null
        return
      }
      // No permite más de lo disponible.
      if (parseInt(this.new_used_credits) > parseInt(this.credits)) {
        this.errorLog.used_credits = 'Estás usando más créditos de los disponibles.'
        // Actualiza due en el state.
        this.$store.commit('cart/setUsedCredits', 0)
        return
      }
      this.userDataTimeout = window.setTimeout(() => {
        this.updateUsedCredits()
      }, 2000)
      // Actualiza due en el state.
      this.$store.commit('cart/setUsedCredits', newUsedCredits)
    }
  }
}
