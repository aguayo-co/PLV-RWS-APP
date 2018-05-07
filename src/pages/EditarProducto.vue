<template lang="pug">
.layout-page
  section.section_product(v-show='loading')
    p.preload
      span.preload__spin.preload__spin_1
      span.preload__spin.preload__spin_2
      span.preload__spin.preload__spin_3
      span.preload__spin.preload__spin_4
  section.section_product(v-show="!isOwner")
    .alert
      p.alert__txt.i-sad No puedes editar este producto porque pertenece al clóset de alguien más
  FormEditarProducto(
    v-if="isOwner",
    :productToEdit="product")
</template>

<script>
import FormEditarProducto from '@/components/FormEditarProducto'
import productsAPI from '@/api/product'
import { mapState } from 'vuex'

export default {
  name: 'EditarProducto',
  components: {
    FormEditarProducto
  },
  data () {
    return {
      product: {},
      exists: true,
      loading: true
    }
  },
  computed: {
    ...mapState('user', ['id']),
    isOwner () {
      return this.product.user_id === this.id
    }
  },
  mounted: function () {
    productsAPI.getProductById(this.$route.params.productId)
      .then(response => {
        this.product = response.data
        this.exists = true
        this.loading = false
      })
      .catch(e => {
        this.exists = false
        this.loading = false
      })
  }
}
</script>
