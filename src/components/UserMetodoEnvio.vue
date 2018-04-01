<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Método de envío
      p.single__subtitle Habilita los métodos de envío disponibles para todos tus productos
      form.form(
        id="form-user-data"
        v-on:submit='',
        action='#',
        method='post')
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
          .form__row.form__row_away.form__btn
            button.btn.btn_solid Guardar

</template>

<script>
export default {
  name: 'UserMetodoEnvio'
}
</script>
