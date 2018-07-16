<template lang="pug">
  .form-slot
    h1.title Registro
    form.form.form_big(
      @submit.prevent='validateBeforeSubmit',
    )
      .form__row(
        :class='{ "is-danger": errorLog.nombre }'
      )
        label.form__label(
          for='nombre') Nombre
        span.help(
          v-if="errorLog.nombre"
        ) {{ errorLog.nombre }}
        input.form__control(
          v-model='nombre',
          id='username',
          type='text',
          data-vv-name='nombre'
        )
      .form__row(
        :class='{ "is-danger": errorLog.apellidos }'
      )
        label.form__label(
          for='apellidos') Apellidos
        span.help(
          v-if="errorLog.apellidos"
        ) {{ errorLog.apellidos }}
        input.form__control(
          v-model='apellidos',
          id='userLast',
          type='text',
          data-vv-name='apellidos'
        )
      .form__row(
        :class='{ "is-danger": errorLog.email }'
      )
        label.form__label(
          for='email') Correo
        span.help(
          v-show='errorLog.email'
        ) {{ errorLog.email }}
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
        :class='{ "is-danger": errorLog.emailConfirm }'
      )
        label.form__label(
          for='emailConfirm') Confirma tu correo
        span.help(
          v-if="errorLog.emailConfirm"
        ) {{ errorLog.emailConfirm }}
        input.form__control(
          v-model='emailConfirm',
          id='emailConfirm',
          type='email',
          data-vv-name='emailConfirm'
        )
      .form__row(
        :class='{ "is-danger": errorLog.password }'
      )
        label.form__label(
          for='password') Contraseña
        span.help(
          v-if="errorLog.password"
        ) {{ errorLog.password }}
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
          :class='"level-"+(3-errorLog.passwordDetail.length)')
        div.helper(
          v-if='errorLog.passwordDetail.length > 0')
          ul.helper__list
            li(
              v-for='detail in errorLog.passwordDetail') {{ detail }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block Registrarse
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
      errorLog: {
        passwordDetail: []
      },
      infoTexts: {},
      viewPass: false
    }
  },
  computed: {
    ...mapState(['guestCart'])
  },
  methods: {
    signUp () {
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
            .then(() => {
              this.$store.dispatch('guestCart/merge')
              this.$router.push('user/data')
            })
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
    validateBeforeSubmit () {
      this.errorLog = {
        passwordDetail: []
      }
      this.infoTexts = {}

      if (!this.nombre) this.errorLog.nombre = 'Debes ingresar tu nombre'
      if (!this.apellidos) this.errorLog.apellidos = 'Debes ingresar tus apellidos'
      if (!this.email) {
        this.errorLog.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
          this.errorLog.email = 'El email que ingresaste no parece válido.'
        }
      }
      if (!this.email) this.errorLog.emailConfirm = 'Debes ingresar de nuevo tu email'
      if (this.email !== this.emailConfirm) this.errorLog.emailConfirm = 'Este email no coincide con el primero que ingresaste'

      this.validatePassword()

      if (Object.keys(this.errorLog).length === 1 && this.errorLog.passwordDetail.length === 0) {
        this.signUp()
      }
    },
    validatePassword () {
      this.errorLog.passwordDetail = []

      if (!this.password) this.errorLog.password = 'Debes ingresar una contraseña'
      if (this.password.length < 8) this.errorLog.passwordDetail.push('Tu contraseña debe tener al menos 8 caracteres')
      if (!/[a-zA-Z]/.test(this.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos una letra')
      if (!/\d+/.test(this.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos un número')
    },
    visiblePass () {
      this.viewPass = !this.viewPass
    }
  }
}
</script>
