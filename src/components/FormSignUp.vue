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
        :class='{ "is-danger": errorTexts.nombre }'
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
        :class='{ "is-danger": errorTexts.apellidos }'
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
        :class='{ "is-danger": errorTexts.email }'
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
        span.helper(
          v-if='infoTexts.emailExist'
        ) {{ infoTexts.emailExist }}
          a(href='#') ¡Recupérala aquí!
      .form__row(
        :class='{ "is-danger": errorTexts.emailConfirm }'
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
        :class='{ "is-danger": errorTexts.password }'
      )
        label.form__label(
          for='password') Contraseña
        span.help(
          v-if="errorTexts.password"
        ) {{ errorTexts.password }}
        .form__password
          input.form__control(
            v-model='password',
            id='password',
            :type="viewPass ? 'text' : 'password'",
            data-vv-name='password',
            @input='validatePassword'
          )
          span.form__visible.i-view(
            @click='visiblePass')
        span.password-bar(
          v-if="password"
          :class='"level-"+(3-errorTexts.passwordDetail.length)')
        div.helper(
          v-if='errorTexts.passwordDetail.length > 0')
          ul.helper__list
            li(
              v-for='detail in errorTexts.passwordDetail') {{ detail }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(
          @click.prevent='validateBeforeSubmit') Registrarse
    .break
      span.break__txt O
</template>

<script>
import userAPI from '@/api/user'
import { mapState } from 'vuex'

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
      infoTexts: {},
      viewPass: false
      // googleSignInParams: {
      //   client_id: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
      // }

    }
  },
  computed: {
    ...mapState(['guestCart'])
  },
  methods: {
    signUp: function () {
      // console.log(this.$store.get('userAuth'))
      const payload = {
        first_name: this.nombre,
        last_name: this.apellidos,
        email: this.email,
        password: this.password
      }
      userAPI.create(payload)
        .then(response => {
          this.$store.dispatch('user/setUser', response.data)
          this.$router.push('user/data')
          this.$store.dispatch('guestCart/merge')
        })
        .catch(e => {
          if (e.response.data.errors.exists) {
            this.infoTexts.emailExist = 'Parece que este email ya está siendo usado. ¿Olvidaste tu contraseña?'
            this.validatePassword()
          } else {
            const modal = {
              name: 'ModalMessage',
              parameters: {
                type: 'alert',
                title: '¡Ups! Parece que ocurrió un error',
                body: Object.values(e.response.data.errors)[0]
              }
            }
            this.$store.dispatch('ui/showModal', modal)
          }
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

      if (Object.keys(this.errorTexts).length === 1 && this.errorTexts.passwordDetail.length === 0) {
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
    visiblePass: function () {
      this.viewPass = !this.viewPass
    }
  }
}
</script>
