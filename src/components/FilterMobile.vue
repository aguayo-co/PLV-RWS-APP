<template lang="pug">
  nav.filter(:class="{ 'filter__nav_open':filterActive || filterMultiActive }")
    a.filter__btn(href="#", @click.prevent='openFMultinivel') Ordenado por Destacados
    a.filter__btn(href="#", @click.prevent='openFilterMb') Filtrar
    //-Item Ordenar Articulos
    transition(name='slide-left')
      ul.filter__list(
      v-show="filterMultiActive")
        li.filter__select_header.i-close(
          @click='openFMultinivel') ORDENAR ARTÍCULOS
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
    //-Item filtrar
    transition(name='slide-right')
      ul.filter__list.filter__list_level(
      v-show="filterActive")
        li.filter__select_header.i-close(@click='openFilterMb') Filtro
        //Item Prenda
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click="openFilter")
          span.filter__arrow Categoría
            //-To-do: Consumir servicios
        //Item Talla
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click="openFilter")
          span.filter__arrow Talla
          transition(name='toggle-scale')
            .filter__select-inner.toggle-box(v-show='selected == true')
              ul.filter__list.toggle-box__list
                li.filter__item(
                  v-for="(size, subIndex) in sizes")
                  input.form__input-check(
                    :id="'filterItem' + subIndex",
                    type="checkbox")
                  label.form__label_check.i-ok(:for="'filterItem' + subIndex") {{ size.name }}
        //Item Marca
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click="openFilter")
          span.filter__arrow Marca
          transition(name='toggle-scale')
            .filter__select-inner.toggle-box(v-show='selected == true')
              ul.filter__list.toggle-box__list
                li.filter__item(
                  v-for="(brand, index) in brands")
                  input.form__input-check(
                    :id="'filterItem' + index",
                    type="checkbox")
                  label.form__label_check.i-ok(:for="'filterItem' + index") {{ brand.name }}
        //Item Color
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click="openFilter")
          span.filter__arrow Color
          transition(name='toggle-scale')
            .filter__select-inner.toggle-box(v-show='selected == true')
              ul.filter__list.toggle-box__list
                li.filter__item(
                  v-for="(color, index) in colors")
                  input.form__input-check(
                    :id="'filterItem' + index",
                    type="checkbox")
                  label.form__label_check.i-ok(:for="'filterItem' + index") {{ color.name }}
        //Item Concition
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click="openFilter")
          span.filter__arrow Condición
          transition(name='toggle-scale')
            .filter__select-inner.toggle-box(v-show='selected == true')
              ul.filter__list.toggle-box__list
                li.filter__item(
                  v-for="(condition, index) in conditions")
                  input.form__input-check(
                    :id="'filterItem' + index",
                    type="checkbox")
                  label.form__label_check.i-ok(:for="'filterItem' + index") {{ condition.name }}
        //Item Región
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click="openFilter")
          span.filter__arrow Región
            //-To-do: Consumir servicios
        //Item Precio
        FilterPrecio

</template>

<script>
import productAPI from '@/api/product'
import FilterPrecio from '@/components/FilterPrecio'

export default {
  name: 'FilterMobile',
  components: {
    FilterPrecio
  },
  data () {
    return {
      conditions: {},
      colors: {},
      brands: {},
      sizes: {},
      selected: false,
      filterActive: false,
      filterMultiActive: false,
      selectedFItem: false
    }
  },
  methods: {
    openFilter: function () {
      this.selected = !this.selected
    },
    openFilterMb: function () {
      this.filterActive = !this.filterActive
    },
    openFMultinivel: function () {
      this.filterMultiActive = !this.filterMultiActive
    },
    selectedFilter: function () {
      this.selectedFItem = !this.selectedFItem
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
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
