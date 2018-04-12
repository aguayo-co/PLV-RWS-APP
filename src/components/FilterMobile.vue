<template lang="pug">
  nav.filter(
    :class="{ 'filter__nav_open':filterActive || filterMultiActive }")
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
            input#filterSimple_1.filter__input-check(type="checkbox")
            label.filter__label-check.i-ok(for="filterSimple_1")
          span.filter__arrow Lo último
        li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
          .filter__item-check
            input#filterSimple_2.filter__input-check(type="checkbox")
            label.filter__label-check.i-ok(for="filterSimple_2")
          span.filter__arrow Menor precio
        li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
          .filter__item-check
            input#filterSimple_3.filter__input-check(type="checkbox")
            label.filter__label-check.i-ok(for="filterSimple_3")
          span.filter__arrow Mayor precio
        li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
          .filter__item-check
            input#filterSimple_4.filter__input-check(type="checkbox")
            label.filter__label-check.i-ok(for="filterSimple_4")
          span.filter__arrow Destacados
        li.filter__select(
        :class="{ 'filter__select_check' :selectedFItem == true}")
          .filter__item-check
            input#filterSimple_5.filter__input-check(type="checkbox")
            label.filter__label-check.i-ok(for="filterSimple_5")
          span.filter__arrow Nuestros favoritos
            //-To-do: Consumir servicios
    //-Item filtrar
    transition(name='slide-right')
      ul.filter__list.filter__list_level(
        v-show="filterActive",
        :class="{subitemOpen: selected}")
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
          @click.stop="openFilter")
          span.filter__arrow Talla
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show='selected == true')
              li.filter__select_header.i-close(@click.stop='openFilter') Talla
              li.filter__item.filter__select(
                v-for="(size, subIndex) in sizes")
                .filter__item-check
                  input#filterSimple_1.filter__input-check(type="checkbox")
                  label.filter__label-check.i-ok(for="filterSimple_1")
                span.filter__arrow {{ size.name }}
        //Item Marca
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click.stop="openFilter")
          span.filter__arrow Marca
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show='selected == true')
              li.filter__select_header.i-close(@click.stop='openFilter') Marca
              li.filter__item.filter__select(
                v-for="(brand, index) in brands")
                .filter__item-check
                  input#filterSimple_1.filter__input-check(type="checkbox")
                  label.filter__label-check.i-ok(for="filterSimple_1")
                span.filter__arrow {{ brand.name }}
        //Item Color
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click.stop="openFilter")
          span.filter__arrow Color
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show='selected == true')
              li.filter__select_header.i-close(@click.stop='openFilter') Color
              li.filter__item.filter__select(
                v-for="(color, index) in colors")
                .filter__item-check
                  input.filter__input-check(
                  :id="'filterColor' + index",
                  type="checkbox")
                  label.filter__label-check.i-ok(
                    :for="'filterColor' + index")
                .filter__check-group
                  span.color-circle(
                    :style='{ backgroundColor: color.hex_code }')
                  span.filter__arrow {{ color.name }}
        //Item Concition
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click.stop="openFilter")
          span.filter__arrow Condición
          //- transition(name='slide-right')
          //-   ul.filter__sublist.toggle-box__list(v-show='selected == true')
          //-     li.filter__select_header.i-close(@click.stop='openFilter') Condición
          //-     li.filter__item.filter__select(
          //-       v-for="(condition, index) in conditions")
          //-       .filter__item-check
          //-         input#filterSimple_1.filter__input-check(type="checkbox")
          //-         label.filter__label-check.i-ok(for="filterSimple_1")
          //-       span.filter__arrow {{ condition.name }}
        //Item Región
        li.filter__select.i-next(
          :class="{ 'filter__select_open' :selected == true}",
          @click.stop="openFilter")
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
