<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tus Favoritos
    .favorites
      GridProducto(
      :infinite='true',
      :compact='true')

</template>

<script>
import GridProducto from '@/components/GridProducto'

export default {
  name: 'UserFavoritos',
  components: {
    GridProducto
  }
}
</script>
