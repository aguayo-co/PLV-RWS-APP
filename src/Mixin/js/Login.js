import userAPI from '@/api/user'

import Password from './Password'

export default {
  mixins: [Password],
  data () {
    return {
      errorLog: {},
      loading: false
    }
  },
  methods: {
    validateEmail () {
      this.$delete(this.errorLog, 'email')

      if (!this.email) {
        this.$set(this.errorLog, 'email', 'Debes ingresar tu email')
        return false
      }

      if (!/^(?:[\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
        this.$set(this.errorLog, 'email', 'El email que ingresaste no parece válido.')
        return false
      }
      return true
    },
    login () {
      this.loading = true
      if (!this.validateEmail()) {
        this.loading = false
        return
      }

      if (!this.validatePassword()) {
        this.loading = false
        return
      }

      const payload = {
        email: this.email,
        password: this.password
      }
      userAPI.login(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
            .then(() => {
              this.$store.dispatch('guestCart/merge')
              // Los componentes que definan un método `loggedIn`
              // pueden actuar después de un login correcto.
              if (typeof this.loggedIn === 'function') {
                this.loggedIn(response)
              }
            })
        })
        .catch(e => {
          this.$store.dispatch('ui/loginAttempt')
          this.$set(this.errorLog, 'password', 'No podemos reconocer tu usuario o contraseña.')
          if (this.$store.getters['ui/loginAttempts'] % 4 === 0) {
            const modal = {
              name: 'ModalMessage',
              parameters: {
                type: 'alert',
                title: '¡Ups! Ya has intentado autenticarte varias veces',
                primaryButtonTitle: '¿Olvidaste tu contraseña?',
                primaryButtonURL: 'password'
              }
            }
            this.$store.dispatch('ui/showModal', modal)
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  watch: {
    email () {
      this.$delete(this.errorLog, 'email')
    }
  }
}
