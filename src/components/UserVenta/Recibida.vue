<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check Pedido recibido por la vendedora
</template>

<script src="./js/Recibida.js"></script>
