<template lang="pug">
div
  .layout-band
    .layout-inner
      header.page__head.steps__header
        h1.title__main Publicar una venta
        h2.title_subhead ¿No lo usas?, ¡Vendelo!
      .upfile
        .upfile__main.i-plus
          h4.upfile__title Foto Principal
          .upfile__item
            .upfile__label
              .upfile__text.i-upload(
                v-if="mqDesk") Arrastra una foto o
              .upfile__btn Sube una imagen
            span.help(
              v-if="errorLog.image"
            ) {{ errorLog.image }}
            croppa(
              v-model='images[0]',
              :width="300",
              :height="450",
              :quality="2",
              placeholder="",
              :prevent-white-space="true"
              @new-image-drawn='handleImages(0)')
        .upfile__group
          h4.upfile__title Fotos Secundarias (opcionales)
          .upfile__grid
            .upfile__item
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqDesk") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model='images[1]',
                :width="400",
                :height="600",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
            .upfile__item
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqTablet") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model='images[2]',
                :width="400",
                :height="600",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
            .upfile__item(
              v-if="mqDesk")
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqTablet") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model='images[3]',
                :width="400",
                :height="600",
                :quality="2",
                placeholder="",
                :prevent-white-space="true")
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
            .form__row.color(
              v-bind:class='{ "is-danger": errorLog.color }'
              v-on:click='toggleColors.first = !toggleColors.first')
              label.form__label(
                for='product-color-first') Color principal
              span.help(
                v-if="errorLog.color"
              ) {{ errorLog.color }}
              input.form__select(
                type='text',
                id='product-color-first',
                v-model='product.color[0]',
                disabled)
              .toggle-select(
                v-show='toggleColors.first')
                ul.toggle-select__list
                  li.toggle-select__item(
                    v-for='color in colors',
                    @click='chooseColor(color.id, 1)'
                  )
                    span.color-circle(
                      v-bind:style='{ backgroundColor: color.hex_code }'
                    )
                    span {{ color.name }}
            .form__row.color(
              v-on:click='toggleColors.second = !toggleColors.second')
              label.form__label(
                for='product-color-second') Color adicional
              input.form__select(
                type='text',
                id='product-color-second',
                v-model='product.color[1]',
                disabled)
              .toggle-select(
                v-show='toggleColors.second')
                ul.toggle-select__list
                  li.toggle-select__item(
                    v-for='color in colors',
                    @click='chooseColor(color.id, 2)'
                  )
                    span.color-circle(
                      v-bind:style='{ backgroundColor: color.hex_code }'
                    )
                    span {{ color.name }}
            .form__row
              label.form__label Selecciona un esquema de tallas
              .size(
                v-for='size in sizes')
                input.form__input-radio(
                  type='radio',
                  v-bind:id='"sizeScheme-"+size.id',
                  v-model='product.sizeScheme',
                  v-bind:value='size.id'
                  v-on:change='chooseSize(size.id)'
                  :checked='sizeScheme == size.id-1')
                label.form__label.form__label_radio(
                  v-bind:for='"sizeScheme-"+size.id')
                  strong.form__headline {{ size.name }}
                  p.form__disclaimer {{ size.description }}
              .form__row(
                v-show='toggleSize && sizeScheme != 2'
                v-bind:class='{ "is-danger": errorLog.size }')
                label.form__label(
                  for="product-talla") Selecciona la talla de tu producto
                span.help(
                  v-if="errorLog.size"
                ) {{ errorLog.size }}
                select.form__select(
                  ref='size'
                  id='product-talla'
                  v-model='product.size_id')
                  optgroup(label='Talla')
                    option(
                      v-for='sizeValue in sizes[sizeScheme].values'
                      v-bind:value='sizeValue'
                    ) {{ sizeValue }}
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
                v-model='product.brand_id')
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
                type='text',
                v-model='product.dimensions')
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
                    v-if='toggleImage'
                    :src='images[0].generateDataUrl()',
                    :alt='product.title')

                  //-title/dimensions
                  .slot__lead
                    .slot__title {{ product.title }}
                    .slot__size
                      .slot__size-txt {{ product.size_id }}

                  //- brand/price
                  .slot__info
                    .slot__brand(
                        v-if='product.brand_id'
                    ) {{ brands[product.brand_id - 1].name }}
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
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  name: 'FormPublicarVenta',
  data () {
    return {
      images: [],
      toggleImage: false,
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
        file: [],
        color: [ null, null ]
      },
      categories: {},
      conditions: {},
      colors: {},
      brands: {},
      errorLog: {},
      toggleColors: {
        first: false,
        second: false
      },
      toggleSize: false,
      sizeScheme: 0,
      sizes: [
        {
          id: 1,
          name: 'Letras',
          description: 'Talla en letras desde XS hasta XXXL',
          values: ['XS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
        },
        {
          id: 2,
          name: 'Números',
          description: 'Talla en números desde 1 hasta 60',
          values: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
            34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
        },
        {
          id: 3,
          name: 'Única',
          description: 'La talla es única o estándar',
          values: ['U']
        }
      ]
    }
  },
  methods: {
    createProduct: function () {
      const imageBlobs = []

      var data = {
        title: this.product.title,
        description: this.product.description,
        dimensions: this.product.dimensions,
        original_price: this.product.originalPrice,
        price: this.product.price,
        commission: this.product.commission,
        user_id: this.$store.getters['user/id'],
        brand_id: this.product.brand_id,
        category_id: this.product.category_id,
        size_id: 2,
        color_ids: this.product.color_ids,
        condition_id: this.product.condition_id,
        status_id: 1
      }

      const headers = {
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters['user/token'],
          'Content-Type': 'multipart/form-data'
        }
      }

      this.images.forEach(function (image) {
        if (image.hasImage()) {
          image.generateBlob(function (blob) {
            imageBlobs.push(new File([blob], 'imagen-zapato-prueba'))
            data.images = imageBlobs
            console.log(data)
            axios.post('https://prilov.aguayo.co/api/products', data, headers)
              .then(response => {
                console.log(response.data)
              })
              .catch(e => {
                console.log(e)
              })
          })
        }
      })
    },
    validateBeforeSubmit: function (e) {
      this.errorLog = {}
      if (!this.product.title) this.errorLog.title = 'Debes ingresar un nombre para tu producto'
      if (!this.product.description) this.errorLog.description = 'Debes ingresar una descripción para tu producto'
      if (!this.product.category_id) this.errorLog.category = 'Debes seleccionar una categoría'
      if (!this.product.condition_id) this.errorLog.condition = 'Debes seleccionar una condición para tu producto'
      if (!this.product.color_ids[0]) this.errorLog.color = 'Debes seleccionar al menos un color'
      if (!this.product.size_id) this.errorLog.size = 'Debes seleccionar una talla para tu producto'
      if (!this.product.brand_id) this.errorLog.brand = 'Debes seleccionar una marca para tu producto'
      if (!this.product.dimensions) this.errorLog.dimensions = 'Debes ingresar las medidas de tu producto'
      if (!this.product.price) {
        this.errorLog.price = 'Debes ingresar el precio de tu producto'
      } else {
        if (this.product.price > this.product.originalPrice) this.errorLog.price = 'No puedes vender un producto más caro de lo que cuesta originalmente'
      }
      if (!this.product.originalPrice) this.errorLog.originalPrice = 'Debes indicarnos el precio original de tu producto'
      if (!this.product.commission) this.errorLog.commission = 'Debes escoger una opción de comisión'
      if (!this.checkTerms) this.errorLog.checkTerms = 'Debes aceptar nuestra política de privacidad para subir tu producto'

      if (Object.keys(this.errorLog).length === 0) {
        console.log('valid')
        console.log(this.product)
        this.createProduct()
      } else {
        this.$refs.title.focus()
      }
    },
    chooseColor: function (colorId, colorPosition) {
      this.product.color[colorPosition - 1] = this.colors[colorId - 1].name
      this.product.color_ids[colorPosition - 1] = colorId
    },
    chooseSize: function (sizeId) {
      this.sizeScheme = sizeId - 1
      this.toggleSize = true
    },
    handleImages: function (index) {
      if (this.images[0].hasImage()) this.toggleImage = true
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
