<template lang="pug">
.dashboard__subitem(v-if="sale_return.status <= 41")
  //-5
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Producto en proceso de devolución
    p La compradora decidió devolver este producto y está en proceso de enviártelo de vuelta.
  //-5b
  .dashboard__actions
    p ¿Ya recibiste el producto de vuelta?
    a.btn.btn_solid.btn_block(
      @click.prevent="saleReturnReceived"
      href='#') Si, la recibí

.dashboard__subitem(v-else-if="sale_return.status === 49")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Producto en proceso de devolución

  .dashboard__actions
    p ¿Cómo recibiste el producto?
    a.btn.btn_block(
      @click.prevent="saleReturnCompleted"
      href='#') Lo recibí bien
    a.btn.btn_block(
      @click.prevent="saleReturnAdminManagement"
      href='#') Lo recibí en peores condiciones

.dashboard__subitem(v-else-if="sale_return.status === 50")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Producto devuelto en revisión por Prilov
    p Nos informaste de una inconformidad con el producto que te devolvieron y lo estamos evaluando.

.dashboard__subitem(v-else-if="sale_return.status === 90")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Producto devuelto

.dashboard__subitem(v-else-if="sale_return.status === 99")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Devolución cancelada
</template>

<script src="./js/Devuelta.js"></script>
