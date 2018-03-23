import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'

// Cada campo editable debe estar acá.
// Con esto se crean las propiedades computables
// de cada uno.
const editableProps = {
  first_name: null,
  last_name: null,
  email: null
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
      editTel: false,
      newUserData: editableProps
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
      })
    }
  }
}
