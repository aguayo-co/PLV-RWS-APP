<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_check.i-check Compra confirmada y pago recibido
  .dashboard__status(v-if="sale.is_chilexpress")
    p.status.status_check.i-check Enviado
    p Empresa:
      span  Chilexpress
    p Número de Seguimiento:
      span  {{ numeroOT }}
    a.link_underline(
      :href="'https://www.chilexpress.cl/Views/ChilexpressCL/Resultado.aspx?uq=' + numeroOT") ¿Dónde está mi paquete?
  //- La vendedora ya lo envió por otra transortadora.
  .dashboard__status(v-else-if="!delivered")
    p.status.status_check.i-check La vendedora ya envío el producto
    p Empresa:
      span  {{ trackingInfo.company }}
    p Número de Seguimiento:
      span  {{ trackingInfo.code }}
  //- Entregado de otra forma.
  .dashboard__status(v-else)
    p.status.status_check.i-check La vendedora ya te entregó tu compra
  .dashboard__actions
    p ¿Ya recibiste tu compra?
    button.btn.btn_solid.btn_block(
      @click.prevent='saleCompleted') Si, ya recibí y me gustó
    a.link_underline(
      @click.prevent='saleReceived') ¿Quieres hacer una devolución?
</template>

<script src="./js/Enviada.js"></script>
