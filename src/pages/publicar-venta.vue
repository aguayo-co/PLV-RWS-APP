<template lang="pug">
.layout-page
  form.form.form_big(
    id='form-publicar',
    action='#',
    submit.prevent='',
    method='post')
    FormPublicarVenta
    //-1.1b Usuaria selecciona su método de envío
    .step
      .layout-inner
        fieldset.form-section
          legend.subhead.form-section__title Estás a un paso de terminar la publicación de tu producto.
            p.form-section__subtitle Habilita los métodos de envío disponibles para todos tus productos
          .box
            h3.box__title Envío estándar (Chilexpress) <span class="txt-underline">$3000</span>
            .box__grid
              .box__lead
                p.box__txt Al seleccionar esta opción de despacho, las entregas de tu compra serán la disponibilidad y se efectuarán de Lunes a Sábado entre las 9:00 y 19:00 hrs.
              .box__switch
                .form__switch
                  input.switch__input(
                    type="checkbox",
                    id="standard",
                    checked)
                  label.switch__label(
                    for="standard")
                      span.switch__status
            p.box__disclaimer Tiempo de entrega entre 1 y 5 días hábiles
          .box
            h3.box__title Acuerdo envío con vendedora
            .box__grid
              .box__lead
                p.box__txt Al seleccionar esta opción de despacho, tu eres quien decide si te juntarás con tu comprador o enviaras con otro proveedor de envíos.
              .box__switch
                .form__switch
                  input.switch__input(
                    type="checkbox",
                    id="saleswoman")
                  label.switch__label(
                    for="saleswoman")
                      span.switch__status
          p.notify__info.i-alert-info Recuerda que siempre podrás modificar tu método de envio desde la sección  "Método de envío" en tu perfil
        .form-section.form-section_footer
          .form__row
            button.btn.btn_solid Publicar
  //- 1.1a Usuaria registrada a la que le faltan datos
  FormPublicarUserData
  //- 2a Usuaria no logueada
      2b Usuaria registrada no logueada
  FormPublicarLogin
  //- 3a Usuaria no registrada
  FormPublicarSignUp

</template>

<script>
import FormPublicarVenta from '@/components/FormPublicarVenta'
import FormPublicarUserData from '@/components/FormPublicarUserData'
import FormPublicarLogin from '@/components/FormPublicarLogin'
import FormPublicarSignUp from '@/components/FormPublicarSignUp'

export default {
  name: 'PublicarVenta',
  components: {
    FormPublicarVenta,
    FormPublicarUserData,
    FormPublicarLogin,
    FormPublicarSignUp
  }
}
</script>
