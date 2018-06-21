<template lang="pug">
.layout-page
  //- If user is logged in and has role of seller, show default form
  FormPublicarVenta(v-if='seller && authenticated')
  //- If user is logged in but not seller, show data completion form
  FormCompleteSeller(v-if='authenticated && !seller')
  //- If user is not authenticated
  .layout-inner(v-if='!authenticated && !signup')
    form.form(
      v-on:submit='',
      action='#',
      submit.prevent='firstStep',
      method='post')
      fieldset.form-section
        legend.title ¡Estás a un paso de publicar tu producto!
          p.form-section__subtitle Para publicar tu venta, ingresa tu correo
        .form-section__inner
          .form__row(
            v-bind:class='{ "is-danger": errorLog.email }')
            label.form__label(
              for='email') Correo
            span.help(
              v-if='errorLog.email') {{ errorLog.email }}
            input.form__control(
              @change="userFound = false",
              @keyup='errorLog.email = undefined',
              v-model='newUser.email',
              id='email',
              type='email')
          .form__row.form__row_away.form__btn(
            v-if='!login && !signup && !userFound')
            button.btn.btn_solid(
              @click.prevent='next($event)') Continuar
        .form-section__inner(v-if='userFound')
          p.form__info.i-smile Vemos que ya tienes una cuenta, por favor ingresa tu contraseña
          .form__row(
            v-bind:class='{ "is-danger": errorLog.password }')
            label.form__label(
              for='password') Contraseña
            span.help(
              v-if="errorLog.password") {{ errorLog.password }}
            input.form__control(
              v-model='newUser.password',
              id='password',
              type='password')
          .form__row.form__row_away.form__btn
            button.btn.btn_solid(
              @click.prevent='secondStep($event)') Ingresar
  //- If user email not found (new user)
  FormSignUpVendedora(
    v-if='!authenticated && signup'
    :email='newUser.email')

</template>

<script>
import { mapState } from 'vuex'
import userAPI from '@/api/user'
import FormPublicarVenta from '@/components/FormPublicarVenta'
import FormCompleteSeller from '@/components/FormCompleteSeller'
import FormSignUpVendedora from '@/components/FormSignUpVendedora'

export default {
  name: 'PublicarVenta',
  components: {
    FormPublicarVenta,
    FormCompleteSeller,
    FormSignUpVendedora
  },
  data () {
    return {
      errorLog: {},
      newUser: {},
      showForm: false,
      userFound: false,
      signup: false,
      login: false,
      viewPass: false
    }
  },
  computed: {
    ...mapState(['guestCart']),
    ...mapState(['user']),
    seller () {
      if (this.$store.state['user'].roles) {
        return this.$store.state['user'].roles.filter(x => x.name === 'seller')[0]
      }
      return false
    },
    authenticated () {
      return Boolean(this.$store.state['user'].id)
    }
  },
  methods: {
    validateEmail: function (event) {
      this.errorLog = {}

      if (!this.newUser.email) {
        this.errorLog.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.newUser.email)) {
          this.errorLog.email = 'El email que ingresaste no parece válido.'
        }
      }
      if (Object.keys(this.errorLog).length === 0) {
        return true
      }
      event.target.disabled = false
      return false
    },
    validatePassword: function () {
      delete this.errorLog.password
      if (!this.newUser.password) this.errorLog.password = 'Debes ingresar una contraseña'
    },
    next: function (event) {
      event.target.disabled = true
      if (this.validateEmail(event)) {
        userAPI.checkEmail(this.newUser.email)
          .then(response => {
            this.userFound = true
            this.showForm = true
          })
          .catch(response => {
            this.userFound = false
            this.showForm = true
            this.signup = true
          })
      }
    },
    firstStep: function () {
      this.validateEmail()
      if (Object.keys(this.errorLog).length === 0) {
        var response = false
        response === true ? this.login = true : this.signup = true
      }
    },
    secondStep: function (event) {
      event.target.disabled = true
      this.validateEmail()
      this.validatePassword()
      if (Object.keys(this.errorLog).length === 0) {
        this.loginUser(event)
      }
    },
    loginUser: function (event) {
      const payload = {
        email: this.newUser.email,
        password: this.newUser.password
      }
      userAPI.login(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
          this.$store.dispatch('guestCart/merge')
        })
        .catch(e => {
          var modal

          if (this.$store.getters['ui/loginAttempts'] < 3) {
            modal = {
              name: 'ModalMessage',
              parameters: {
                type: 'alert',
                title: '¡Ups! Parece que ocurrió un error',
                body: Object.values(e.response.data.errors)[0]
              }
            }
          } else {
            modal = {
              name: 'ModalMessage',
              parameters: {
                type: 'alert',
                title: '¡Ups! Ya has intentado autenticarte varias veces',
                primaryButtonTitle: '¿Olvidaste tu contraseña?',
                primaryButtonURL: 'password'
              }
            }
          }
          this.$store.dispatch('ui/showModal', modal)
          this.$store.dispatch('ui/loginAttempt')
          event.target.disabled = false
        })
    }
  }
}
</script>
