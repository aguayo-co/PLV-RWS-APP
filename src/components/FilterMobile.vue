<template lang="pug">
  nav.filter(
    :class="{ 'filter__nav_open':openFilters || filterMultiActive }")
    a.filter__btn(href="#", @click.prevent='openFMultinivel') Ordenado por<br />{{ orderOptions.options[orderOptions.selected].name }}
    a.filter__btn(href="#", @click.prevent='switchFilterMb') Filtrar
    //-Item Ordenar Articulos
    transition(name='slide-left')
      ul.filter__list(
      v-show="filterMultiActive")
        li.filter__select_header.i-close(
          @click='openFMultinivel') Ordenar productos
        li.filter__select(
          @click="changeOrder(option.id)",
          v-for="option in orderOptions.options"
          :class="{ 'filter__select_check' : orderOptions.selected === option.id}")
          .filter__item-check
            input.filter__input-check(
              @click="changeOrder(option.id)",
              :id="'filterSimple_' + option.id",
              type="radio",
              name="filterOrder")
            label.filter__label-check.i-ok(:for="'filterSimple_' + option.id")
          span.filter__arrow {{ option.name }}
    //-Item filtrar
    transition(name='slide-right')
      ul.filter__list.filter__list_level(
        v-show="openFilters")
        li.filter__select_header.i-close
          button(@click='switchFilterMb') Cerrar
          span Filtrar
          button(@click="clearFilters") Borrar filtros
        //- Item Prenda
        li.filter__select.i-next(
          :class="{ 'filter__select_open' : selectedFilterOption === 'category' }",
          @click="switchFilter('category')")
          span.filter__arrow Categoría
          span.filter__details(v-if="new_filter.category && new_filter.category.length > 0") {{ filterSelectedCategories(new_filter.category) }}
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show="selectedFilterOption === 'category'")
              li.filter__select_header.i-close(@click.stop='switchFilter') Categoría
              li.filter__item.filter__select(
                v-if="categories",
                v-for="(category, subIndex) in categories")
                ul
                  li.filter__select.i-next(@click="selectedCategory = subIndex")
                    span.filter__arrow {{ category.name }}
                    transition(name='slide-right')
                      ul.filter__sublist.toggle-box__list(v-show="selectedCategory === subIndex")
                        li.filter__select_header.i-close(@click.stop='selectedCategory = undefined') {{ category.name }}
                        li.filter__item.filter__select(
                          v-if="category.children",
                          v-for="subcategory in category.children")
                          .filter__item-check
                            input.filter__input-check(
                              v-model="new_filter.category",
                              :value="subcategory.id",
                              :id="'category-' + subcategory.id"
                              type="checkbox")
                            label.filter__label-check.i-ok(:for="'category-' + subcategory.id")
                          span.filter__arrow {{ subcategory.name }}
        //- Item Talla
        li.filter__select.i-next(
          :class="{ 'filter__select_open' : selectedFilterOption === 'size' }",
          @click.stop="switchFilter('size')")
          span.filter__arrow Talla
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show="selectedFilterOption === 'size'")
              li.filter__select_header.i-close(@click.stop='switchFilter') Talla
              li.filter__item.filter__select(
                v-if="sizes",
                v-for="(size, subIndex) in sizes")
                ul
                  li.filter__select.i-next(@click="selectedSize = subIndex")
                    span.filter__arrow {{ size.name }}
                    transition(name='slide-right')
                      ul.filter__sublist.toggle-box__list(v-show="selectedSize === subIndex")
                        li.filter__select_header.i-close(@click.stop='selectedSize = undefined') {{ size.name }}
                        li.filter__item.filter__select(
                          v-if="size.children",
                          v-for="subsize in size.children")
                          .filter__item-check
                            input.filter__input-check(
                              v-model="new_filter.size",
                              :value="subsize.id",
                              :id="'size-' + subsize.id"
                              type="checkbox")
                            label.filter__label-check.i-ok(:for="'size-' + subsize.id")
                          span.filter__arrow {{ subsize.name }}
        //- Item Marca
        li.filter__select.i-next(
          :class="{ 'filter__select_open' : selectedFilterOption === 'brand' }",
          @click.stop="switchFilter('brand')")
          span.filter__arrow Marca
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show="selectedFilterOption === 'brand'")
              li.filter__select_header.i-close(@click.stop='switchFilter') Marca
              li.filter__item.filter__select(
                v-if="brands",
                v-for="(brand, index) in brands")
                .filter__item-check
                  input.filter__input-check(
                    type="checkbox",
                    v-model="new_filter.brand",
                    :value="brand.id",
                    :id="'brand-' + brand.id")
                  label.filter__label-check.i-ok(for="'brand-' + brand.id")
                span.filter__arrow {{ brand.name }}
        //- Item Color
        li.filter__select.i-next(
          :class="{ 'filter__select_open' : selectedFilterOption === 'color' }",
          @click.stop="switchFilter('color')")
          span.filter__arrow Color
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show="selectedFilterOption === 'color'")
              li.filter__select_header.i-close(@click.stop='switchFilter') Color
              li.filter__item.filter__select(
                v-if="colors",
                v-for="(color, index) in colors")
                .filter__item-check
                  input.filter__input-check(
                  v-model="new_filter.color",
                  :value="color.id"
                  :id="'color-' + color.id",
                  type="checkbox")
                  label.filter__label-check.i-ok(
                    :for="'color-' + color.id")
                .filter__check-group
                  span.color-circle(
                    :style='{ backgroundColor: color.hex_code }')
                  span.filter__arrow {{ color.name }}
        //- Item Condition
        li.filter__select.i-next(
          :class="{ 'filter__select_open' : selectedFilterOption === 'condition'}",
          @click.stop="switchFilter('condition')")
          span.filter__arrow Condición
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show="selectedFilterOption === 'condition'")
              li.filter__select_header.i-close(@click.stop='switchFilter') Condición
              li.filter__item.filter__select(
                v-if="conditions",
                v-for="(condition, index) in conditions")
                .filter__item-check
                  input.filter__input-check(
                    type="checkbox",
                    v-model="new_filter.condition",
                    :value="condition.id",
                    :id="'condition-' + condition.id")
                  label.filter__label-check.i-ok(:for="'condition-' + condition.id")
                span.filter__arrow {{ condition.name }}
        //- Item Región
        li.filter__select.i-next(
          :class="{ 'filter__select_open' : selectedFilterOption === 'region' }",
          @click.stop="switchFilter('region')")
          span.filter__arrow Región
          transition(name='slide-right')
            ul.filter__sublist.toggle-box__list(v-show="selectedFilterOption === 'region'")
              li.filter__select_header.i-close(@click.stop="switchFilter()") Región
              li.filter__item.filter__select(
                v-if="regions",
                v-for="(region, index) in regions")
                .filter__item-check
                  input.filter__input-check(
                    v-model="new_filter.region",
                    :value="region.admin1_code",
                    :id="'region-' + region.admin1_code",
                    type="checkbox")
                  label.filter__label-check.i-ok(:for="'region-' + region.admin1_code")
                span.filter__arrow {{ region.name }}
        //- Item Precio
        li
          FilterPrecio(
            :sliderPrecio="precio",
            @price-change="filterChange")
        li.filter__footer
          button.btn.btn_solid(
            @click="applyAndClose") Aplicar filtros
