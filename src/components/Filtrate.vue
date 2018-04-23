<template lang="pug">
nav.filtrate
  .filtrate__item(
    :search="search",
    v-if="search")
    form.filtrate(action='', method='GET')
      .filtrate__row.i-search
        input.filtrate__input#searchMain(type='text', name='search', placeholder="Buscar")
  .filtrate__item(
    :order="order",
    v-if="order")
    span.filtrate__btn(@click.stop="openList") {{ listOptions.options[listOptions.selected].name }}
    transition(name='toggle-scale')
      ul.filtrate__list(v-if="listActive")
        li.filtrate__list-item(
          @click.stop.stop="changeOrder(option.id)"
          v-for="option in listOptions.options") {{ option.name }}
</template>

<script>
export default {
  name: 'Filtrate',
  props: [
    'search',
    'order'
  ],
  data () {
    return {
      listActive: false,
      item: null,
      listOptions: {
        selected: 0,
        options: [
          { id: 0, name: 'Lo último' },
          { id: 1, name: 'Menor precio' },
          { id: 2, name: 'Mayor precio' },
          { id: 3, name: 'Destacados' },
          { id: 4, name: 'Nuestros favoritos' }
        ]
      }
    }
  },
  methods: {
    openList: function () {
      this.listActive = !this.listActive
    },
    changeOrder: function (listOptionId) {
      this.listOptions.selected = listOptionId
      this.listActive = false
    }
  }
}
</script>
