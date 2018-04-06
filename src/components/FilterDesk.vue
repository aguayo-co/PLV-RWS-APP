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
    FilterPrecio
  //Filtro Orden
  ul.filter__list
      li.filter__select_header.i-close(
        @click='openFMultinivel')
      //Item Prenda
      li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
        .filter__item-check
          input#filterSimple_1.filter__input-check(
            type="checkbox")
          label.filter__label-check.i-ok(
            for="filterSimple_1")
        span.filter__arrow Lo último
      li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
        .filter__item-check
          input#filterSimple_2.filter__input-check(
            type="checkbox")
          label.filter__label-check.i-ok(
            for="filterSimple_2")
        span.filter__arrow Menor precio
      li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
        .filter__item-check
          input#filterSimple_3.filter__input-check(
            type="checkbox")
          label.filter__label-check.i-ok(
            for="filterSimple_3")
        span.filter__arrow Mayor precio
      li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
        .filter__item-check
          input#filterSimple_4.filter__input-check(
            type="checkbox")
          label.filter__label-check.i-ok(
            for="filterSimple_4")
        span.filter__arrow Destacados
      li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
        .filter__item-check
          input#filterSimple_5.filter__input-check(
            type="checkbox")
          label.filter__label-check.i-ok(
            for="filterSimple_5")
        span.filter__arrow Nuestros favoritos

</template>

<script>
import productAPI from '@/api/product'
import FilterPrecio from '@/components/FilterPrecio'

export default {
  name: 'FilterDesk',
  components: {
    FilterPrecio
  },
  data () {
    return {
      conditions: {},
      categories: {},
      colors: {},
      brands: {},
      sizes: {},
      isOpenFilter: ''
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
