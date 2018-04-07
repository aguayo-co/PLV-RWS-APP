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
              a.delete(
                v-show='toggleImageDelete',
                @click='removeImage') Eliminar
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
          fieldset.form__set
            legend.form__legend Nueva dirección
            .form__grid
              .form__row(:class='{ "is-danger": errorLog.new_address }')
                label.form__label(
                  for='new-address') Dirección
                span.help(
                  v-show="errorLog.new_address") {{ errorLog.new_address }}
                input.form__control(
                  id='new-address'
                  v-model="newAddressData['new_address']"
                  type='text')
              .form__row(:class='{ "is-danger": errorLog.new_region }')
                label.form__label(
                  for='new-address-region') Región
                span.help(
                  v-show="errorLog.new_region") {{ errorLog.new_region }}
                select.form__select(
                  v-model="newAddressData['new_region']")
                  option
                  option(
                    v-for="region in regions") {{ region }}

            .form__grid
              .form__row(:class='{ "is-danger": errorLog.new_city }')
                label.form__label(
                  for='new-address-city') Ciudad
                span.help(
                  v-show="errorLog.new_city") {{ errorLog.new_city }}
                select.form__select(
                  v-model="newAddressData['new_city']")
                  option
                  option(
                    v-for="city in cities") {{ city }}

              .form__row(:class='{ "is-danger": errorLog.new_zone }')
                label.form__label(
                  for='new-address-zone') Comuna
                span.help(
                  v-show="errorLog.new_zone") {{ errorLog.new_zone }}
                select.form__select(
                  v-model="newAddressData['new_zone']")
                  option
                  option(
                    v-for="zone in zones") {{ zone }}
          .form__row(
            :class='{ "is-danger": errorLog.password }')
            label.form__label(
              for='passwordUser') Contraseña
            span.help(
              v-if="errorLog.password") {{ errorLog.password }}
            input.form__control(
              v-model='password',
              id='passwordUser',
              type='password',
              data-vv-name='password',
              v-on:input='validatePassword')
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
import Vue from 'vue'
import Croppa from 'vue-croppa'
import userAPI from '@/api/user'
import userAddressesAPI from '@/api/userAddresses'
Vue.component('croppa', Croppa.component)

// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)
const addressFields = {
  new_address: null,
  new_region: null,
  new_city: null,
  new_zone: null
}

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
      newAddressData: {...addressFields},
      infoTexts: {},
      regionsList: {},
      picture: null,
      pictureURL: null,
      toggleImageDelete: false
    }
  },
  methods: {
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

          this.$store.dispatch('user/createAddress', this.newAddressData).then(() => {
            this.$store.dispatch('ui/closeModal')
            this.$router.push('publicar-venta')
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
      if (!this.newAddressData.new_address) this.errorLog.new_address = 'Debes ingresar una dirección'
      if (!this.newAddressData.new_region) this.errorLog.new_region = 'Debes ingresar una región'
      if (!this.newAddressData.new_city) this.errorLog.new_city = 'Debes ingresar una ciudad'
      if (!this.newAddressData.new_zone) this.errorLog.new_zone = 'Debes ingresar una comuna'
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

      if (Object.keys(this.errorLog).length === 1) {
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
    }
  },
  computed: {
    regions: function () {
      return Object.keys(this.regionsList)
    },
    cities: function () {
      const region = this.newAddressData.new_region
      const cities = this.$getNestedObject(this.regionsList, [region, 'children'])
      if (cities) {
        return Object.keys(cities)
      }
    },
    zones: function () {
      const region = this.newAddressData.new_region
      const city = this.newAddressData.new_city
      const zones = this.$getNestedObject(this.regionsList, [region, 'children', city, 'children'])
      if (zones) {
        return Object.keys(zones)
      }
    }
  },
  created: function () {
    const vm = this
    userAddressesAPI.getRegions().then((response) => {
      vm.regionsList = response.data
    })
  }
}
</script>
