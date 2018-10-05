<template lang="pug">
nav.filter(@click="closeFilters")
  ul.filter__group
    //Item Prenda
    li.filter__select(
      @click.stop="OpenFilter('category')",
      :class="{ 'filter__select_open' : dropdownState.category }")
      span.filter__arrow Categoría
      transition(name='toggle-scale')
        ul.filter__list.filter__list_column.toggle-box(
          v-show="dropdownState.category")
          dl.filter__column(
            v-for="category in categories")
            dt.filter__headline {{ category.name }}
            dd.filter__item(
              v-for="children in category.children")
              input.form__input-check(
                @change="filterChange"
                v-model="new_filter.category_id",
                :value="children.id",
                :id="'category-' + children.id",
                type="checkbox")
              label.filter__check.i-check(
                :for="'category-' + children.id") {{ children.name }}

    //Item Talla
    li.filter__select(
      @click.stop="OpenFilter('size')",
      :class="{ 'filter__select_open' : dropdownState.size }",
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
                v-model="new_filter.size_id",
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
              v-model="new_filter.brand_id",
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
              v-model="new_filter.color_ids",
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
      :class="{ 'filter__select_open' : dropdownState.condition }",
      v-if="!compact")
      span.filter__arrow Condición
      transition(name='toggle-scale')
        ul.filter__list.toggle-box(
          v-show='dropdownState.condition')
          li.filter__item(
            v-for="condition in conditions")
            input.form__input-check(
              @change="filterChange"
              v-model="new_filter.condition_id",
              :value="condition.id",
              :id="'condition-' + condition.id",
              type="checkbox")
            label.filter__check.i-check(
              :for="'condition-' + condition.id") {{ condition.name }}
    //Item Región
    //- li.filter__select(
    //-   @click.stop="OpenFilter('region')",
    //-   :class="{ 'filter__select_open' : dropdownState.region }",
    //-   v-if="!compact")
    //-   span.filter__arrow Región
    //-   transition(name='toggle-scale')
    //-     ul.filter__list.toggle-box(
    //-       v-show='dropdownState.region')
    //-       li.filter__item(
    //-         v-for="region in regions")
    //-         input.form__input-check(
    //-           @change="filterChange"
    //-           v-model="new_filter.region_id",
    //-           :value="region.admin1_code",
    //-           :id="'region-' + region.admin1_code",
    //-           type="checkbox")
    //-         label.filter__check.i-check(
    //-           :for="'region-' + region.admin1_code") {{ region.name }}
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
          .filter__box-label Ordenado por
            template(v-if="selectedOrderOption") <br /><strong>{{ selectedOrderOption.name }}</strong>
        transition(name='toggle-scale')
          ul.filter__list.toggle-box(v-show="dropdownState.order")
            li.filter__item(
              @click.stop.stop="changeAndCloseOrder(option)"
              v-for="option in orderOptions") {{ option.name }}
</template>

<script>
import FilterMixin from './js/FilterMixin'

export default {
  name: 'FilterDesk',
  mixins: [FilterMixin],
  props: [
    'compact'
  ],
  data () {
    return {
      dropdownState: { ...this.filterFields },
      active: false
    }
  },
  methods: {
    OpenFilter (filter) {
      const dropdownState = this.dropdownState[filter]
      this.dropdownState = { ...this.filterFields }
      this.dropdownState[filter] = !dropdownState
    },
    closeFilters () {
      this.dropdownState = { ...this.filterFields }
    },
    changeAndCloseOrder (order) {
      this.closeFilters('order')
      this.changeOrder(order)
    }
  }
}
</script>
