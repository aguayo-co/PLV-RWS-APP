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
        legend.subhead.form-section__title ¡Estás a un paso de publicar tu producto!
          p.form-section__subtitle Para continuar con la publicación de tu producto, ingresa tus datos
        .upfile
          .upfile__small
            h3.upfile__title Foto de perfil
            .upfile__item
              a.upfile__delete.i-x(
                v-show='toggleImageDelete',
                @click='removeImage')
                span.hide Eliminar
              span.help(
                v-if="errorLog.picture"
              ) {{ errorLog.picture }}
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqDesk") Arrastra una foto o
                button.upfile__btn(ref="picture") Sube una imagen
              croppa(
                v-model='newUser.picture',
                :width='300',
                :height='300',
                :quality='2',
                placeholder='',
                :prevent-white-space='true',
                @new-image-drawn='handlePicture',
                @draw='handlePicture')
        .form-section__inner
          p.form__mesagge Ups! Vemos que aún no tienes una cuenta. Te crearemos una cuenta rápidamente para que puedas continuar con la publicación de tu venta. Por favor ingresa los siguientes datos:
          .form__row(
            :class='{ "is-danger": errorLog.email }')
            label.form__label(
              for='emailUser') Correo
            span.help(
              v-show='errorLog.email') {{ errorLog.email }}
            input.form__control(
              @keyup='errorLog.email = undefined',
              ref="email",
              v-model='newUser.email',
              id='emailUser',
              type='email',
              disabled)
            p.form__note ¿Ingresaste mal tu email en el paso anterior? <a class="link_underline" @click="$router.go()">Cámbialo aquí</a>
          .form__row(
            :class='{ "is-danger": errorLog.emailConfirm }')
            label.form__label(
              for='emailConfirm') Confirma tu correo
            span.help(
              v-if="errorLog.emailConfirm") {{ errorLog.emailConfirm }}
            input.form__control(
              v-model='newUser.emailConfirm',
              id='emailConfirm',
              type='email',
              data-vv-name='emailConfirm')
          .form__row(
            :class='{ "is-danger": errorLog.password }')
            label.form__label(
              for='passwordUser') Contraseña
            span.help(
              v-if="errorLog.password") {{ errorLog.password }}
            .form__password
              input.form__control(
                @keyup='errorLog.password = undefined',
                ref="password",
                v-model='newUser.password',
                id='passwordUser',
                :type="viewPass ? 'text' : 'password'",
                data-vv-name='password',
                v-on:input='validatePassword')
              span.form__visible.i-view(
                @click='visiblePass')
            span.password-bar(
              v-if="this.newUser.password",
              :class='"level-"+(3-errorLog.passwordDetail.length)')
            //- div.helper(
              v-if='errorLog.passwordDetail.length > 0' )
              ul.helper__list
                li(
                  v-for='detail in errorLog.passwordDetail') {{ detail }}
          .form__row(
            :class='{ "is-danger": errorLog.nombre }')
            label.form__label(
              for='nombre') Nombre
            span.help(
              v-if="errorLog.nombre") {{ errorLog.nombre }}
            input.form__control(
              @keyup='errorLog.nombre = undefined',
              ref="nombre",
              v-model='newUser.nombre',
              id='username',
              type='text',
              data-vv-name='nombre')
          .form__row(:class='{ "is-danger": errorLog.apellidos }')
            label.form__label(
              for='apellidos') Apellidos
            span.help(
              v-if="errorLog.apellidos") {{ errorLog.apellidos }}
            input.form__control(
              @keyup='errorLog.apellidos = undefined',
              ref="apellidos",
              v-model='newUser.apellidos',
              id='userLast',
              type='text',
              data-vv-name='apellidos')
          .form-section.form-section_footer
            .form__row.form__row_away
              button.btn.btn_solid(
                @click.prevent='signUp($event)') Registrarse
        //- .break
        //-   span.break__txt O
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import userAPI from '@/api/user'
Vue.component('croppa', Croppa.component)

// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)
export default {
  name: 'FormSignUpVendedora',
  props: ['email'],
  data () {
    return {
      newUser: {},
      flagSignUp: 'SignUp',
      errorLog: {
        passwordDetail: []
      },
      infoTexts: {},
      regionsList: {},
      toggleImageDelete: false,
      viewPass: false
    }
  },
  methods: {
    visiblePass: function () {
      this.viewPass = !this.viewPass
    },
    signUp: function (event) {
      event.target.disabled = true

      this.validateBeforeSubmit()
      if (Object.keys(this.errorLog).length === 1) {
        const payload = {
          first_name: this.newUser.nombre,
          last_name: this.newUser.apellidos,
          email: this.newUser.email,
          password: this.newUser.password,
          picture: this.newUser.pictureBlob
        }
        const modal = {
          name: 'ModalMessage',
          parameters: {
            type: 'preload',
            title: '¡Gracias! Estamos creando tu cuenta'
          }
        }
        this.$store.dispatch('ui/showModal', modal)
        userAPI.create(payload)
          .then(response => {
            this.$store.dispatch('user/setUser', response.data)
              .then(() => {
                this.$store.dispatch('ui/closeModal')
                this.$store.dispatch('user/loadUser')
                this.$store.dispatch('guestCart/merge')
              }).catch((e) => {
                console.log(e)
              })
          })
          .catch(e => {
            this.$store.dispatch('ui/closeModal')
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
      } else {
        event.target.disabled = false
      }
    },
    validateBeforeSubmit: function () {
      this.errorLog = {
        passwordDetail: []
      }
      if (!this.newUser.password) this.errorLog.password = 'Debes ingresar una contraseña'
      if (!this.newUser.nombre) this.errorLog.nombre = 'Debes ingresar tu nombre'
      if (!this.newUser.apellidos) this.errorLog.apellidos = 'Debes ingresar tus apellidos'
      if (!this.newUser.email) {
        this.errorLog.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.newUser.email)) {
          this.errorLog.email = 'El email que ingresaste no parece válido.'
        }
      }
      if (!this.newUser.email) this.errorLog.emailConfirm = 'Debes ingresar de nuevo tu email'
      if (this.newUser.email !== this.newUser.emailConfirm) this.errorLog.emailConfirm = 'Este email no coincide con el primero que ingresaste'
      if (!this.newUser.picture.hasImage()) this.errorLog.picture = 'Debes cargar una imagen para tu perfil'

      if (Object.keys(this.errorLog)[0] !== 'passwordDetail') this.$refs[Object.keys(this.errorLog)[0]].focus()
      if (Object.keys(this.errorLog)[1]) this.$refs[Object.keys(this.errorLog)[1]].focus()

      this.validatePassword()
    },
    validatePassword: function () {
      this.errorLog.passwordDetail = []

      if (this.newUser.password && this.newUser.password.length < 8) this.errorLog.passwordDetail.push('Tu contraseña debe tener al menos 8 caracteres')
      if (!/[a-zA-Z]/.test(this.newUser.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos una letra')
      if (!/\d+/.test(this.newUser.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos un número')
    },
    handlePicture: function () {
      if (this.newUser.picture.hasImage()) {
        this.newUser.picture.generateBlob((blob) => {
          this.newUser.pictureBlob = blob
        })
        this.toggleImageDelete = true
      }
    },
    removeImage: function (index) {
      this.toggleImageDelete = false
      this.newUser.picture.remove()
      this.newUser.pictureBlob = null
    }
  },
  computed: {
    ...mapState(['guestCart'])
  },
  created () {
    this.newUser.email = this.email
  }
}
</script>
