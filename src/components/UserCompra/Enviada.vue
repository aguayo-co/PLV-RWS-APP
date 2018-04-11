<template lang="pug">
.dashboard__subitem
  .dashboard__status
    p.status.status_check.i-check Compra confirmada y pago recibido
    p.status.status_check.i-check Enviado
    p Nº de seguimiento: 00123123123
    p Empresa de mensajería: Chile Express
    a.link_underline(href='#') ¿Dónde está mi paquete?
  .dashboard__actions
    p ¿Ya recibiste este producto?
    a.btn.btn_solid.btn_block(
    href='#') Si, Recibí y me lo quedo
    a.link_underline(
    href='#') ¿Algo no te gustó de tu producto?
</template>

<script src="./js/Enviada.js"></script>
