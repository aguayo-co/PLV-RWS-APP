<template lang="pug">
//- Sugerencias de búsqueda a nivel de:
    marcas, categorías, nombres de Prilovers.
form.search(@submit.prevent="search")
  .search__row
    input.search__input#searchMain(type='search', name='search', placeholder='¿Qué buscas?', v-model="query")
    input.search__btn(type='submit', value='')
</template>

<script>
export default {
  name: 'PageHeaderSearch',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search: function () {
      this.$router.push({ name: 'search', params: { query: this.query } })
    }
  }
}
</script>
