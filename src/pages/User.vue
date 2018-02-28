<template lang="pug">
.layout
  //- Datos personales
  .layout-inner
    .content-grid
      UserMenu
      router-view
</template>

<script>
import UserMenu from '@/components/UserMenu'

export default {
  name: 'User',
  components: {
    UserMenu
  }
}
</script>
