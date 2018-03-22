<template lang="pug">
//- 3a Usuaria no registrada
.step
  .layout-inner
    form.form.form_big(
      v-on:submit='',
      action='#',
      submit.prevent='validateBeforeSubmit',
      method='post')
      fieldset.form-section
        legend.subhead.form-section__title ¡Estás a un paso de publicar tu venta!
          p.form-section__subtitle Para continuar con la publicación de tu venta, ingresa tus datos
        .upfile
          .upfile__small
            h3.upfile__title Foto de perfil
            .upfile__item
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqDesk") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                :width="300",
                :height="300",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
        .form-section__inner
          p.form__mesagge Ups! Vemos que aún no tienes una cuenta. Te crearemos una cuenta rápidamente para que puedas continuar con la publicación de tu venta. Por favor ingresa los siguientes datos:
          .form__row(
            :class='{ "is-danger": errorTexts.nombre }')
            label.form__label(
              for='nombre') Nombre
            span.help(
              v-if="errorTexts.nombre") {{ errorTexts.nombre }}
            input.form__control(
              v-model='nombre',
              id='username',
              type='text',
              data-vv-name='nombre'
            )
          .form__row(
            :class='{ "is-danger": errorTexts.apellidos }')
            label.form__label(
              for='apellidos') Apellidos
            span.help(
              v-if="errorTexts.apellidos") {{ errorTexts.apellidos }}
            input.form__control(
              v-model='apellidos',
              id='userLast',
              type='text',
              data-vv-name='apellidos')
          .form__row(
            :class='{ "is-danger": errorTexts.email }')
            label.form__label(
              for='emailUser') Correo
            span.help(
              v-show='errorTexts.email') {{ errorTexts.email }}
            input.form__control(
              v-model='email',
              id='emailUser',
              type='email',
              data-vv-name='email')
            span.help(
              v-if='infoTexts.emailExist') {{ infoTexts.emailExist }}
              a(href='#') ¡Recupérala aquí!
          .form__row(
            :class='{ "is-danger": errorTexts.emailConfirm }')
            label.form__label(
              for='emailConfirm') Confirma tu correo
            span.help(
              v-if="errorTexts.emailConfirm") {{ errorTexts.emailConfirm }}
            input.form__control(
              v-model='emailConfirm',
              id='emailConfirm',
              type='email',
              data-vv-name='emailConfirm')
          .form__row
            label.form__label(
              for='address') Dirección
            input.form__control(
              id='address',
              type='text')
          .form__row
            label.form__label(
              for='address-region') Región
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form__row
            label.form__label(
              for='address-zone') Comuna
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form__row(
            :class='{ "is-danger": errorTexts.password }')
            label.form__label(
              for='passwordUser') Contraseña
            span.help(
              v-if="errorTexts.password") {{ errorTexts.password }}
            input.form__control(
              v-model='password',
              id='passwordUser',
              type='password',
              data-vv-name='password',
              v-on:input='validatePassword')
            span.password-bar(
              v-if='errorTexts.passwordDetail.length > 0',
              :class='"level-"+(3-errorTexts.passwordDetail.length)')
            div.helper(
              v-if='errorTexts.passwordDetail.length > 0' )
              ul.helper__list
                li(
                  v-for='detail in errorTexts.passwordDetail') {{ detail }}
          .form-section.form-section_footer
            .form__row.form__row_away
              button.btn.btn_solid(
                @click.prevent='validateBeforeSubmit') Registrarse
        //- .break
        //-   span.break__txt O
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)

export default {
  name: 'FormPublicarSignUp',
  data () {
    return {
      email: '',
      nombre: '',
      apellidos: '',
      emailConfirm: '',
      password: '',
      flagSignUp: 'SignUp',
      errorTexts: {
        passwordDetail: []
      },
      infoTexts: {}
      // googleSignInParams: {
      //   client_id: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
      // }

    }
  },
  methods: {
    signUp: function () {
      // console.log(this.$store.get('userAuth'))
      axios.post('https://prilov.aguayo.co/api/users', {
        first_name: this.nombre,
        last_name: this.apellidos,
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log(response.data)
          this.setSuccess()
          localStorage.setItem('token', response.data.api_token)
          localStorage.setItem('userId', response.data.id)
          this.$store.dispatch('user/setUser', response.data)
        })
        .catch(e => {
          if (e.response.data.errors.exists) this.infoTexts.emailExist = 'Parece que este email ya está siendo usado. ¿Olvidaste tu contraseña?'
          this.validatePassword()
        })
    },
    validateBeforeSubmit: function (e) {
      this.errorTexts = {
        passwordDetail: []
      }
      this.infoTexts = {}

      if (!this.nombre) this.errorTexts.nombre = 'Debes ingresar tu nombre'
      if (!this.apellidos) this.errorTexts.apellidos = 'Debes ingresar tus apellidos'
      if (!this.email) {
        this.errorTexts.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
          this.errorTexts.email = 'El email que ingresaste no parece válido.'
        }
      }
      if (!this.email) this.errorTexts.emailConfirm = 'Debes ingresar de nuevo tu email'
      if (this.email !== this.emailConfirm) this.errorTexts.emailConfirm = 'Este email no coincide con el primero que ingresaste'

      this.validatePassword(e)

      if (Object.keys(this.errorTexts).length === 1) {
        this.signUp()
      }
    },
    validatePassword: function (e) {
      this.errorTexts.passwordDetail = []

      if (!this.password) this.errorTexts.password = 'Debes ingresar una contraseña'
      if (this.password.length < 8) this.errorTexts.passwordDetail.push('Tu contraseña debe tener al menos 8 caracteres')
      if (!/[a-zA-Z]/.test(this.password)) this.errorTexts.passwordDetail.push('Tu contraseña debe contener al menos una letra')
      if (!/\d+/.test(this.password)) this.errorTexts.passwordDetail.push('Tu contraseña debe contener al menos un número')
    },
    setSuccess: function () {
      this.flagSignUp = 'Success'
      this.$emit('setSuccess')
    },
    setError: function () {
      this.flagSignUp = 'Error'
      this.$emit('setError')
    }
  }
}
</script>
