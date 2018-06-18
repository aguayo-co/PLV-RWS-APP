<template lang="pug">
.layout-page
  UserDataCloset(:user="owner" v-on:update:user="owner = $event")
  section.section_product
    GridProducto(
      v-if="owner.id"
      :preFilter="{ 'filter[user_id]': owner.id, 'filter[status]': '10,19' }",
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
    userId () {
      return this.$getNestedObject(this.$store.state, ['user', 'id'])
    }
  },
  created: function () {
    usersAPI.getUserById(this.$route.params.userId)
      .then(response => {
        this.owner = response.data
      })
  }
}
</script>
