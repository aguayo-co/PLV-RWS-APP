<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Tu Carrito de Compras
      ul.steps__list
        li.steps__item(
          :class="{steps__item_current: isShoppingCart}")
          span.steps__bullet.i-ok 1
          span.steps__label Carro y Envío
          //-TO DO: Valor compra
          span.steps__value $65.000
        li.steps__item(
          :class="{steps__item_current: isPayment}")
          span.steps__bullet.i-ok  2
          span.steps__label Pago
        li.steps__item(
          :class="{steps__item_current: isPayed}")
          span.steps__bullet.i-ok  3
          span.steps__label Comprobante

  .layout-inner
    // List paso 1:compra y 2:envío y pago
    .list(v-if="isShoppingCart")
      //-grid
      .list__grid
        //-list content
        CompraEnvioPago
        //-end list content

        //-Tabla Total
        CompraDetalle
        //-End Tabla Total
      //-End grid
    //End List paso 1:compra y 2:envío y pago

    //Paso 3: Comprobante
    CompraPagada(v-if="isPayed")
    //End Paso 3: Comprobante

    .modal__slot.content-slot(v-if="isPayment")
      .content-slot__inner
        .notify
          h2.title.notify__title  Estás a un paso de obtener tu compra.
          p.subtitle_heart Aun no has terminado tu compra, sube tu comprobante de pago.
          .notify__body
            form.form.form_file
              input.form__file(
                type="file",
                name="file-comprobante",
                id="file-comprobante",
                multiple="")
              label.form__label_file(for="file-comprobante")
                span.form__file-txt Selecciona archivo
                .form__file-input
                  span.form-file__txt no se elegió archivo
                  span.form-file__btn Subir
            p.notify__txt Recuerda que tienes un máximo de 10 minutos para realizar tu transferencia, de lo contrario tu compra se cancelará automáticamente
          .notify__footer
              button.btn.btn_solid Enviar comprobante
</template>

<script src="./js/compra.js"></script>
