<template lang="pug">
nav.filter
  ul.filter__group
    //Item Prenda
    li.filter__select(
      :class="{ 'filter__select_open' :isOpenFilter == true}")
      span.filter__arrow(
        @click="OpenFilter") Categoría
        //-To-do: Consumir servicios
      transition(name='toggle-scale')
        ul.filter__list.filter__list_column.toggle-box(
          v-show='isOpenFilter == true')
          li.filter__item
            input.form__input-check(
              id="filterCategory1",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory1") Patalones
          li.filter__item
            input.form__input-check(
              id="filterCategory2",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory2") Camisas
          li.filter__item
            input.form__input-check(
              id="filterCategory3",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory3") Medias
          li.filter__item
            input.form__input-check(
              id="filterCategory4",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory4") Chaquetas
          li.filter__item
            input.form__input-check(
              id="filterCategory5",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory5") Poleras
          li.filter__item
            input.form__input-check(
              id="filterCategory6",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory6") Blusas y camisas
          li.filter__item
            input.form__input-check(
              id="filterCategory7",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory7") Monos
          li.filter__item
            input.form__input-check(
              id="filterCategory8",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory8") Chalecos
          li.filter__item
            input.form__input-check(
              id="filterCategory9",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory9") Abrigos
          li.filter__item
            input.form__input-check(
              id="filterCategory10",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory10") Parkas
          li.filter__item
            input.form__input-check(
              id="filterCategory11",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory11") Kimonos
          li.filter__item
            input.form__input-check(
              id="filterCategory12",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory12") Capris
          li.filter__item
            input.form__input-check(
              id="filterCategory13",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory13") Leggings
          li.filter__item
            input.form__input-check(
              id="filterCategory14",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory14") Jardineras
          li.filter__item
            input.form__input-check(
              id="filterCategory15",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory15") Faldas
          li.filter__item
            input.form__input-check(
              id="filterCategory16",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory16") Ropa Interior
          li.filter__item
            input.form__input-check(
              id="filterCategory17",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory17") Pantalones cortos
          li.filter__item
            input.form__input-check(
              id="filterCategory18",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory18") Accesorios
          li.filter__item
            input.form__input-check(
              id="filterCategory19",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory19") Zapatos
          li.filter__item
            input.form__input-check(
              id="filterCategory20",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory20") Cinturones
          li.filter__item
            input.form__input-check(
              id="filterCategory21",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory21") Anteojos
          li.filter__item
            input.form__input-check(
              id="filterCategory22",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory22") Bisutería
          li.filter__item
            input.form__input-check(
              id="filterCategory23",
              type="checkbox")
            label.filter__check.i-check(
              for="filterCategory23") Sombreros y Gorros
    //Item Talla
    li.filter__select(
      :class="{ 'filter__select_open' :isOpenFilter == true}")
      span.filter__arrow(
        @click="OpenFilter") Talla
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='isOpenFilter == true')
          li.filter__item(
            v-for="(size, subIndex) in sizes")
            input.form__input-check(
            :id="'filterSize' + subIndex",
            type="checkbox")
            label.filter__check.i-check(
              :for="'filterSize' + subIndex") {{ size.name }}
    //Item Marca
    li.filter__select(
      :class="{ 'filter__select_open' :isOpenFilter == true}")
      span.filter__arrow(
        @click="OpenFilter") Marca
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='isOpenFilter == true')
          li.filter__item(
            v-for="(brand, index) in brands")
            input.form__input-check(
            :id="'filterBrand' + index",
            type="checkbox")
            label.filter__check.i-check(
              :for="'filterBrand' + index") {{ brand.name }}
    //Item Color
    li.filter__select(
      :class="{ 'filter__select_open' :isOpenFilter == true}")
      span.filter__arrow(
        @click="OpenFilter") Color
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='isOpenFilter == true')
          li.filter__item(
            v-for="(color, index) in colors")
            input.form__input-check(
            :id="'filterColor' + index",
            type="checkbox")
            label.filter__check.i-check(
              :for="'filterColor' + index")
              span.color-circle(
                :style='{ backgroundColor: color.hex_code }')
              span {{ color.name }}
    //Item Concition
    li.filter__select(
      :class="{ 'filter__select_open' :isOpenFilter == true}")
      span.filter__arrow(
        @click="OpenFilter") Condición
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='isOpenFilter == true')
          li.filter__item(
            v-for="(condition, index) in conditions")
            input.form__input-check(
            :id="'filterCondition' + index",
            type="checkbox")
            label.filter__check.i-check(
              :for="'filterCondition' + index") {{ condition.name }}
    //Item Región
    li.filter__select(
      :class="{ 'filter__select_open' :isOpenFilter == true}")
      span.filter__arrow(
        @click="OpenFilter") Región
        //-To-do: Consumir servicios
    //Item Precio
    li.filter__slide
      .filter__label Precio <span>(CLP)</span>
      .filter__set
        vue-slider(
          ref="slider"
          v-bind="sliderPrice"
          v-model="sliderPrice.value")
        .filter__tooltip
          small.filter__value ${{ sliderPrice.value[0] }}
          small.filter__value ${{ sliderPrice.value[1] }} +

</template>

<script>
import productAPI from '@/api/product'
import vueSlider from 'vue-slider-component'

export default {
  name: 'FilterDesk',
  components: {
    vueSlider
  },
  data () {
    return {
      conditions: {},
      categories: {},
      colors: {},
      brands: {},
      sizes: {},
      isOpenFilter: '',
      sliderPrice: {
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
  },
  methods: {
    OpenFilter () {
      this.isOpenFilter = !this.isOpenFilter
    }
  },
  created: function () {
    productAPI.getAllConditions()
      .then(response => {
        this.conditions = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    productAPI.getAllColors()
      .then(response => {
        this.colors = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    productAPI.getAllBrands()
      .then(response => {
        this.brands = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    productAPI.getAllSizes()
      .then(response => {
        this.sizes = response.data.data
      })
  }
}
</script>
