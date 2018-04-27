<template lang="pug">
//- 1.1a Usuaria registrada a la que le faltan datos
.step
  .layout-inner
    form.form.form_big(
      v-if="!user.picture || !user.about || !user.phone || Object.keys(user.addresses).length === 0"
      v-on:submit='',
      action='#',
      method='post')
      fieldset.form-section
        legend.subhead.form-section__title ¡Te hace falta completar tu perfil para poder vender!
          p.form-section__subtitle Para continuar con la publicación de tu venta por favor completa tus datos.
        .upfile(v-if='!user.picture')
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
                v-model='picture'
                :width="300",
                :height="300",
                :quality="2",
                placeholder="",
                :prevent-white-space="true",
                @new-image-drawn='handlePicture',
                @draw='handlePicture')
        .form-section__inner
          .form__row(
            v-if='!user.about',
            :class='{ "is-danger": errorLog.about }')
            label.form__label(
              for='aboutUser') Sobre ti
            span.help(
              v-if="errorLog.about"
            ) {{ errorLog.about }}
            textarea.form__control(
              v-model='about',
              id='aboutUser')
            p.form__note (esta breve descripción se mostrará cuando otras Prilover visiten Tu Closet)
          .form__row(
            v-if='!user.phone',
            :class='{ "is-danger": errorLog.phone }')
            label.form__label(
              for='phoneUser') Teléfono
            span.help(
              v-if="errorLog.phone"
            ) {{ errorLog.phone }}
            input.form__control(
              id='phoneUser',
              v-model='phone',
              type='tel')
            p.form__note (esta info no será pública. Sólo se entregará a tu compradora.)
          .form__row(
            v-if='Object.keys(user.addresses).length === 0',
            :class='{ "is-danger": errorLog.addresses }')
            label.form__label(
              for='addresses') Direcciones
            span.help(
              v-if="errorLog.addresses"
            ) {{ errorLog.addresses }}
            AddressList
          .form-section.form-section_footer
            .form__row.form__row_away
              button.btn.btn_solid(
                @click.prevent = 'validate') Guardar y continuar
    UserMetodoEnvio(v-else)
</template>

<script>
import Vue from 'vue'
import Croppa from 'vue-croppa'
import AddressList from '@/components/AddressList'
import UserMetodoEnvio from '@/components/UserMetodoEnvio'
import { mapState } from 'vuex'
Vue.component('croppa', Croppa.component)

export default {
  name: 'FormCompleteSeller',
  components: {
    AddressList,
    UserMetodoEnvio
  },
  data () {
    return {
      errorLog: {},
      picture: null,
      pictureURL: null,
      toggleImageDelete: false,
      about: null,
      phone: null,
      addresses: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    validate: function () {
      this.errorLog = {}
      if (!this.about && !this.user.about) this.errorLog.about = 'Debes ingresar una descripción para tu perfil'
      if (!this.phone && !this.user.phone) this.errorLog.phone = 'Debes indicarnos tu teléfono'
      // if (!this.$store.state['user'].addresses) this.errorLog.addresses = 'Debes ingresar al menos una dirección'
      if (!this.picture.hasImage() && !this.user.picture) this.errorLog.picture = 'Debes cargar una imagen para tu perfil'

      if (Object.keys(this.errorLog).length === 0) {
        this.updateUser()
      } else {
      }
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
    updateUser: function () {
      const data = {
        about: this.about,
        phone: this.phone,
        picture: this.pictureURL
      }
      this.$store.dispatch('user/updateWithFile', data)
        .then((response) => {
          console.log(response)
        })
        .catch((e) => {
          console.log(e)
          const modal = {
            name: 'ModalMessage',
            parameters: {
              type: 'alert',
              title: '¡Ups! Parece que ocurrió un error',
              body: Object.values(e.response.data.errors)[0]
            }
          }
          this.$store.dispatch('ui/showModal', modal)
        })
    }
  }
}
</script>
