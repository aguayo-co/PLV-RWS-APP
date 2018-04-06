<template lang="pug">
  //Item Precio
  li.filter__slide
    .filter__label Precio <span>(CLP)</span>
    .filter__set
      vue-slider(
        ref="slider"
        v-bind="sliderPrecio"
        v-model="sliderPrecio.value")
      .filter__tooltip
        small.filter__value ${{ sliderPrecio.value[0] }}
        small.filter__value ${{ sliderPrecio.value[1] }} +

</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  name: 'FilterPrecio',
  components: {
    vueSlider
  },
  data () {
    return {
      sliderPrecio: {
        value: [
          '5000',
          '150000'
        ],
        width: '100%',
        height: 1,
        min: 5000,
        max: 150000,
        interval: 5000,
        piecewise: true,
        formatter: '$ {value}',
        tooltip: 'false',
        piecewiseStyle: {
          'visibility': 'hidden'
        },
        bgStyle: {
          'backgroundColor': '#000'
        },
        processStyle: {
          'backgroundColor': '#fe7676'
        },
        sliderStyle: {
          'boxShadow': 'none',
          'border': '1px solid #000'
        }
      }
    }
  }
}
</script>
