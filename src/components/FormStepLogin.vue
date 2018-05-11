<template lang="pug">
//- This form allows the check of an email and redirecting to
.step
  .layout-inner
    form.form(
      v-on:submit='',
      action='#',
      submit.prevent='validateBeforeSubmit',
      method='post')
      fieldset.form-section
        legend.subhead.form-section__title ¡Estás a un paso de publicar tu venta!
          p.form-section__subtitle Para publicar tu venta, ingresa tu correo
        .form-section__inner
          .form__row(
            v-bind:class='{ "is-danger": errorTexts.email }')
            label.form__label(
              for='emailLogin') Correo
            span.help(
              v-if="errorTexts.email") {{ errorTexts.email }}
            input.form__control(
              v-model='email',
              id='emailLogin',
              type='email')
          .form__row_top
            p.form__mesagge Vemos que ya tienes una cuenta, por favor ingresa tu contraseña
            .form__row(
              v-bind:class='{ "is-danger": errorTexts.password }')
              label.form__label(
                for='passwordLogin') Contraseña
              span.help(
                v-if="errorTexts.password"
              ) {{ errorTexts.password }}
              input.form__control(
                v-model='password',
                id='passwordLogin',
                type='password')
              p.form__note.form__note_right
                |¿Olvidaste tu contraseña?
                | <a class='link_underline' href='#/password' title='Ir a recuperar contraseña'>Recuperar contraseña.</a>
          .form-section.form-section_footer
            .form__row.form__row_away
              button.btn.btn_solid(
                @click.prevent='validateBeforeSubmit') Continuar
</template>

<script>
import { mapState } from 'vuex'
import usersAPI from '@/api/user'
export default {
  name: 'FormStepLogin',
  data () {
    return {
      email: '',
      password: '',
      errorTexts: {}
    }
  },
  computed: {
    ...mapState(['guestCart'])
  },
  methods: {
    validateBeforeSubmit: function () {
      this.errorTexts = {}

      if (!this.email) {
        this.errorTexts.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
          this.errorTexts.email = 'El email que ingresaste no parece válido.'
        }
      }

      if (!this.password) this.errorTexts.password = 'Debes ingresar una contraseña'

      if (Object.keys(this.errorTexts).length === 0) {
        this.login()
      }
    },
    login: function () {
      userAPI.login(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
          this.migrateCart()
          this.$router.push({ name: 'user-data' })
        })
        .catch(e => {
          var modal

          if (this.$store.getters['ui/loginAttempts'] < 3) {
            modal = {
              name: 'ModalMessage',
              parameters: {
                type: 'alert',
                title: '¡Ups! Parece que ocurrió un error',
                body: this.$getNestedObject(e, ['response', 'data', 'errors', 0])
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
    },
    migrateCart: function () {
      let errors = 0
      const products = this.guestCart.products
      products.forEach((product) => {
        this.$store.dispatch('cart/addProduct', { id: product.id })
          .catch(e => {
            errors += 1
          })
      })
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'alert',
          title: 'Tuvimos que eliminar algunos productos de tu carrito porque ya no están disponibles.'
        }
      }
      if (errors > 0) this.$store.dispatch('ui/showModal', modal)
      this.$store.dispatch('guestCart/kill')
    }
  }
}
</script>
