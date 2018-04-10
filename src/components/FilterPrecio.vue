<template lang="pug">
  //Item Precio
  li.filter__slide
    .filter__label Precio <span>(CLP)</span>
    .filter__set
      vue-slider(
        @drag-end="$emit('price-change')",
        @drag-start="$emit('slide')",
        ref="slider",
        v-bind="sliderPrecio",
        v-model="sliderPrecio.value")
      .filter__tooltip
        small.filter__value ${{ sliderPrecio.value[0] }}
        small.filter__value ${{ sliderPrecio.value[1] }} +

</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  props: ['sliderPrecio'],
  name: 'FilterPrecio',
  components: {
    vueSlider
  },
  data () {
    return {
    }
  }
}
</script>
