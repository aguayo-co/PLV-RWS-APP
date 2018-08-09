<template lang="pug">
.layout-page
  UserDataCloset(:owner="owner")
  section.section_product
    GridProducto(
      :preFilter="{ 'filter[user_id]': ownerId, 'filter[status]': '10,19' }",
      :infinite="true")
</template>

<script>
import UserDataCloset from '@/components/UserDataCloset'
import GridProducto from '@/components/GridProducto'
import usersAPI from '@/api/user'

export default {
  name: 'Closet',
  components: {
    UserDataCloset,
    GridProducto
  },
  data () {
    return {
      owner: {}
    }
  },
  computed: {
    ownerId () {
      return this.$route.params.userId
    }
  },
  created () {
    usersAPI.getUserById(this.ownerId)
      .then(response => {
        this.owner = response.data
      })
  }
}
</script>
