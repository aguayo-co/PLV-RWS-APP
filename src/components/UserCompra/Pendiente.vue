<template lang="pug">
//- Hay dos posibles escenarios:
//- * Plataforma local
//- * PLataforma externa
//-
//- Con la plataforma externa sólo mostramos mensaje sin acciones.
//- Con la plataforma local tenemos acciones.
.dashboard__subitem(v-if="isTransfer")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_alert.i-alert-circle Pendiente de pago
    p.status.status_alert.i-reload(v-if="paymentStatus === 98") Pago no validado.
    p.status.status_warning.i-reload(v-else-if="hasReceipt") Comprobante de transferencia bancaria en proceso de validación.

  .dashboard__actions(v-if="!hasReceipt")
    p Aún no has terminado tu compra, sube tu comprobante de pago.
    p Tienes:
      span.dashboard__txt-big
        CountDown(:time="sale.order.payments[0].cancel_by")
      | antes de que tu compra se anule

  .dashboard__actions(v-else-if="paymentStatus === 98")
    p Tu pago no ha sido validado, ¿Puedes reenviar la confirmación de tu pago?

  .dashboard__actions(v-else)
    p Ya nos enviaste tu comprobante de transferencia, ahora estamos validando la transacción.
    a.link_underline(
      v-if="!canUploadReceipt"
      @click.prevent="newReceipt") « Creo que subí el comprobante incorrecto

  .dashboard__actions(v-if="canUploadReceipt")
    form.form.form_file(
        @submit.prevent="uploadReceipt")
      input.form__file(
        type="file",
        name="file-comprobante",
        :id="sale.id + 'sale-file-comprobante'",
        @change="setReceipt($event)"
        multiple="")
      label.form__label_file(:for="sale.id + 'sale-file-comprobante'")
        span.help(
          v-show="errorLog.transfer_receipt") {{ errorLog.transfer_receipt }}
        .form__file-input
          span.form-file__txt {{ fileName }}
          span.form-file__label Seleccionar archivos
      button.btn.btn_solid(
          @click.prevent=""
          v-if="loading.upload")
          Dots
      button.btn.form-file__btn(v-else) Subir comprobante

.dashboard__subitem(v-else)
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_alert.i-alert-circle Pendiente de pago
    p Estamos esperando confirmación de tu transacción por parte de la plataforma de pagos.

</template>

<script src="./js/Pendiente.js"></script>
