<template lang="pug">
//- Envíos que NO son por ChileExpress.
.dashboard__subitem(v-if="!chileExpress")
  .dashboard__status
    p.status.status_check.i-check(v-if="delivered") Pedido Entregado
    p.status.status_check.i-check(v-else) Pedido Enviado
    p.status.status_alert.i-rocket Esperando confirmación de recibido de la Compradora.
  //- Si tenemos información de rastréo, la mostramos.
  .dashboard__actions(v-if="trackingInfo")
    p Ya nos informaste que enviaste el pedido,
    p Empresa:
      span  {{ trackingInfo.company }}
    p Número de Seguimiento:
      span  {{ trackingInfo.code }}
    p Estamos esperando que la compradora nos confirme que recibió el pedido.
    a.link_underline(
      href="#",
      @click.prevent="askForShippingDetails") « Ingresé mal el número de seguimiento o entregué de otra forma

  //- De lo contrario, mostramos las notas del envío.
  .dashboard__actions(v-else)
    p Escogiste juntarte con la vendedora.
    p Estamos esperando que ella nos confirme que ya le entregaste el pedido.

//- Envíos que SI son por ChileExpress.
.dashboard__subitem(v-else)
  .dashboard__status
    p.status.status_check.i-check(v-if="!delivered") Pedido Enviado por ChileExpress
    p.status.status_check.i-check(v-else) Pedido Entregado por ChileExpress
    p.status.status_check.i-rocket # de seguimiento: 991238891238FR
    p.status.status_alert.i-rocket Esperando confirmación de recibido de la Compradora.
  .dashboard__actions
    p Ya nos informaste el número de seguimiento y se lo enviamos a la vendedora.
    a.link_underline(
      href="#") « Ingresé mal el número de seguimiento o entregué de otra forma

</template>

<script src="./js/Enviada.js"></script>
