<template lang="pug">
nav.filter(@click="closeFilters")
  //-To-do: individualizar funcionalidad toogle
    para cada item deplegable
  ul.filter__group
    //Item Prenda
    li.filter__select(
      @click.stop="OpenFilter('category')",
      :class="{ 'filter__select_open' : dropdownState.category }")
      span.filter__arrow Categoría
        //-To-do: Consumir servicios
      transition(name='toggle-scale')
        ul.filter__list.filter__list_column.toggle-box(
          v-show="dropdownState.category")
          dl(v-for="category in categories")
            dt {{ category.name }}
            dd.filter__item(v-for="children in category.children")
              input.form__input-check(
                @change="filterChange"
                v-model="filter.category",
                :value="children.id",
                :id="'category-' + children.id",
                type="checkbox")
              label.filter__check.i-check(
                :for="'category-' + children.id") {{ children.name }}

    //Item Talla
    li.filter__select(
      @click.stop="OpenFilter('size')",
      :class="{ 'filter__select_open' : dropdownState.size }"
      v-if="!compact")
      span.filter__arrow Talla
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='dropdownState.size')
          dl(v-for="size in sizes")
            dt {{ size.name }}
            dd.filter__item(v-for="children in size.children")
              input.form__input-check(
                @change="filterChange"
                v-model="filter.size",
                :value="children.id"
                :id="'size-' + children.id",
                type="checkbox")
              label.filter__check.i-check(
                :for="'size-' + children.id") {{ children.name }}
    //Item Marca
    li.filter__select(
      @click.stop="OpenFilter('brand')",
      :class="{ 'filter__select_open' : dropdownState.brand }")
      span.filter__arrow Marca
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='dropdownState.brand')
          li.filter__item(
            v-for="brand in brands")
            input.form__input-check(
              @change="filterChange"
              v-model="filter.brand",
              :value="brand.id"
              :id="'brand-' + brand.id",
              type="checkbox")
            label.filter__check.i-check(
              :for="'brand-' + brand.id") {{ brand.name }}
    //Item Color
    li.filter__select(
      @click.stop="OpenFilter('color')",
      :class="{ 'filter__select_open' : dropdownState.color }")
      span.filter__arrow Color
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='dropdownState.color')
          li.filter__item(
            v-for="color in colors")
            input.form__input-check(
              @change="filterChange"
              v-model="filter.color",
              :value="color.id",
              :id="'color-' + color.id",
              type="checkbox")
            label.filter__check.i-check(
              :for="'color-' + color.id")
              span.color-circle(
                :style='{ backgroundColor: color.hex_code }')
              span {{ color.name }}
    //Item Concition
    li.filter__select(
      @click.stop="OpenFilter('condition')",
      :class="{ 'filter__select_open' : dropdownState.condition }")
      span.filter__arrow Condición
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='dropdownState.condition')
          li.filter__item(
            v-for="condition in conditions")
            input.form__input-check(
              @change="filterChange"
              v-model="filter.condition",
              :value="condition.id",
              :id="'condition-' + condition.id",
              type="checkbox")
            label.filter__check.i-check(
              :for="'condition-' + condition.id") {{ condition.name }}
    //Item Región
    li.filter__select(
      @click.stop="OpenFilter('region')",
      :class="{ 'filter__select_open' : dropdownState.region }")
      span.filter__arrow Región
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='dropdownState.region')
          li.filter__item(
            v-for="region in regions")
            input.form__input-check(
              @change="filterChange"
              v-model="filter.region",
              :value="region.admin1_code",
              :id="'region-' + region.admin1_code",
              type="checkbox")
            label.filter__check.i-check(
              :for="'region-' + region.admin1_code") {{ region.name }}
    //Item Precio
    FilterPrecio(
      :sliderPrecio="precio",
      @price-change="filterChange",
      @slide="closeFilters")
  //Filtro Orden
  .filter-end
    ul.filter__box
      li.filter__box-select(@click.stop="OpenFilter('order')")
        span.filter__arrow
          .filter__box-label Ordenado por <br /><strong>{{ orderOptions.options[orderOptions.selected].name }}</strong>
        transition(name='toggle-scale')
          ul.filter__list.toggle-box(v-show="dropdownState.order && active")
            li.filter__item(
              @click.stop.stop="changeOrder(option.id)"
              v-for="option in orderOptions.options") {{ option.name }}

</template>

<script>
import productAPI from '@/api/product'
import FilterPrecio from '@/components/FilterPrecio'
import userAddressesAPI from '@/api/userAddresses'

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
  name: 'FilterDesk',
  props: [
    'filter',
    'compact'
  ],
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
      regions: {},
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
    },
    filterChange: function () {
      if (this.precio.value[1] === 150000) {
        this.filter.price = this.precio.value[0] + ',500000'
      } else {
        this.filter.price = this.precio.value[0] + ',' + this.precio.value[1]
      }
      this.$emit('filterChange')
    },
    changeOrder: function (orderOptionId) {
      this.orderOptions.selected = orderOptionId
      switch (orderOptionId) {
        case 0:
          this.filter.order = 'created_at'
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
      this.dropdownState.order = false
      this.$emit('filterChange')
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
    productAPI.getCategoriesBySlug('shop')
      .then(response => {
        this.categories = response.data.children
        Object.keys(this.categories).forEach((key) => {
          productAPI.getCategoriesById(this.categories[key].id)
            .then(response => {
              this.categories[key].children = response.data.data[0].children
            })
        })
      })
    userAddressesAPI.getRegions().then((response) => {
      this.regions = response.data
    })
  }
}
</script>
