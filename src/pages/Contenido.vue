<template lang="pug">
.layout-page
  BannerTop
  BannerSlider
  .layout-inner
    nav.filtrate
      .filtrate__item
        form.filtrate(action='', method='GET')
          .filtrate__row.i-search
            input.filtrate__input#searchMain(type='text', name='search', placeholder="Buscar")
      .filtrate__item
        span.filtrate__btn(@click.stop="openList") {{ listOptions.options[listOptions.selected].name }}
        transition(name='toggle-scale')
          ul.filtrate__list(v-if="listActive")
            li.filtrate__list-item(
              @click.stop.stop="changeOrder(option.id)"
              v-for="option in listOptions.options") {{ option.name }}
</template>

<script>
import BannerTop from '@/components/BannerTop'
import BannerSlider from '@/components/BannerSlider'

export default {
  name: 'Contenido',
  components: {
    BannerTop,
    BannerSlider
  },
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
