<template lang="pug">
  .btn-sticky
    router-link.btn-sticky__link.i-tag(:to="{ name: 'publicar-venta' }") Comienza a vender
</template>

<script>
export default {
  name: 'ButtonSticky'
}
</script>
