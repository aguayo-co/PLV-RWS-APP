<template lang="pug">
.modal__slot.content-slot
  //- Opción 1: Pago externo
  .notify(v-if="!transfer")
    header.head_ico
      h2.title Estás a un paso de obtener tu compra.
      p.subtitle_heart Estamos esperando confirmación de tu transacción por parte de la plataforma de pagos.

  //- Opción 2: Pago por transferencia
  .notify(v-else)
    header.head_ico
      small.ico__title.i-clock 10:00
      h2.title Estás a un paso de obtener tu compra.
      p.subtitle_heart Aun no has terminado tu compra, sube tu comprobante de pago.
    .content-slot__inner
      form.form.form_file(
        @submit.prevent="uploadReceipt")
        .notify__body
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
          p.notify__txt Recuerda que tienes un máximo de 10 minutos para realizar tu transferencia, de lo contrario tu compra se cancelará automáticamente
        .notify__footer
          button.btn.btn_solid Enviar comprobante
</template>

<script src="./js/CompraPagando.js"></script>
