<template lang="pug">
.layout-form
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Publicar una venta
        h2.title_subhead ¿No lo usas?, ¡Vendelo!
      .upfile
        .upfile__main.i-plus
          h3.upfile__title Foto Principal
          .upfile__item
            a.upfile__delete.i-x(
              v-show='toggleImageDelete[0]',
              @click='removeImage(0)')
              span.hide Eliminar
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
              :prevent-white-space="true",
              @new-image-drawn='addImage(0)',
              @draw='handleMainImage')
        .upfile__group
          h3.upfile__title Fotos Secundarias (opcionales)
          .upfile__grid
            .upfile__item
              a.upfile__delete.i-x(
                v-show='toggleImageDelete[1]',
                @click='removeImage(1)')
                span.hide Eliminar
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqDesk") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model='images[1]',
                :width="300",
                :height="450",
                :quality="2",
                placeholder="",
                :prevent-white-space="true",
                @new-image-drawn='addImage(1)')
            .upfile__item
              a.upfile__delete.i-x(
                v-show='toggleImageDelete[2]',
                @click='removeImage(2)')
                span.hide Eliminar
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqTablet") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model='images[2]',
                :width="300",
                :height="450",
                :quality="2",
                placeholder="",
                :prevent-white-space="true",
                @new-image-drawn='addImage(2)')
            .upfile__item(
              v-if="mqDesk")
              a.upfile__delete.i-x(
                v-show='toggleImageDelete[3]',
                @click='removeImage(3)')
                span.hide Eliminar
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqTablet") Arrastra una foto o
                .upfile__btn Sube una imagen
              croppa(
                v-model='images[3]',
                :width="300",
                :height="450",
                :quality="2",
                placeholder="",
                :prevent-white-space="true",
                @new-image-drawn='addImage(3)')
  .step
    //-Formulario set 1
    .layout-inner
      fieldset.form-section
        legend.subhead.form-section__title Cuéntanos más sobre tu producto
          p.form-section__subtitle Una buena descripción hace que los compradoras encuentren rápidamente tus productos.

        .form__row(
          :class='{ "is-danger": errorLog.title }')
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
          :class='{ "is-danger": errorLog.description }')
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
              :class='{ "is-danger": errorLog.category }')
              label.form__label(
                for='product-categoria') Categoría principal
              span.help(
                v-if="errorLog.category"
              ) {{ errorLog.category }}
              select.form__select(
                ref='category'
                id='product-categoria'
                v-model='product.category_id'
                @change='loadSubCategories')
                optgroup(label='Categoría principal')
                  option(
                    v-for='category in categories'
                    :value='category.id'
                  ) {{ category.name }}
            .form__row(
              v-if='product.category_id'
              :class='{ "is-danger": errorLog.category }')
              label.form__label(
                for='product-subcategoria') Categoría específica
              span.help(
                v-if="errorLog.subcategory"
              ) {{ errorLog.subcategory }}
              select.form__select(
                ref='subcategory'
                id='product-subcategoria'
                v-model='product.subcategory_id')
                optgroup(label='Categoría específica')
                  option(
                    v-for='category in subcategories'
                    :value='category.id'
                  ) {{ category.name }}
            .form__row(
              :class='{ "is-danger": errorLog.condition }')
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
                    :value='condition.id'
                  ) {{ condition.name }}
            .form__group
              .form__row.color(
                :class='{ "is-danger": errorLog.color }'
                @click='toggleColors.first = !toggleColors.first')
                label.form__label(
                  for='product-color-first') Color principal
                span.help(
                  v-if="errorLog.color"
                ) {{ errorLog.color }}
                input.form__select(
                  ref='color'
                  type='text',
                  id='product-color-first',
                  v-model='product.color[0]',
                  disabled)
                .toggle-select(
                  v-show='toggleColors.first')
                  ul.toggle-select__list
                    li.toggle-select__item(
                      v-for='color in colors',
                      @click='chooseColor(color.id, 1)')
                      span.color-circle(
                        :style='{ backgroundColor: color.hex_code }')
                      span {{ color.name }}
              .form__row.color(
                @click='toggleColors.second = !toggleColors.second')
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
                      @click='chooseColor(color.id, 2)')
                      span.color-circle(
                        :style='{ backgroundColor: color.hex_code }')
                      span {{ color.name }}

            .form__row(
              :class='{ "is-danger": errorLog.calculatedSize }')
              label.form__label(
                for="productSize") Ingresa la talla de tu producto (ej: 38, S, 3XL)
              span.help(
                v-if="errorLog.calculatedSize"
              ) {{ errorLog.calculatedSize }}
              .form-asisted__box
                input.form-asisted__model(
                  ref='calculatedSize'
                  v-model="size",
                  id="productSize",
                  type="text",
                  maxlength="3"
                  @keydown='assistedSize',
                  :disabled='uniqueSize')
                .form-asisted__value(
                  :class='{ "active": !uniqueSize }')
                  span.form-asisted__item {{ displayedSize.charAt(0) }}
                  span.form-asisted__item {{ displayedSize.charAt(1) }}
                  span.form-asisted__item {{ displayedSize.charAt(2) }}
            .form__row.form__row_check
              input.form__input-check(
                v-model='uniqueSize'
                type="checkbox"
                id='sizeU',
                @change='uniqueSizeSelect'
                checked)
              label.form__label.form__label_check.i-ok(
                for='sizeU') ¿ó tu producto es talla única?
            .form__row(
              :class='{ "is-danger": errorLog.brand }')
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
                    :value='brand.id'
                  ) {{ brand.name }}
            .form__row(
              :class='{ "is-danger": errorLog.dimensions }')
              label.form__label(
                for='product-medidas') Medidas
              input.form__control(
                ref='dimensions'
                id='product-medidas',
                type='text',
                v-model='product.dimensions')
            .form__row(
              :class='{ "is-danger": errorLog.price }')
              label.form__label(
                for='product-precio') Precio de venta
              span.help(
                v-if="errorLog.price"
              ) {{ errorLog.price }}
              span.form__price
                input.form__control(
                  @keydown="filterPrice",
                  ref='price'
                  id='product-precio',
                  :value='product.price'
                  type='text')
            .form__row(
              :class='{ "is-danger": errorLog.original_price }')
              label.form__label(
                for='product-original-price') Precio al que compraste tu producto
              span.help(
                v-if="errorLog.original_price"
              ) {{ errorLog.original_price }}
              span.form__price
                input.form__control(
                  @keydown="filterOriginalPrice",
                  ref='original_price'
                  id='product-original-price',
                  :value='product.original_price',
                  type='text')
          .form-section__item
            .form-section__slot.sticky
              h3.form-section__head Así se verá tu publicación
              article.slot
                a.slot__product(
                  :href='product.url',
                  :title='product.title')
                  img.slot__img(
                    v-if='toggleImage'
                    :src='imageURL',
                    :alt='product.title')

                  //-title/dimensions
                  .slot__lead
                    .slot__title {{ product.title }}
                    .slot__size
                      .slot__size-txt {{ calculatedSize }}

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
            :class='{ "is-danger": errorLog.commission }')
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
        .form__row.form__check(
          :class='{ "is-danger": errorLog.checkTerms }')
          span.help(
            v-if="errorLog.checkTerms"
          ) {{ errorLog.checkTerms }}
          input.form__input-check(
            ref='checkTerms',
            v-model='checkTerms',
            type="checkbox",
            name="checkbox",
            id='checkTerms',
            checked)
          label.form__label.form__label_check.i-ok(
            for='checkTerms')
            | Estoy de acuerdo con la <a class="form__label-link" href="#">politica de privacidad</a> de Prilov
        .form__row.form__row_away
          button.btn.btn_solid(
            @click.prevent='validateBeforeSubmit') Continuar