</template>

<script>
import { mapState } from 'vuex'
import FilterPrecio from '@/components/FilterPrecio'

const filterFields = {
  category: null,
  size: null,
  brand: null,
  color: null,
  condition: null,
  region: null,
  price: null,
  order: null
}
export default {
  name: 'FilterMobile',
  props: ['filter'],
  components: {
    FilterPrecio
  },
  computed: {
    ...mapState('ui', [
      'conditions',
      'categories',
      'colors',
      'brands',
      'sizes',
      'regions'
    ]),
    flatenedCategories () {
      let flat = []
      if (this.categories) {
        const categories = this.categories
        categories.forEach(element => {
          flat.push(element)
          if (element.children) {
            element.children.forEach(children => {
              flat.push(children)
            })
          }
        })
      }
      return flat
    },
    flatenedSizes () {
      let flat = []
      if (this.sizes) {
        const sizes = this.sizes
        sizes.forEach(element => {
          flat.push(element)
          if (element.children) {
            element.children.forEach(children => {
              flat.push(children)
            })
          }
        })
      }
      return flat
    }
  },
  data () {
    return {
      orderOptions: {
        selected: 0,
        options: [
          { id: 0, name: 'Lo último' },
          { id: 1, name: 'Menor precio' },
          { id: 2, name: 'Mayor precio' },
          { id: 3, name: 'Destacados' },
          { id: 4, name: 'Nuestros favoritos' }
        ]
      },
      precio: {
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
      },
      selectedFilterOption: null,
      selectedCategory: null,
      selectedSize: null,
      openFilters: false,
      filterMultiActive: false,
      selectedFItem: false,
      selectState: {...filterFields},
      new_filter: {}
    }
  },
  methods: {
    switchFilter: function (option) {
      this.selectedFilterOption = option || false
    },
    switchFilterMb: function () {
      if (this.openFilters) {
        this.openFilters = false
      } else {
        this.new_filter = {...this.filter}
        this.openFilters = true
      }
    },
    openFMultinivel: function () {
      this.filterMultiActive = !this.filterMultiActive
    },
    selectedFilter: function () {
      this.selectedFItem = !this.selectedFItem
    },
    filterChange: function () {
      if (this.precio.value[1] === 150000) {
        this.new_filter.price = this.precio.value[0] + ',500000'
      } else {
        this.new_filter.price = this.precio.value[0] + ',' + this.precio.value[1]
      }
    },
    filterSelectedCategories: function (values) {
      let filtered = []
      values.forEach(value => {
        filtered.push(this.flatenedCategories.filter(x => x.id === value)[0].name)
      })
      return filtered.join(',')
    },
    changeOrder: function (orderOptionId) {
      this.openFMultinivel()
      this.orderOptions.selected = orderOptionId
      switch (orderOptionId) {
        case 0:
          this.filter.order = '-created_at'
          break
        case 1:
          this.filter.order = 'price'
          break
        case 2:
          this.filter.order = '-price'
          break
        case 3:
          this.filter.order = '-commission'
          break
        default:
          this.filter.order = 'favorites'
      }
      this.$emit('filterChange')
    },
    applyAndClose: function () {
      this.$emit('filterChange', this.new_filter)
      this.switchFilterMb()
    },
    clearFilters: function () {
      this.$emit('clearFilters')
      this.new_filter = {
        category: [],
        size: [],
        brand: [],
        color: [],
        condition: [],
        region: [],
        price: null,
        order: this.new_filter.order
      }
    }
  }
}
</script>
