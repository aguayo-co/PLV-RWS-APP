<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_alert.i-alert-circle Compra cancelada
</template>

<script src="./js/Cancelada.js"></script>
