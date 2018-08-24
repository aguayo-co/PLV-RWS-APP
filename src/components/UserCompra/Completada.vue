<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_check.i-check Producto recibido
  Calificar(:sale="sale" v-on:refresh-sale="$emit('refresh-sale', $event)")
</template>

<script src="./js/Completada.js"></script>
