<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tu clóset
    //- Data user
    UserDataCloset
    UserVacaciones
    TabsProducto

</template>

<script>
import UserDataCloset from '@/components/UserDataCloset'
import UserVacaciones from '@/components/UserVacaciones'
import TabsProducto from '@/components/TabsProducto'

export default {
  name: 'UserFavoritos',
  components: {
    UserDataCloset,
    UserVacaciones,
    TabsProducto
  }
}
</script>
