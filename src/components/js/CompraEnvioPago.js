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
  props: ['step', 'errors', 'hasChilexpress'],
  data () {
    return {
      userDataTimeout: null,
      editPhone: false,
      newOrderData: { ...editableProps },
      errorLog: { ...editableProps },
      disabled: { ...editableProps },
      savingPhone: false
    }
  },
  computed: {
    allErrors () {
      return { ...this.errorLog, ...this.errors }
    },
    editingPhone () {
      return this.editPhone || !this.phone
    },
    ...mapState('cart', [
      'due',
      'sales',
      'address',
      ...Object.keys(editableProps)
    ]),
    ...mapFields([
      'cart.gateway'
    ]),
    ...mapState('user', {
      credits: 'credits',
      favorite_address_id: 'favorite_address_id',
      default_phone: 'phone'
    }),
    ...createComputedProps(editableProps)
  },
  methods: {
    /**
     * Cambia la propiedad data entre true/false.
     */
    toggleEditPhone () {
      if (!this.phone) {
        this.editPhone = true
      }
      this.editPhone = !this.editPhone
    },
    /**
     * Guarda el teléfono de la orden.
     */
    updatePhone () {
      this.$emit('clearError', 'phone')
      if (!this.new_phone) {
        this.errorLog.phone = 'Este campo es requerido.'
        return
      }
      this.$emit('isProcessing', 'phone')
      this.savingPhone = true

      const data = {
        phone: this.new_phone
      }
      this.errorLog.phone = null
      this.$store.dispatch('cart/update', data).then(() => {
        this.editPhone = false
        // Obliga a usar valores de Vuex.
        this.new_phone = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['phone'], this.errorLog)
      }).finally(() => {
        this.$emit('isProcessing', 'phone', false)
        this.savingPhone = false
      })
    },
    /**
     * Guarda el teléfono de la orden.
     */
    updateUsedCredits () {
      this.$emit('isProcessing', 'credits')
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
        this.$emit('isProcessing', 'credits', false)
        this.disabled.used_credits = false
      })
    },
    // Si una dirección se actualiza, se usa cómo dirección de la orden.
    updateShippingInformation (address) {
      this.$emit('isProcessing', 'address')
      this.$emit('clearError', 'address')
      const data = {
        address_id: address.id
      }
      this.$store.dispatch('cart/update', data)
        .finally(() => {
          this.$emit('isProcessing', 'address', false)
        })
    }
  },
  watch: {
    gateway () {
      this.$emit('clearError', 'gateway')
    },
    /**
     * Calcula un timeout sin modificación para guardar
     * used_credits en el back.
     *
     * Esto se eliminaría si se usa un botón para enviar el formulario.
     */
    new_used_credits (newUsedCredits, oldUsedCredits) {
      if (parseInt(newUsedCredits) === parseInt(oldUsedCredits)) {
        return
      }

      window.clearTimeout(this.userDataTimeout)
      this.errorLog.used_credits = null

      // No permite más de lo disponible.
      if (parseInt(this.new_used_credits) > parseInt(this.credits)) {
        this.new_used_credits = parseInt(this.credits)
        return
      }

      // Actualiza State.
      this.$store.commit('cart/setUsedCredits', newUsedCredits)

      // Si el usuario usa más de lo que vale la orden,
      // usar únicamente lo que le falta para completar la orden.
      if (this.due < 0 && newUsedCredits > 0) {
        this.$store.commit('cart/setUsedCredits', 0)
        this.new_used_credits = this.due
        return
      }

      this.userDataTimeout = window.setTimeout(() => {
        this.updateUsedCredits()
      }, 2000)
    },
    address () {
      this.$emit('clearError', 'address')
    }
  },
  created () {
    const data = {
    }
    if (this.favorite_address_id && this.hasChilexpress) {
      data['address_id'] = this.favorite_address_id
    }
    if (this.default_phone) {
      data['phone'] = this.default_phone
    }

    data['coupon_code'] = null

    // Apenas se carga la página, se hace un llamado para actualizar
    // dirección y teléfono.
    // Adicionalmente se elimina cualquier cupón que viniera en el carro.
    // El usuario tiene que poner el cupón cada vez que llegue al checkout.
    // Mostrar modal mientras este llamado.
    const modal = {
      name: 'ModalMessage',
      parameters: {
        type: 'preload',
        title: 'Estamos cargando tu carrito.'
      }
    }
    this.$store.dispatch('ui/showModal', modal)

    this.$store.dispatch('cart/update', data).then(() => {
      this.$store.dispatch('ui/closeModal')
    })
  }
}
