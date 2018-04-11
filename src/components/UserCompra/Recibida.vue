<template lang="pug">
.dashboard__subitem
  .dashboard__status
    p.status.status_check.i-check Producto recibido
  .dashboard__actions
    p ¿Quieres devolver este producto a la vendedora?
    a.link_underline.link_underline_lower(
    href='#') Pensándolo bien, me lo quedo.
    a.btn.btn_solid.btn_block(
    href='#') Estoy segura de devolverlo
    p (Tienes 20h 12m para devolverlo)
</template>

<script src="./js/Recibida.js"></script>
