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
          .form__row(
            :class='{ "is-danger": errorLog.apellidos }')
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
              .form__row
                label.form__label(
                  for='new-address') Dirección
                span.help(
                  v-show="errorLog.new_address") {{ errorLog.new_address }}
                input.form__control(
                  id='new-address'
                  v-model="newAddressData['new_address']"
                  type='text')
              .form__row
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
              .form__row
                label.form__label(
                  for='new-address-city') Ciudad
                select.form__select(
                  v-model="newAddressData['new_city']")
                  option
                  option(
                    v-for="citi in cities") {{ citi }}

              .form__row
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
import axios from 'axios'
import Vue from 'vue'
import Croppa from 'vue-croppa'
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
      regionsList: {}
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
    },
    setSuccess: function () {
      this.flagSignUp = 'Success'
      this.$emit('setSuccess')
    },
    setError: function () {
      this.flagSignUp = 'Error'
      this.$emit('setError')
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
    this.$store.dispatch('user/loadAddresses')
    const vm = this
    userAddressesAPI.getRegions().then((response) => {
      vm.regionsList = response.data
    })
  }
}
</script>
