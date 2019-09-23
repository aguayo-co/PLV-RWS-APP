<template lang="pug">
.layout-page
  Loader(v-if="loading")
  .status.status_alert.i-alert-circle(v-else-if="!owner") La cuenta de esta Prilover fue eliminada.
  template(v-else)
    UserDataCloset(:owner="owner", linkTo='reviews')
    section.section_product
      GridProducto(
        :preFilter="{ 'filter[user_id]': userId, 'filter[status]': '10,19' }",
        :infinite="true")
</template>

<script>
import UserDataCloset from '@/components/UserDataCloset'
import GridProducto from '@/components/GridProducto'
import usersAPI from '@/api/user'

export default {
  name: 'Closet',
  props: ['userId'],
  components: {
    UserDataCloset,
    GridProducto
  },
  data () {
    return {
      owner: {},
      loading: true
    }
  },
  methods: {
    loadOwner () {
      const localRequest = this.loading = usersAPI.getUserById(this.userId)
        .then(response => {
          if (localRequest === this.loading) {
            this.owner = response.data
            this.loading = false
          }
        })
        .catch(e => {
          if (this.$getNestedObject(e, ['response', 'status']) === 404) {
            this.$notFound()
          }
        })
    }
  },
  watch: {
    'userId' () {
      this.loadOwner()
    }
  },
  created () {
    this.loadOwner()
  }
}
</script>
