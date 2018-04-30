<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check Compra confirmada y pago recibido
    p.status.status_warning.i-reload A la espera de envío
    p Tu pedido está en proceso de empaque y envío por parte de la vendedora.
</template>

<script src="./js/Pagada.js"></script>
