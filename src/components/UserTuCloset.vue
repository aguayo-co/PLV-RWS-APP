<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tu clóset
    //- Data user editable con cover
    UserDataTuCloset
    UserVacaciones
    TabsProducto(
      v-if="user.id"
      :user="user")

</template>

<script>
import UserDataTuCloset from '@/components/UserDataTuCloset'
import UserVacaciones from '@/components/UserVacaciones'
import TabsProducto from '@/components/TabsProducto'
import { mapState } from 'vuex'

export default {
  name: 'UserTuCloset',
  components: {
    UserDataTuCloset,
    UserVacaciones,
    TabsProducto
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
