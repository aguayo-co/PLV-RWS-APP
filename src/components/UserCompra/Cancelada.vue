<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_alert.i-alert-circle Compra fallida
</template>

<script src="./js/Cancelada.js"></script>
