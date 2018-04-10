/* global FormData */
import { mapGetters, mapState } from 'vuex'
import AddressList from '@/components/AddressList'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  first_name: null,
  last_name: null,
  about: null,
  email: null,
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
    computed['new_' + key] = {
      get: function () {
        return this.newUserData[key] !== null ? this.newUserData[key] : this[key]
      },
      set: function (value) {
        this.newUserData[key] = value
      }
    }
  })
  return computed
}

export default {
  components: {
    AddressList
  },
  data () {
    return {
      isActive: '',
      editPicture: false,
      editName: false,
      editAbout: false,
      editEmail: false,
      editPhone: false,
      new_picture: null,
      newUserData: {...editableProps},
      errorLog: {...editableProps, picture: null, exists: null}
    }
  },
  computed: {
    emailError () {
      return this.errorLog.email || this.errorLog.exists
    },
    ...mapState('user', [
      'id',
      'picture',
      'cover',
      'followers_count',
      'following_count',
      ...Object.keys(editableProps)
    ]),
    ...mapGetters('user', [
      'full_name'
    ]),
    ...createComputedProps(editableProps)
  },
  methods: {
    IsActive: function (e) {
      this.isActive = e
    },
    NotActive: function () {
      this.isActive = ''
    },
    toggle: function (prop) {
      this[prop] = !this[prop]
    },
    updateName: function () {
      const data = {
        first_name: this.new_first_name,
        last_name: this.new_last_name
      }
      this.errorLog.first_name = null
      this.errorLog.last_name = null
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editName')
        // Obliga a usar valores de Vuex.
        this.new_first_name = null
        this.new_last_name = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['first_name', 'last_name'], this.errorLog)
      })
    },
    updateEmail: function () {
      const data = {
        email: this.new_email
      }
      this.errorLog.email = null
      this.errorLog.exists = null
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editEmail')
        // Obliga a usar valores de Vuex.
        this.new_email = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['email', 'exists'], this.errorLog)
      })
    },
    updateAbout: function () {
      const data = {
        about: this.new_about
      }
      this.errorLog.about = null
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editAbout')
        // Obliga a usar valores de Vuex.
        this.new_about = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['about'], this.errorLog)
      })
    },
    updatePhone: function () {
      const data = {
        phone: this.new_phone
      }
      this.errorLog.phone = null
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editPhone')
        // Obliga a usar valores de Vuex.
        this.new_phone = null
      }).catch((e) => {
        this.$handleApiErrors(e, ['phone'], this.errorLog)
      })
    },
    updatePicture: function () {
      if (!this.new_picture.hasImage()) {
        this.errorLog.picture = 'No has cargado una imagen.'
        return
      }

      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: 'Estamos subiendo tu imagen'
        }
      }
      this.$store.dispatch('ui/showModal', modal)

      this.errorLog.picture = null
      this.new_picture.generateBlob((blob) => {
        let formData = new FormData()
        formData.append('picture', blob)
        this.$store.dispatch('user/update', formData).then(() => {
          this.toggle('editPicture')
          this.new_picture.refresh()
        }).catch((e) => {
          this.$handleApiErrors(e, ['picture'], this.errorLog)
        }).finally(() => {
          this.$store.dispatch('ui/closeModal', modal)
        })
      })
    },
    changePassword: function () {
      //-console.log(this.$store.state['user'])
      this.$store.dispatch('ui/showModal', { name: 'ModalPasswordChange'})
    }
  }
}
