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
                .upfile__btn Sube una imagen
              croppa(
                v-model='picture',
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
            :class='{ "is-danger": errorLog.nombre }')
            label.form__label(
              for='nombre') Nombre
            span.help(
              v-if="errorLog.nombre") {{ errorLog.nombre }}
            input.form__control(
              v-model='nombre',
              id='username',
              type='text',
              data-vv-name='nombre'
            )
          .form__row(:class='{ "is-danger": errorLog.apellidos }')
            label.form__label(
              for='apellidos') Apellidos
            span.help(
              v-if="errorLog.apellidos") {{ errorLog.apellidos }}
            input.form__control(
              v-model='apellidos',
              id='userLast',
              type='text',
              data-vv-name='apellidos')
          .form__row(
            :class='{ "is-danger": errorLog.email }')
            label.form__label(
              for='emailUser') Correo
            span.help(
              v-show='errorLog.email') {{ errorLog.email }}
            input.form__control(
              v-model='email',
              id='emailUser',
              type='email',
              data-vv-name='email')
            span.help(
              v-if='infoTexts.emailExist') {{ infoTexts.emailExist }}
              a(href='#') ¡Recupérala aquí!
          .form__row(
            :class='{ "is-danger": errorLog.emailConfirm }')
            label.form__label(
              for='emailConfirm') Confirma tu correo
            span.help(
              v-if="errorLog.emailConfirm") {{ errorLog.emailConfirm }}
            input.form__control(
              v-model='emailConfirm',
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
                v-model='password',
                id='passwordUser',
                :type="viewPass ? 'text' : 'password'",
                data-vv-name='password',
                v-on:input='validatePassword')
              span.form__visible.i-view(
                @click='visiblePass')
            span.password-bar(
              v-if='errorLog.passwordDetail.length > 0',
              :class='"level-"+(3-errorLog.passwordDetail.length)')
            div.helper(
              v-if='errorLog.passwordDetail.length > 0' )
              ul.helper__list
                li(
                  v-for='detail in errorLog.passwordDetail') {{ detail }}
          .form-section.form-section_footer
            .form__row.form__row_away
              button.btn.btn_solid(
                @click.prevent='validateBeforeSubmit') Registrarse
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
      nombre: '',
      apellidos: '',
      emailConfirm: '',
      password: '',
      flagSignUp: 'SignUp',
      errorLog: {
        passwordDetail: []
      },
      infoTexts: {},
      regionsList: {},
      picture: null,
      pictureURL: null,
      toggleImageDelete: false,
      viewPass: false
    }
  },
  methods: {
    visiblePass: function () {
      this.viewPass = !this.viewPass
    },
    signUp: function () {
      // console.log(this.$store.get('userAuth'))
      const payload = {
        first_name: this.nombre,
        last_name: this.apellidos,
        email: this.email,
        password: this.password,
        picture: this.pictureURL
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
              this.migrateCart()
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
    },
    validateBeforeSubmit: function (e) {
      this.errorLog = {
        passwordDetail: []
      }
      this.infoTexts = {}

      if (!this.nombre) this.errorLog.nombre = 'Debes ingresar tu nombre'
      if (!this.apellidos) this.errorLog.apellidos = 'Debes ingresar tus apellidos'
      if (!this.email) {
        this.errorLog.email = 'Debes ingresar tu email'
      } else {
        if (!/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.email)) {
          this.errorLog.email = 'El email que ingresaste no parece válido.'
        }
      }
      if (!this.email) this.errorLog.emailConfirm = 'Debes ingresar de nuevo tu email'
      if (this.email !== this.emailConfirm) this.errorLog.emailConfirm = 'Este email no coincide con el primero que ingresaste'

      this.validatePassword(e)

      if (Object.keys(this.errorLog).length === 1 && this.errorLog.passwordDetail.length === 0) {
        this.signUp()
      }
    },
    validatePassword: function (e) {
      this.errorLog.passwordDetail = []

      if (!this.password) this.errorLog.password = 'Debes ingresar una contraseña'
      if (this.password.length < 8) this.errorLog.passwordDetail.push('Tu contraseña debe tener al menos 8 caracteres')
      if (!/[a-zA-Z]/.test(this.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos una letra')
      if (!/\d+/.test(this.password)) this.errorLog.passwordDetail.push('Tu contraseña debe contener al menos un número')
      if (!this.picture.hasImage()) this.errorLog.picture = 'Debes cargar una imagen para tu perfil'
    },
    handlePicture: function () {
      if (this.picture.hasImage()) {
        this.pictureURL = this.picture.generateDataUrl()
        this.toggleImageDelete = true
      }
    },
    removeImage: function (index) {
      this.toggleImageDelete = false
      this.picture.remove()
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
  },
  computed: {
    ...mapState(['guestCart'])
  },
  created () {
  }
}
</script>
