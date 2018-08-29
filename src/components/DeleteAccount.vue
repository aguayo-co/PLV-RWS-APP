<template lang="pug">
div
  template(v-if="user.credits")
    p Aún tienes {{ user.credits | currency }} créditos sin transferir.
      |  Tus créditos deben estar en 0 para poder eliminar tu cuenta.
    router-link.btn(:to="{name: 'user-creditos'}")  Solicitar transferencia
  template(v-else)
    p Eliminaremos toda la información asociada a tu cuenta, Esta acción no puede deshacerse.
    p ¿Estás segura de que deseas eliminar tu cuenta de Prilov?
    form(@submit.prevent="deleteAccount")
      .form__grid
        .form__row
          label.form__label(
            for='delete-password') Ingresa tu contraseña
          //- El API devuelve errores de loguin en el campo email.
          span.help(
            v-if="errorLog.email") {{ errorLog.email }}
          span.help(
            v-if="errorLog.password") {{ errorLog.password }}
          input.form__control(
            id="delete-password"
            v-model="password"
            type='password')
      .form__grid
        .form__row
          button.btn.btn_solid.form__grid-item(
            type="submit"
            title="Eliminar cuenta") Eliminar cuenta
</template>

<script>
import userAPI from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'DeleteAccount',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    validatePassword () {
      this.errorLog = {}
      if (!this.password) {
        this.$set(this.errorLog, 'password', 'Debes ingresar tu contraseña')
        return
      }
      const data = {
        email: this.user.email,
        password: this.password
      }
      return userAPI.login(data)
        .catch(e => {
          this.$handleApiErrors(e, ['email', 'password'], this.errorLog)
          throw e
        })
    },
    deleteAccount () {
      this.validatePassword()
        .then(() => {
          return userAPI.delete(this.user.id)
            .then(response => {
              const modal = {
                name: 'ModalMessage',
                parameters: {
                  type: 'alert',
                  title: 'Cuenta eliminada',
                  body: 'Cuenta eliminada'
                }
              }
              this.$store.dispatch('ui/showModal', modal)
            })
            .catch(e => {
              const modal = {
                name: 'ModalMessage',
                parameters: {
                  type: 'alert',
                  title: 'Cuenta eliminada',
                  body: 'Aun tienes transferencias, compras y/o ventas no finalizadas, te recomendamos terminarlas para poder eliminar tu cuenta. Para más información ponte en contacto con nosotros al correo contacto@prilov.com'
                }
              }
              this.$store.dispatch('ui/showModal', modal)
            })
        })
    }
  },
  data () {
    return {
      errorLog: {},
      password: null
    }
  }
}
</script>
