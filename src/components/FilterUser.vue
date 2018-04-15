<template lang="pug">
//Filtro status
.filter-end
  ul.filter__box
    li.filter__box-select(@click.stop="OpenFilter('order')")
      span.filter__arrow
        .filter__box-label <strong>{{ optionStatus.options[optionStatus.selected].name }}</strong>
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show="dropdownState.order && active")
          li.filter__item(
            @click.stop.stop="changeOrder(option.id)"
            v-for="option in optionStatus.options") {{ option.name }}

</template>

<script>
const filterFields = {
  order: null
}
export default {
  name: 'FilterUser',
  data () {
    return {
      optionStatus: {
        selected: 0,
        options: [
          { id: 0, name: 'Todas' },
          { id: 1, name: 'Pendientes de envío' },
          { id: 2, name: 'Pendientes de pago' }
        ]
      },
      dropdownState: {...filterFields},
      active: false
    }
  },
  methods: {
    OpenFilter: function (filter) {
      const dropdownState = this.dropdownState[filter]
      this.dropdownState = {...filterFields}
      this.dropdownState[filter] = !dropdownState
      this.active = !this.active
    },
    closeFilters: function () {
      this.dropdownState = {...filterFields}
    }
  }
}
</script>
