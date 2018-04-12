<template lang="pug">
.dashboard__subitem
  //- Hay dos posibles escenarios:
  //- * Plataforma local
  //- * PLataforma externa
  //-
  //- Con la plataforma externa sólo mostramos mensaje sin acciones.
  //- Con la plataforma local tenemos acciones.

  .dashboard__status
    p.status.status_alert.i-alert-circle Pendiente de pago

    p(v-if="!isTransfer") Estamos esperando confirmación de tu transacción por parte de la plataforma de pagos.
    p(v-else-if="!hasReceipt") Aún no has terminado tu compra, sube tu comprobante de pago.

  .dashboard__actions(v-if="isTransfer && hasReceipt")
    p.status.status_warning.i-reload Comprobante de pago en proceso de validación.
    p Ya nos enviaste tu comprobante de pago, ahora estamos validando la transacción.
    a.link_underline(
      href="#") « Creo que subí el comprobante incorrecto

  .dashboard__actions(v-else-if="isTransfer && !hasReceipt")
    p Tienes:
      span.dashboard__txt-big 10 Minutos
      | antes de que tu compra se anule
</template>

<script src="./js/Pendiente.js"></script>
