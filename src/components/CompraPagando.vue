<template lang="pug">
.modal__slot.content-slot
  //- Opción 1: Pago externo
  .notify(v-if="!isTransfer")
    header.head_ico
      h2.title Estás a un paso de terminar tu compra.
      p.subtitle_heart Estamos esperando confirmación de tu transacción por parte de la plataforma de pagos.

  //- Opción 2: Pago por transferencia
  .notify(v-else)
    header.head_ico
      small.ico__title.i-clock 20:00
      h2.title Sube el comprobante de transferencia
      //-p.subtitle_heart Aún no has finalizado tu compra. Sube tu comprobante de transferencia bancaria.
    .content-slot__inner
      form.form.form_file(
        @submit.prevent="uploadReceipt")
        .notify__body.notify__body_center
          p.notify__txt Para finalizar tu compra, ingresa a la página de tu banco y haz la transferencia de $25.000 a la siguiente cuenta:
          .notify__txt.notify__txt_bg
            p <strong>Banco:</strong> BCI (Banco de crédito e inversiones)
            p <strong>Nº Cuenta Corriente:</strong> 61649236
            p <strong>Titular Cuenta:</strong> Prilov
            p <strong>RUT:</strong> 76.541.118-1
            p <strong>Correo:</strong> contacto@prilov.com
          p.notify__txt Una vez realizada la transferencia, carga la foto de tu comprobante a continuación:
          input.form__file(
            type="file",
            name="file-comprobante",
            id="file-comprobante",
            @change="setReceipt($event)"
            multiple="")
          label.form__label_file(for="file-comprobante")
            span.form__file-txt Selecciona archivo
            span.help(
              v-show="errorLog.transfer_receipt") {{ errorLog.transfer_receipt }}
            .form__file-input
              span.form-file__txt {{ fileName }}
              span.form-file__btn Subir
          .notify__bottom
            p.subtitle_heart Tienes un máximo de 20 minutos para <strong>subir</strong> tu comprobante, de lo contrario tu compra se cancelará automáticamente.
            p.notify__txt Si tienes preguntas, escríbenos a contacto@prilov.com
        .notify__footer
          button.btn.btn_solid Terminar compra
</template>

<script src="./js/CompraPagando.js"></script>
