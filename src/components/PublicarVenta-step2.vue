<template lang="pug">
.step
  //-Formulario set 1
  .layout-inner
    fieldset.form-section
      legend.subhead.form-section__title Cuéntanos más sobre tu producto
        p.form-section__subtitle Una buena descripción hace que los compradores encuentren rápidamente tus productos.

      .form__row(
        v-bind:class='{ "is-danger": errorLog.title }')
        label.form__label(
          for='product-name') Nombre
        span.help(
          v-if="errorLog.title"
        ) {{ errorLog.title }}
        input.form__control(
          ref='title'
          id='product-name',
          v-model='product.title',
          type='text')
      .form__row(
        v-bind:class='{ "is-danger": errorLog.description }')
        label.form__label(
          for='product-description') Descripción
        span.help(
          v-if="errorLog.description"
        ) {{ errorLog.description }}
        textarea.form__textarea(
          ref='description'
          id='product-description',
          v-model='product.description'
          maxlength='340')

  //-Formulario set 2
  .layout-inner
    fieldset.form-section
      legend.subhead.form-section__title Más detalles de tu producto
      .form-section__grid
        .form-section__item
          .form__row(
            v-bind:class='{ "is-danger": errorLog.category }')
            label.form__label(
              for='product-categoria') Categoría
            span.help(
              v-if="errorLog.category"
            ) {{ errorLog.category }}
            select.form__select(
              ref='category'
              id='product-categoria'
              v-model='product.category_id')
              optgroup(label='Categoría')
                option(
                  v-for='category in categories'
                  v-bind:value='category.id'
                ) {{ category.name }}
          .form__row(
            v-bind:class='{ "is-danger": errorLog.condition }')
            label.form__label(
              for='product-estado') Estado del producto
            span.help(
              v-if="errorLog.condition"
            ) {{ errorLog.condition }}
            select.form__select(
              ref='condition'
              id='product-estado'
              v-model='product.condition_id')
              optgroup(label='Estado del producto')
                option(
                  v-for='condition in conditions'
                  v-bind:value='condition.id'
                ) {{ condition.name }}
          .form__row
            label.form__label(
              for='product-color-first') Color
            select.form__select(
              id='product-color-first'
              v-model='product.color_ids[1]')
              optgroup(label='Color principal')
                option(
                  v-for='color in colors'
                  v-bind:value='color.id'
                ) {{ color.name }}

          .form__row
            label.form__label(
              for="product-talla") Talla
            select.form__select(
              id="product-talla")
              optgroup(label="Talla")
                option
                option item2
                option item3
                option item4
                option item5
                option item6
          .form__row(
            v-bind:class='{ "is-danger": errorLog.brand }')
            label.form__label(
              for='product-marca') Marca
            span.help(
              v-if="errorLog.brand"
            ) {{ errorLog.brand }}
            select.form__select(
              ref='brand'
              id='product-marca'
              v-model='product.brand')
              optgroup(label='Marca')
                option(
                  v-for='brand in brands'
                  v-bind:value='brand.id'
                ) {{ brand.name }}
          .form__row(
            v-bind:class='{ "is-danger": errorLog.dimensions }')
            label.form__label(
              for='product-medidas') Medidas
            span.help(
              v-if="errorLog.dimensions"
            ) {{ errorLog.dimensions }}
            input.form__control(
              ref='dimensions'
              id='product-medidas',
              type='text')
          .form__row(
            v-bind:class='{ "is-danger": errorLog.price }')
            label.form__label(
              for='product-precio') Precio de venta
            span.help(
              v-if="errorLog.price"
            ) {{ errorLog.price }}
            span.form__price
              input.form__control(
                ref='price'
                id='product-precio',
                v-model='product.price'
                type='number')
          .form__row(
            v-bind:class='{ "is-danger": errorLog.originalPrice }')
            label.form__label(
              for='product-original-price') Precio al que compraste tu producto
            span.help(
              v-if="errorLog.originalPrice"
            ) {{ errorLog.originalPrice }}
            span.form__price
              input.form__control(
                ref='originalPrice'
                id='product-original-price',
                v-model='product.originalPrice',
                type='number')
        .form-section__item

          .form-section__slot
            h3.form-section__head Así se verá tu publicación
            article.slot
              a.slot__product(
                :href='product.url',
                :title='product.title')
                img.slot__img(
                  :src='product.file',
                  :alt='product.title')

                //-title/dimensions
                .slot__lead
                  .slot__title {{ product.title }}
                  .slot__size
                    .slot__size-txt {{ product.dimensions }}

                //- brand/price
                .slot__info
                  .slot__brand {{ product.brand }}
                  .slot__price ${{ product.price | currency }}

              //- user: picture/first_name/last_name
              a.slot__user(
                :href='product.user',
                :title='product.first_name')
                .slot__user-img
                  .slot__avatar
                    img.slot__picture(
                      :src='product.picture',
                      :alt='product.first_name')
                .slot__user-info
                  .slot__prilover {{ product.first_name }} {{ product.last_name }}
                  .slot__group.i-it-girl(
                    v-if='product.slot__group == 1') It <span class='txt_brand'>girl</span>
                  .slot__group.i-starts(
                    v-if='product.slot__group == 2') Prilover <span class='txt_brand'>Star</span>

  //-Formulario set 3
  .layout-band.form-section_band
    .layout-inner
      fieldset.form-section
        legend.subhead.form-section__title Exposición del producto
        .form__row(
          v-bind:class='{ "is-danger": errorLog.commission }')
          span.help(
            v-if="errorLog.commission"
          ) {{ errorLog.commission }}
          input.form__input-radio(
            id='comision-20'
            type='radio',
            name='comision',
            v-model='product.commission',
            value='20'
            checked)
          label.form__label.form__label_radio(
            for='comision-20')
            strong.form__headline Comisión 20%
            p.form__disclaimer Tu producto será publicado en Prilov. No te aseguramos que será promovido.
        .form__row
          input.form__input-radio(
            id='comision-25'
            type='radio',
            name='comision',
            v-model='product.commission',
            value='25'
            )
          label.form__label.form__label_radio(
            for='comision-25')
            strong.form__headline Comisión 25%
            p.form__disclaimer Tu producto será publicado en Prilov. En las búsquedas aparecerá más arriba que los productos de comisión 20% y tendrá promoción a través de, al menos, unos de los medios que usamos como campañas, newsletters y/o redes sociales.
        .form__row
          input.form__input-radio(
            id='comision-30'
            type='radio',
            name='comision',
            v-model='product.commission',
            value='30')
          label.form__label.form__label_radio(
            for='comision-30')
            strong.form__headline Comisión 30%
            p.form__disclaimer Tu producto será publicado en Prilov. En las búsquedas aparecerá lo más arriba. También en Top Picks y campañas. En redes sociales lo publicaremos si es que el producto calza con nuestra línea editorial.

  //-Formulario set 4
  .layout-inner
    fieldset.form-section.form-section_dividers
      legend.subhead.form-section__title Tu ganancia quedará en

      .dividers
        dl.dividers__item.dividers_table
          dt.dividers__head Precio del producto - comisión de Prilov
          dt.dividers__term $ {{ product.price - (product.price * product.commission / 100 ) | currency }}

    .form-section.form-section_footer
      .form__row(
        v-bind:class='{ "is-danger": errorLog.checkTerms }')
        span.help(
          v-if="errorLog.checkTerms"
        ) {{ errorLog.checkTerms }}
        input#check1.form__input-check(
          ref='checkTerms',
          v-model='checkTerms',
          type="checkbox",
          name="checkbox",
          checked)
        label.form__label.form__label_check.i-ok(for="check1")
          | Estoy de acuerdo con la <a class="form__label-link" href="#">politica de privacidad</a> de Prilov
      .form__row.form__row_away
        button.btn.btn_solid(
          @click.prevent='validateBeforeSubmit') Continuar
