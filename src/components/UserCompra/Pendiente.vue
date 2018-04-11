<template lang="pug">
.dashboard__subitem
  .dashboard__status
    p.status.status_alert.i-alert-circle {{ statusMessage(sale.status) }}
    p Aún no has terminado tu compra, sube tu comprobante de pago.
  .dashboard__actions
    // Input file
    p Tienes:
      span.dashboard__txt-big 10 Minutos
      | antes de que tu compra se anule
</template>

<script src="./js/Pendiente.js"></script>
