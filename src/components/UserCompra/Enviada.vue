<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
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
    p.status.status_check.i-check La compradora ya te entregó el producto
  .dashboard__actions
    p ¿Ya recibiste este producto?
    button.btn.btn_solid.btn_block(
      @click.prevent='saleCompleted') Si, lo recibí y me lo quedo
    a.link_underline(
      @click.prevent='saleReceived'
      href='#') ¿Algo no te gustó de tu producto?
</template>

<script src="./js/Enviada.js"></script>
