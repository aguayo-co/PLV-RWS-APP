<template lang="pug">
.dashboard__subitem
  .dashboard__status
    p.status.status_check.i-check Compra confirmada y pago recibido
    p.status.status_check.i-check La compradora ya te entregó el producto
  .dashboard__actions
    p ¿Ya recibiste este producto?
    a.btn.btn_solid.btn_block(
    href='#') Si, Recibí y me lo quedo
    a.link_underline(
    href='#') ¿Algo no te gustó de tu producto?
</template>

<script src="./js/Entregada.js"></script>
