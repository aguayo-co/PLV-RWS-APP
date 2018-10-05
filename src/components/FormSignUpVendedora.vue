<template lang="pug">
//- 3a Usuaria no registrada
.step
  .layout-inner
    form.form.form_big(
      @submit.prevent='signUp')
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
              @input='$delete(errorLog, "email")',
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
              ref="emailConfirm",
              id='emailConfirm',
              type='email')
          .form__row(
            :class='{ "is-danger": errorLog.password }')
            label.form__label(
              for='passwordUser') Contraseña
            //- v-if causa que el input pierda el foco al desaparecer
            //- en este caso se debe usar v-show.
            span.help(
              v-show="errorLog.password") {{ errorLog.password }}
            .form__password
              input.form__control(
                @input='$delete(errorLog, "password")',
                ref="password",
                v-model='newUser.password',
                id='passwordUser',
                :type="viewPass ? 'text' : 'password'")
              span.form__visible.i-view(
                @click='visiblePass')
            span.password-bar(
              v-if="this.newUser.password",
              :class='"level-" + (3 - passwordSuggestions.length)')
            div.helper(
              v-if='passwordSuggestions.length > 0' )
              ul.helper__list
                li(
                  v-for='detail in passwordSuggestions') {{ detail }}
          .form__row(
            :class='{ "is-danger": errorLog.nombre }')
            label.form__label(
              for='nombre') Nombre
            span.help(
              v-if="errorLog.nombre") {{ errorLog.nombre }}
            input.form__control(
              @input='$delete(errorLog, "nombre")',
              ref="nombre",
              v-model='newUser.nombre',
              id='username',
              type='text')
          .form__row(:class='{ "is-danger": errorLog.apellidos }')
            label.form__label(
              for='apellidos') Apellidos
            span.help(
              v-if="errorLog.apellidos") {{ errorLog.apellidos }}
            input.form__control(
              @input='$delete(errorLog, "apellidos")',
              ref="apellidos",
              v-model='newUser.apellidos',
              id='userLast',
              type='text')
          .form-section.form-section_footer
            .form__row.form__row_away
              button.btn.btn_solid(:disabled="processing") Registrarse
</template>

<script>
import { mapState } from 'vuex'
import Password from '@/Mixin/js/Password'
import userAPI from '@/api/user'

export default {
  name: 'FormSignUpVendedora',
  props: ['email'],
  mixins: [Password],
  data () {
    return {
      processing: false,
      newUser: {},
      flagSignUp: 'SignUp',
      errorLog: {},
      infoTexts: {},
      regionsList: {},
      toggleImageDelete: false,
      viewPass: false
    }
  },
  methods: {
    visiblePass () {
      this.viewPass = !this.viewPass
    },
    signUp (event) {
      this.processing = true
      this.validateBeforeSubmit()

      if (Object.keys(this.errorLog).length > 0) {
        this.processing = false
        return
      }
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
          return this.$store.dispatch('user/setUser', response.data)
        }).then(() => {
          this.$store.dispatch('ui/closeModal')
          this.$store.dispatch('guestCart/merge')
        })
        .catch(e => {
          this.$store.dispatch('ui/closeModal')
          if (this.$getNestedObject(e, ['response', 'data', 'errors', 'exists'])) {
            this.infoTexts.emailExist = 'Parece que este email ya está siendo usado. ¿Olvidaste tu contraseña?'
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
          this.processing = false
        })
    },
    validateBeforeSubmit () {
      this.errorLog = {}
      if (!this.newUser.picture.hasImage()) this.$set(this.errorLog, 'picture', 'Debes cargar una imagen para tu perfil')
      if (!this.newUser.email) {
        this.$set(this.errorLog, 'email', 'Debes ingresar tu email')
      } else {
        if (!/^(?:[\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(this.newUser.email)) {
          this.$set(this.errorLog, 'email', 'El email que ingresaste no parece válido.')
        }
      }
      if (!this.newUser.emailConfirm) this.$set(this.errorLog, 'emailConfirm', 'Debes ingresar de nuevo tu email')
      if (this.newUser.emailConfirm && this.newUser.email !== this.newUser.emailConfirm) this.$set(this.errorLog, 'emailConfirm', 'Este email no coincide con el primero que ingresaste')
      if (!this.newUser.nombre) this.$set(this.errorLog, 'nombre', 'Debes ingresar tu nombre')
      if (!this.newUser.apellidos) this.$set(this.errorLog, 'apellidos', 'Debes ingresar tus apellidos')

      this.validatePassword()

      if (Object.keys(this.errorLog)[0]) this.$refs[Object.keys(this.errorLog)[0]].focus()
    },
    handlePicture () {
      if (this.newUser.picture.hasImage()) {
        this.newUser.picture.generateBlob((blob) => {
          this.newUser.pictureBlob = blob
        })
        this.toggleImageDelete = true
      }
    },
    removeImage (index) {
      this.toggleImageDelete = false
      this.newUser.picture.remove()
      this.newUser.pictureBlob = null
    }
  },
  computed: {
    ...mapState(['guestCart']),
    password () {
      return this.newUser.password
    }
  },
  created () {
    this.newUser.email = this.email
  }
}
</script>
