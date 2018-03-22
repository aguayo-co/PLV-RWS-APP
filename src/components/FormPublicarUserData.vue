<template lang="pug">
//- 1.1a Usuaria registrada a la que le faltan datos
.step
  .layout-inner
    form.form.form_big(
      v-on:submit='',
      action='#',
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
          .form__row
            label.form__label(
              for='phoneUser') Teléfono
            input.form__control(
              id='phoneUser',
              type='tel')
            p.form__note (esta info no será pública. Sólo se entregará a tu compradora.)
          .form__row
            label.form__label(
              for='addressUser') Dirección
            input.form__control(
              id='addressUser',
              type='text')
          .form__row
            label.form__label(
              for='addressUser-region') Región
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form__row
            label.form__label(
              for='addressUser-zone') Comuna
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form-section.form-section_footer
            .form__row.form__row_away
              button.btn.btn_solid Registrarse
</template>

<script>
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  name: 'FormPublicarUserData'
}
</script>
