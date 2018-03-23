import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
      (obj && obj[key] !== 'undefined') ? obj[key] : null, nestedObj);
}

const getFirstError = (e, field) => {
  return getNestedObject(e, ['response', 'data', 'errors', field, 0])
}

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

// Los valores de los formularios los almacenamos en local
// hasta que se guarden en el servidor, en ese momento
// pasan a Vuex.
// Con esto generamos una propiedad computada
// Que trae el valor original si el formulario no
// ha recibido ningún valor.
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
  name: 'UserData',
  data () {
    return {
      isActive: '',
      selectAddress: '',
      newAddress: false,
      editAvatar: false,
      editName: false,
      editAbout: false,
      editEmail: false,
      editPhone: false,
      newUserData: {...editableProps},
      errorLog: {...editableProps}
    }
  },
  computed: {
    ...mapFields([
      'user.id',
      'user.first_name',
      'user.last_name',
      'user.email',
      'user.about',
      'user.phone',
      'user.picture',
      'user.cover',
      'user.followers_count',
      'user.following_count',
      'user.addresses'
    ]),
    ...mapGetters('user', [
      'full_name'
    ]),
    ...createComputedProps(editableProps)
  },
  created: function () {
    window.vue = this
  },
  methods: {
    IsActive: function (e) {
      this.isActive = e
    },
    NotActive: function (e) {
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
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editName')
        // Obliga a usar valores de Vuex.
        this.new_first_name = null
        this.new_last_name = null
        this.errorLog.first_name = null
        this.errorLog.last_name = null
      }).catch((e) => {
        this.errorLog.first_name = getFirstError(e, 'first_name')
        this.errorLog.last_name = getFirstError(e, 'last_name')
      })
    },
    updateEmail: function () {
      const data = {
        email: this.new_email
      }
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editEmail')
        // Obliga a usar valores de Vuex.
        this.new_email = null
        this.errorLog.email = null
      }).catch((e) => {
        const emailError = getFirstError(e, 'email')
        const existsError = getFirstError(e, 'exists')
        this.errorLog.email = existsError || emailError
      })
    },
    updateAbout: function () {
      const data = {
        about: this.new_about
      }
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editAbout')
        // Obliga a usar valores de Vuex.
        this.new_about = null
        this.errorLog.about = null
      }).catch((e) => {
        this.errorLog.about = getFirstError(e, 'about')
      })
    },
    updatePhone: function () {
      const data = {
        phone: this.new_phone
      }
      this.$store.dispatch('user/update', data).then(() => {
        this.toggle('editPhone')
        // Obliga a usar valores de Vuex.
        this.new_phone = null
        this.errorLog.phone = null
      }).catch((e) => {
        this.errorLog.phone = getFirstError(e, 'phone')
      })
    }
  }
}
