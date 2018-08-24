<template lang="pug">
.dashboard__subitem(v-if="sale_return.status <= 49")
  //-5
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la venta
  .dashboard__status
    p.status.status_warning.i-reload Devolución en proceso
    p La compradora decidió hacer una devolución. Si esta venta incluía más de un producto y la compradora decidió quedarse alguno de ellos, esos créditos ya fueron abonados a tu cuenta.
  //-5b
  .dashboard__actions
    p ¿Ya recibiste la devolución?
    a.btn.btn_solid.btn_block(
      @click.prevent="saleReturnCompleted") Si, la recibí

//- Este estado no se puede generar desde el Front desde el 17 de Ago de 2018.
//- Se deja para mantener la compatibilidad con esta funcionalidad.
.dashboard__subitem(v-else-if="sale_return.status === 50")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la venta
  .dashboard__status
    p.status.status_warning.i-reload Producto devuelto en revisión por Prilov
    p La compradora nos informó de una inconformidad con la venta y lo estamos evaluando.

.dashboard__subitem(v-else-if="sale_return.status === 90")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del venta
  .dashboard__status
    p.status.status_warning.i-reload Venta con devolución

.dashboard__subitem(v-else-if="sale_return.status === 99")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la venta
  .dashboard__status
    p.status.status_check.i-check Devolución cancelada, créditos abonados
    p La compradora no cumplió con el plazo de devolución, se abonaron todos los créditos de esta venta.
</template>

<script src="./js/Devuelta.js"></script>
