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
        )
      .form__row(
        :class='{ "is-danger": errorLog.email }'
      )
        label.form__label(
          for='email') Correo
        span.help(
          v-if='errorLog.email'
        ) {{ errorLog.email }}
        input.form__control(
          v-model='email',
          id='email',
          type='email',
        )
        span.helper(
          v-if='emailExist'
        ) Parece que este email ya está siendo usado. ¿Olvidaste tu contraseña?
          router-link.link_underline(
            :to="{ name: 'password' }"
            title='Ir a recuperar contraseña') ¡Recupérala aquí!
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
        )
      .form__row(
        :class='{ "is-danger": errorLog.password }'
      )
        label.form__label(
          for='password') Contraseña
        //- Con v-if pierte foco el input cuando se elimina .help
        //- es necesario usar v-show.
        span.help(
          v-show="errorLog.password"
        ) {{ errorLog.password }}
        .form__password
          input.form__control(
            v-model='password',
            id='password',
            :type="viewPass ? 'text' : 'password'",
          )
          span.form__visible.i-view(
            @click='visiblePass')
        span.password-bar(
          v-if="password"
          :class='"level-" + (3 - passwordSuggestions.length)')
        div.helper(
          v-if='passwordSuggestions.length > 0')
          ul.helper__list
            li(
              v-for='detail in passwordSuggestions') {{ detail }}
      .form__row.form__row_away
        button.btn.btn_solid.btn_block Registrarse
    .break
      span.break__txt O
</template>

<script>
import userAPI from '@/api/user'
import Password from '@/Mixin/js/Password'
import { mapState } from 'vuex'

export default {
  name: 'FormSignUp',
  mixins: [Password],
  data () {
    return {
      email: '',
      nombre: '',
      apellidos: '',
      emailConfirm: '',
      password: '',
      flagSignUp: 'SignUp',
      errorLog: {},
      emailExist: false,
      viewPass: false
    }
  },
  computed: {
    ...mapState(['guestCart'])
  },
  methods: {
    signUp () {
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
          if (this.$getNestedObject(e, ['response', 'data', 'errors', 'exists'])) {
            this.emailExist = true
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
        })
    },
    validateBeforeSubmit () {
      this.errorLog = {}
      this.emailExist = false

      if (!this.nombre) this.$set(this.errorLog, 'nombre', 'Debes ingresar tu nombre')
      if (!this.apellidos) this.$set(this.errorLog, 'apellidos', 'Debes ingresar tus apellidos')
      if (!this.email) {
        this.$set(this.errorLog, 'email', 'Debes ingresar tu email')
      } else {
        if (!/^(?:[\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
          this.$set(this.errorLog, 'email', 'El email que ingresaste no parece válido.')
        }
      }
      if (!this.emailConfirm) this.$set(this.errorLog, 'emailConfirm', 'Debes ingresar de nuevo tu email')
      if (this.emailConfirm && this.email !== this.emailConfirm) this.$set(this.errorLog, 'emailConfirm', 'Este email no coincide con el primero que ingresaste')

      this.validatePassword()

      if (Object.keys(this.errorLog).length === 0) {
        this.signUp()
      }
    },
    visiblePass () {
      this.viewPass = !this.viewPass
    }
  }
}
</script>
