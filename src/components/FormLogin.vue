<template lang="pug">
transition(name='modal-fade')
  section.modal.modal_scroll
    .modal__slot.content-slot
      .content-slot__inner
        header.modal__header
          h2.title Inicio de Sesión
          .btn_close.modal__btn_close.i-x(
            @click='close')
            span Cerrar

        form.form(
          v-on:submit='',
          action='#',
          method='post'
        )
          .form__row
            label.form__label(
              for='userEmail') Correo
            input.form__control(
              v-model='userEmail',
              id='userEmail',
              type='email')
          .form__row
            label.form__label(
              for='userPsw'
            ) Contraseña
            input.form__control(
              v-model='userPsw',
              id='userPsw',
              type='password')
            p.form__note.form__note_right
              |¿Olvidaste tu contraseña?
              | <a class='link_underline' @click='close' href='#/password' title='Ir a recuperar contraseña'>Recuperar contraseña.</a>
          .form__row.form__row_away
            button.btn.btn_solid.btn_block(
              @click.prevent='login()') Iniciar sesión
        .break
          span.break__txt O
        //- falta cerrar la modal
        a.btn.btn_block(
          href='#/SingUp',
          title='Ir a Registro',
          @click='close') Regístrate
</template>

<script>
import axios from 'axios'
export default {
  name: 'FormLogin',
  data () {
    return {
      userEmail: '',
      userPsw: ''
    }
  },
  methods: {
    login: function () {
      axios.post('https://prilov.aguayo.co/api/users/login', {
        email: this.userEmail,
        password: this.userPsw
      })
        .then(response => {
          console.log(response.data)
          // this.$store.tokenLocalStorage.getItem('token')
          // this.$store.dispatch('signUp/actionSetToken', response.data.api_token)
          this.$store.dispatch('UserModule/actionSetToken', response.data.api_token)
          this.$store.dispatch('UserModule/actionSetUserName', response.data.first_name)
          this.$store.dispatch('UserModule/actionSetAuth')
          // this.$store.dispatch('actionSetAuth')
          // this.$store.getters.getAuth()
          console.log(this.$store.getters['UserModule/getToken'])
          localStorage.setItem('token', JSON.stringify(this.$store.getters['UserModule/getToken']))
          localStorage.setItem('userName', JSON.stringify(this.$store.getters['UserModule/getUserName']))
          console.log('TOKEN EN LS')
          localStorage.getItem('token')
          this.close()
          // console.log(this.userToken)
          // this.$store.tokenLocalStorage.setItem('userAuth', {token: response.data.api_token})
        })
        .catch(e => {
          console.log('ERROR : ' + e)
        })
    },
    close: function () {
      this.$emit('close')
    }
  }
}
</script>
