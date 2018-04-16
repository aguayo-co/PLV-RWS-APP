<template lang="pug">
.layout
  //- Datos personales
  .layout-inner
    .content-grid
      UserMenu(
        v-if="mqDesk"
      )
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