</template>

<script>
import { mapState } from 'vuex'
import productAPI from '../api/product'
import categoriesAPI from '../api/category'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

export default {
  name: 'FormPublicarVenta',
  data () {
    return {
      displayedSize: '---',
      calculatedSize: '',
      size: null,
      sizes: [],
      uniqueSize: false,
      images: [],
      imagesToUpload: [],
      imageURL: null,
      toggleImage: false,
      toggleImages: {
        0: false,
        1: false,
        2: false,
        3: false
      },
      checkTerms: true,
      product: {
        title: null,
        description: null,
        dimensions: null,
        original_price: null,
        price: null,
        commission: 20,
        brand_id: null,
        category_id: null,
        subcategory_id: null,
        color_ids: [],
        condition_id: null,
        brand: null,
        file: [],
        color: [ null, null ],
        images: []
      },
      conditions: {},
      categories: {},
      subcategories: {},
      colors: {},
      brands: {},
      errorLog: {},
      toggleColors: {
        first: false,
        second: false
      }
    }
  },
  computed: {
    ...mapState(['user']),
    toggleImageDelete () {
      return this.toggleImages
    }
  },
  methods: {
    createProduct: function () {
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: '¡Yees! Ya estamos cargando tu producto'
        }
      }
      this.$store.dispatch('ui/showModal', modal)

      this.images.forEach((image, index, array) => {
        if (image.hasImage()) this.imagesToUpload.push(image)
      })

      this.imagesToUpload.forEach((image, index, array) => {
        if (image.hasImage()) {
          image.generateBlob((blob) => {
            this.product.images.push(blob)
            if (index === this.imagesToUpload.length - 1) {
              this.product.user_id = this.user.id
              productAPI.create(this.product)
                .then(response => {
                  console.log(response)
                  this.$store.dispatch('ui/closeModal')
                  let pending
                  response.data.status === 0 ? pending = true : pending = false
                  if (!pending) {
                    this.$router.push('/producto/' + response.data.slug + '__' + response.data.id)
                  } else {
                    this.$router.push('/venta-publicada/pendiente')
                  }
                })
            }
          })
        }
      })
    },
    validateBeforeSubmit: function (e) {
      this.errorLog = {}
      if (!this.product.title) this.errorLog.title = 'Debes ingresar un nombre para tu producto'
      if (!this.product.description) this.errorLog.description = 'Debes ingresar una descripción para tu producto'
      if (!this.product.category_id) this.errorLog.category = 'Debes seleccionar una categoría principal'
      if (!this.product.subcategory_id) this.errorLog.subcategory = 'Debes seleccionar una categoría específica'
      if (!this.product.condition_id) this.errorLog.condition = 'Debes seleccionar una condición para tu producto'
      if (!this.product.color_ids[0]) this.errorLog.color = 'Debes seleccionar al menos un color'
      if (!this.calculatedSize) {
        this.errorLog.calculatedSize = 'Debes seleccionar una talla para tu producto'
      } else {
        if (!this.validateSize()) this.errorLog.calculatedSize = 'No podemos reconocer la talla que ingresaste. Si tu producto no tiene talla selecciona la opción "Talla única"'
      }

      if (!this.product.brand_id) this.errorLog.brand = 'Debes seleccionar una marca para tu producto'
      if (!this.product.price) {
        this.errorLog.price = 'Debes ingresar el precio de tu producto'
      } else {
        if (this.product.price > this.product.original_price) this.errorLog.price = 'No puedes vender un producto más caro de lo que cuesta originalmente'
      }
      if (!this.product.original_price) this.errorLog.original_price = 'Debes indicarnos el precio original de tu producto'
      if (!this.product.commission) this.errorLog.commission = 'Debes escoger una opción de comisión'
      if (!this.checkTerms) this.errorLog.checkTerms = 'Debes aceptar nuestra política de privacidad para subir tu producto'

      if (Object.keys(this.errorLog).length === 0) {
        this.createProduct()
      } else {
        this.$refs[Object.keys(this.errorLog)[0]].focus()
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
    assistedSize: function (e) {
      e.preventDefault()
      if (e.keyCode === 8) {
        if (this.calculatedSize) {
          this.calculatedSize = this.calculatedSize.slice(0, -1).toUpperCase()
        }
      } else {
        if (e.key && e.key.length === 1) this.calculatedSize = this.calculatedSize + e.key.toUpperCase()
      }
      this.displayedSize = ''
      for (var i = 0; i < 3 - this.calculatedSize.length; i++) {
        this.displayedSize += '-'
      }
      this.displayedSize += this.calculatedSize
    },
    uniqueSizeSelect: function (e) {
      if (this.uniqueSize) {
        this.calculatedSize = 'U'
        this.displayedSize = '--U'
      } else {
        this.calculatedSize = ''
        this.displayedSize = '---'
      }
    },
    validateSize: function () {
      let size = this.sizes.filter(x => x.name === this.calculatedSize)[0]
      if (size.id) {
        this.product.size_id = size.id
        return true
      } else {
        this.product.size_id = null
        return false
      }
    },
    filterPrice: function (e) {
      e.preventDefault()
      if (!this.product.price) this.product.price = ''
      if (e.keyCode >= 48 && e.keyCode <= 57) this.product.price += e.key
      if (e.keyCode === 8) this.product.price = this.product.price.substring(0, this.product.price.length - 1)
    },
    filterOriginalPrice: function (e) {
      e.preventDefault()
      if (!this.product.original_price) this.product.original_price = ''
      if (e.keyCode >= 48 && e.keyCode <= 57) this.product.original_price += e.key
      if (e.keyCode === 8) this.product.original_price = this.product.original_price.substring(0, this.product.original_price.length - 1)
    },
    handleMainImage: function () {
      if (this.images[0].hasImage()) {
        this.toggleImage = true
        this.imageURL = this.images[0].generateDataUrl()
      }
    },
    addImage: function (index) {
      if (this.images[index].hasImage()) {
        if (index === 0) this.handleMainImage()
      }
      this.toggleImages[index] = true
    },
    removeImage: function (index) {
      this.toggleImages[index] = false
      this.images[index].remove()
      if (index === 0) this.toggleImage = false
    },
    loadSubCategories: async function () {
      await productAPI.getCategoriesById(this.product.category_id)
        .then(response => {
          this.subcategories = response.data.data[0].children
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  created: function () {
    categoriesAPI.getAllCategories()
      .then(response => {
        this.categories = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
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
        response.data.data.forEach((item) => this.sizes.push(...item.children))
      })
  }
}
</script>
