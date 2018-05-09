<template lang="pug">
.layout-page
  //- If user is logged in and has role of seller, show default form
  form.form.form_big(
    v-if='seller && authenticated',
    id='form-publicar',
    action='#',
    submit.prevent='',
    method='post')
    FormPublicarVenta
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
        legend.subhead.form-section__title ¡Estás a un paso de publicar tu producto!
          p.form-section__subtitle Para publicar tu venta, ingresa tu correo
        .form-section__inner
          .form__row(
            v-bind:class='{ "is-danger": errorTexts.email }')
            label.form__label(
              for='email') Correo
            span.help(
              v-if='errorTexts.email') {{ errorTexts.email }}
            input.form__control(
              v-model='email',
              id='email',
              type='email')
          .form__row.form__row_away
            button.btn.btn_solid(
              v-if='!login && !signup'
              @click.prevent='firstStep') Continuar
        .form-section__inner(v-if='login')
          .form__row(
            v-bind:class='{ "is-danger": errorTexts.password }')
            p.form-section__subtitle Vemos que ya tienes una cuenta, por favor ingresa tu contraseña
            label.form__label(
              for='password') Contraseña
            span.help(
              v-if="errorTexts.password") {{ errorTexts.password }}
            input.form__control(
              v-model='password',
              id='password',
              type='password')
          .form__row.form__row_away
            button.btn.btn_solid(
              @click.prevent='secondStep') Ingresar
  //- If user email not found (new user)
  FormSignUpVendedora(
    v-if='!authenticated && signup'
    :email='email')

</template>

<script>
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
      signup: false,
      login: false,
      email: null,
      password: null,
      errorTexts: {}
    }
  },
  computed: {
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
    validateEmail: function () {
      delete this.errorTexts.email

      if (!this.email) {
        this.errorTexts.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
          this.errorTexts.email = 'El email que ingresaste no parece válido.'
        }
      }
    },
    validatePassword: function () {
      delete this.errorTexts.password
      if (!this.password) this.errorTexts.password = 'Debes ingresar una contraseña'
    },
    firstStep: function () {
      this.validateEmail()
      if (Object.keys(this.errorTexts).length === 0) {
        var response = false
        response === true ? this.login = true : this.signup = true
      }
    },
    secondStep: function () {
      this.validateEmail()
      this.validatePassword()
      if (Object.keys(this.errorTexts).length === 0) {
        this.loginUser()
      }
    },
    loginUser: function () {
      const payload = {
        email: this.email,
        password: this.password
      }
      userAPI.login(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
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
        })
    }
  }
}
</script>
