<template lang="pug">
//- Envíos que NO son por Chilexpress.
.dashboard__subitem(v-if="!sale.is_chilexpress")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check(v-if="delivered") Pedido Entregado
    p.status.status_check.i-check(v-else) Pedido Enviado
    p.status.status_alert.i-rocket Esperando confirmación de recibido por parte de la compradora.
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
    p Escogiste juntarte con la compradora.
    p Estamos esperando que ella nos confirme que ya le entregaste la compra.
    a.link_underline(
      href="#",
      @click.prevent="askForShippingDetails") « Ingresé mal el número de seguimiento o entregué de otra forma

//- Envíos que SI son por Chilexpress.
.dashboard__subitem(v-else)
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check(v-if="!delivered") Pedido Enviado por Chilexpress
    p.status.status_check.i-check(v-else) Pedido Entregado por Chilexpress
    p.status.status_check.i-rocket # de seguimiento: 991238891238FR
    p.status.status_alert.i-rocket Esperando confirmación de recibido por parte de la compradora.

</template>

<script src="./js/Enviada.js"></script>
