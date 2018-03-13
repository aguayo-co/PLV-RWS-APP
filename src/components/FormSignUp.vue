<template lang="pug">
  .form-slot
    h1.title Registro
    form.form.form_big(
      v-on:submit='',
      action='#',
      submit.prevent='validateBeforeSubmit',
      method='post'
    )
      .form__row(
        v-bind:class='{ "is-danger": errorTexts.nombre }'
      )
        label.form__label(
          for='nombre') Nombre
        span.help(
          v-if="errorTexts.nombre"
        ) {{ errorTexts.nombre }}
        input.form__control(
          v-model='nombre',
          id='username',
          type='text',
          data-vv-name='nombre'
        )
      .form__row(
        v-bind:class='{ "is-danger": errorTexts.apellidos }'
      )
        label.form__label(
          for='apellidos') Apellidos
        span.help(
          v-if="errorTexts.apellidos"
        ) {{ errorTexts.apellidos }}
        input.form__control(
          v-model='apellidos',
          id='userLast',
          type='text',
          data-vv-name='apellidos'
        )
      .form__row(
        v-bind:class='{ "is-danger": errorTexts.email }'
      )
        label.form__label(
          for='email') Correo
        span.help(
          v-show='errorTexts.email'
        ) {{ errorTexts.email }}
        input.form__control(
          v-model='email',
          id='email',
          type='email',
          data-vv-name='email'
        )
        span.help(
          v-if='infoTexts.emailExist'
        ) {{ infoTexts.emailExist }}
          a(href='#') ¡Recupérala aquí!
      .form__row(
        v-bind:class='{ "is-danger": errorTexts.emailConfirm }'
      )
        label.form__label(
          for='emailConfirm') Confirma tu correo
        span.help(
          v-if="errorTexts.emailConfirm"
        ) {{ errorTexts.emailConfirm }}
        input.form__control(
          v-model='emailConfirm',
          id='emailConfirm',
          type='email',
          data-vv-name='emailConfirm'
        )
      .form__row(
        v-bind:class='{ "is-danger": errorTexts.password }'
      )
        label.form__label(
          for='password') Contraseña
        span.help(
          v-if="errorTexts.password"
        ) {{ errorTexts.password }}
        input.form__control(
          v-model='password',
          id='password',
          type='password',
          data-vv-name='password',
          v-on:input='validatePassword'
        )
        span.password-bar(
          v-if='errorTexts.passwordDetail.length > 0',
          v-bind:class='"level-"+(3-errorTexts.passwordDetail.length)'
        )
        div.help(
          v-if='errorTexts.passwordDetail.length > 0'
        )
          ul
            li(
              v-for='detail in errorTexts.passwordDetail'
            ) {{ detail }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(
          @click.prevent='validateBeforeSubmit()') Registrarse
    .break
      span.break__txt O
</template>

<script>
import axios from 'axios'

// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)

export default {
  name: 'FormSignUp',
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
