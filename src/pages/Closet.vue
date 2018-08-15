<template lang="pug">
.layout-page
  Loader(v-if="loading")
  .status.status_alert.i-alert-circle(v-else-if="!owner") La cuenta de esta Prilover fue eliminada.
  template(v-else)
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
      owner: {},
      loading: true
    }
  },
  computed: {
    ownerId () {
      return this.$route.params.userId
    }
  },
  created () {
    const localRequest = this.loading = usersAPI.getUserById(this.ownerId)
      .then(response => {
        if (localRequest === this.loading) {
          this.owner = response.data
        }
      })
      .catch(e => {
        if (this.$getNestedObject(e, ['response', 'status']) === 404) {
          this.owner = null
        }
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
