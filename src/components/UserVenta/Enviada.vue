<template lang="pug">
.dashboard__subitem(v-if="!chileExpress")
  .dashboard__status
    p.status.status_check.i-check(v-if="sale.status === 40") Pedido Enviado
    p.status.status_check.i-check(v-else) Pedido Entregado
    p.status.status_alert.i-rocket Esperando confirmación de recibido de la Compradora.
  .dashboard__actions
    p Ya nos informaste que enviaste el pedido,
    p Empresa:
      span  Correos de Chile
    p Número de Seguimiento:
      span  AS123102931203
    p Estamos esperando que la compradora nos confirme que recibió el pedido.
    a.link_underline(
      href="#") « Ingresé mal el número de seguimiento o entregué de otra forma

    p Escogiste juntarte con la vendedora.
    p Estamos esperando que ella nos confirme que ya le entregaste el pedido.
    a.link_underline(
      href="#") Lo entregué de otra forma

.dashboard__subitem(v-else)
  .dashboard__status
    p.status.status_check.i-check(v-if="sale.status === 40") Pedido Enviado por ChileExpress
    p.status.status_check.i-check(v-else) Pedido Entregado por ChileExpress
    p.status.status_check.i-rocket # de seguimiento: 991238891238FR
    p.status.status_alert.i-rocket Esperando confirmación de recibido de la Compradora.
  .dashboard__actions
    p Ya nos informaste el número de seguimiento y se lo enviamos a la vendedora.
    a.link_underline(
      href="#") « Ingresé mal el número de seguimiento o entregué de otra forma

</template>

<script src="./js/Enviada.js"></script>
