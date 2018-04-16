<template lang="pug">
.single__step
  .alert
    p.alert__txt.i-alert-circle Ha ocurrido un problema, no pudimos validar la transferencia bancaria.
  .step-data__box
    a.btn.btn_solid(href='#') Reenviar comprobante
  .step-data__box
    a.link_underline(href='#') No quiero ser una Prilover Star
</template>

<script>

export default {
  name: 'UserAlertaErrorTransferencia'
}
</script>
