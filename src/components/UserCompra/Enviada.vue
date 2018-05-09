<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check Compra confirmada y pago recibido
    div(v-if="sale.status === 40")
      p.status.status_check.i-check Enviado
      p Nº de seguimiento: 00123123123
      p Empresa de mensajería: Chile Express
      a.link_underline(href='#') ¿Dónde está mi paquete?
    p.status.status_check.i-check(v-else) La compradora ya te entregó el producto
  .dashboard__actions
    p ¿Ya recibiste este producto?
    button.btn.btn_solid.btn_block(
      @click.prevent='saleReceived') Si, lo recibí y me lo quedo
    a.link_underline(
      href='#') ¿Algo no te gustó de tu producto?
</template>

<script src="./js/Enviada.js"></script>