</template>

<script>
import axios from 'axios'

export default {
  name: 'PublicarVentaStep2',
  data () {
    return {
      checkTerms: true,
      product: {
        title: null,
        description: null,
        dimensions: null,
        originalPrice: null,
        price: null,
        commission: 20,
        brand_id: null,
        category_id: null,
        color_ids: [],
        condition_id: null,
        brand: null,
        file: []
      },
      categories: {},
      conditions: {},
      colors: {},
      brands: {},
      errorLog: {}
    }
  },
  methods: {
    validateBeforeSubmit: function (e) {
      this.errorLog = {}
      if (!this.product.title) this.errorLog.title = 'Debes ingresar un nombre para tu producto'
      if (!this.product.description) this.errorLog.description = 'Debes ingresar una descripción para tu producto'
      if (!this.product.category) this.errorLog.category = 'Debes seleccionar una categoría'
      if (!this.product.condition) this.errorLog.condition = 'Debes seleccionar una condición para tu producto'
      if (!this.product.brand) this.errorLog.brand = 'Debes seleccionar una marca para tu producto'
      if (!this.product.dimensions) this.errorLog.dimensions = 'Debes ingresar las medidas de tu producto'
      if (!this.product.price) {
        this.errorLog.price = 'Debes ingresar el precio de tu producto'
      } else {
        if (this.product.price > this.product.originalPrice) this.errorLog.price = 'No puedes vender un producto más caro de lo que cuesta originalmente'
      }
      if (!this.product.originalPrice) this.errorLog.originalPrice = 'Debes indicarnos el precio original de tu producto'
      if (!this.product.commission) this.errorLog.commission = 'Debes escoger una opción de comisión'
      if (!this.product.checkTerms) this.errorLog.checkTerms = 'Debes aceptar nuestra política de privacidad para subir tu producto'

      if (Object.keys(this.errorLog).length === 0) {
        console.log('valid')
      } else {
        this.$refs.title.focus()
      }
    }
  },
  created: function () {
    axios.get('https://prilov.aguayo.co/api/categories/shop')
      .then(response => {
        this.categories = response.data.children
      })
      .catch(e => {

      })
    axios.get('https://prilov.aguayo.co/api/conditions')
      .then(response => {
        this.conditions = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    axios.get('https://prilov.aguayo.co/api/colors')
      .then(response => {
        this.colors = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    axios.get('https://prilov.aguayo.co/api/brands')
      .then(response => {
        this.brands = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
