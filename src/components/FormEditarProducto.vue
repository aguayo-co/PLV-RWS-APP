<template lang="pug">
.layout-form
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Edita la información de tu producto
        h2.title_subhead Unas buenas fotos dicen más que mil palabras
      .upfile
        .upfile__main.i-plus
          h3.upfile__title Foto Principal
          .upfile__item
            span.upfile__actions
              span.btn_edit.i-edit-line(
                @click.prevent="toggle('editImg0')") <small class="hide"> Editar </small>
            img.upfile__img(
              v-if="editImg0 == false",
              :src="product.images[0]",
              :alt="'Foto de ' + product.title")
            .upfile__edit(v-else)
              a.upfile__delete.i-x(
                v-show='toggleImageControls[0]',
                @click='removeImage(0)')
                span.hide Eliminar
              .upfile__label
                .upfile__text.i-upload(
                  v-if="mqDesk") Arrastra una foto o
                button.upfile__btn(ref="image") Sube una imagen
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
                :zoom-speed="10",
                :disable-scroll-to-zoom="true",
                :disable-drag-to-move="!mqDesk",
                @draw='handleMainImage')
            .upfile__controls(v-show='toggleImageControls[0]')
              button.upfile__zoom-out(
                @click.prevent="zoom(0, 'out')") Alejar
              button.upfile__zoom-in(
                @click.prevent="zoom(0, 'in')") Acercar
        .upfile__group
          h3.upfile__title Fotos Secundarias (opcionales)
          .upfile__grid
            .upfile__item
              span.upfile__actions
                span.btn_edit.i-edit-line(
                  @click.prevent="toggle('editImg1')") <small class="hide"> Editar </small>
              img.upfile__img(
                v-if="editImg1 == false && product.images[1]"
                :src="product.images[1]",
                :alt="'Foto de ' + product.title")
              .upfile__edit(v-else)
                a.upfile__delete.i-x(
                  v-show='toggleImageControls[1]',
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
                  @new-image-drawn='addImage(1)',
                  :zoom-speed="10",
                  :disable-scroll-to-zoom="true",
                  :disable-drag-to-move="!mqDesk")
                .upfile__controls(v-show='toggleImageControls[1]')
                  button.upfile__zoom-out(
                    @click.prevent="zoom(1, 'out')") Alejar
                  button.upfile__zoom-in(
                    @click.prevent="zoom(1, 'in')") Acercar
            .upfile__item
              span.upfile__actions
                span.btn_edit.i-edit-line(
                  @click.prevent="toggle('editImg2')") <small class="hide"> Editar </small>
              img.upfile__img(
                v-if="editImg2 == false && product.images[2]"
                :src="product.images[2]",
                :alt="'Foto de ' + product.title")
              .upfile__edit(v-else)
                a.upfile__delete.i-x(
                  v-show='toggleImageControls[2]',
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
                  @new-image-drawn='addImage(2)',
                  :zoom-speed="10",
                  :disable-scroll-to-zoom="true",
                  :disable-drag-to-move="!mqDesk")
                .upfile__controls(v-show='toggleImageControls[2]')
                  button.upfile__zoom-out(
                    @click.prevent="zoom(2, 'out')") Alejar
                  button.upfile__zoom-in(
                    @click.prevent="zoom(2, 'in')") Acercar
            .upfile__item(
              v-if="mqDesk")
              span.upfile__actions
                span.btn_edit.i-edit-line(
                  @click.prevent="toggle('editImg3')") <small class="hide"> Editar </small>
              img.upfile__img(
                v-if="editImg3 == false && product.images[3]"
                :src="product.images[3]",
                :alt="'Foto de ' + product.title")
              .upfile__edit(v-else)
                a.upfile__delete.i-x(
                  v-show='toggleImageControls[3]',
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
                  @new-image-drawn='addImage(3)',
                  :zoom-speed="10",
                  :disable-scroll-to-zoom="true",
                  :disable-drag-to-move="!mqDesk")
                .upfile__controls(v-show='toggleImageControls[2]')
                  button.upfile__zoom-out(
                    @click.prevent="zoom(2, 'out')") Alejar
                  button.upfile__zoom-in(
                    @click.prevent="zoom(2, 'in')") Acercar
  .step
    //-Formulario set 1
    .layout-inner
      fieldset.form-section
        legend.subhead.form-section__title Detalles de tu producto
          p.form-section__subtitle Una buena descripción hace que los compradoras encuentren rápidamente tus productos.

        .form__row(
          :class='{ "is-danger": errorLog.title }')
          label.form__label(
            for='product-name') Nombre
          span.help(
            v-if="errorLog.title"
          ) {{ errorLog.title }}
          input.form__control(
            @keyup="errorLog.title = undefined",
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
            @keyup="errorLog.description = undefined",
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
                ref='category',
                id='product-categoria',
                v-model='product.category.parent_id',
                @change='errorLog.category = undefined')
                optgroup(label='Categoría principal')
                  option(
                    v-for='category in categories'
                    :value='category.id'
                  ) {{ category.name }}
            .form__row(
              v-if='product.category.parent.id'
              :class='{ "is-danger": errorLog.subcategory }')
              label.form__label(
                for='product-subcategoria') Categoría específica
              span.help(
                v-if="errorLog.subcategory"
              ) {{ errorLog.subcategory }}
              select.form__select(
                @change="errorLog.subcategory = undefined",
                ref='subcategory'
                id='product-subcategoria'
                v-model='product.category_id')
                optgroup(label='Categoría específica')
                  option(
                    v-for='category in categories.filter(x => x.id === product.category.parent_id)[0].children'
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
                @change="errorLog.condition = undefined",
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
                  @change="errorLog.color = undefined",
                  ref='color',
                  type='text',
                  id='product-color-first',
                  v-model='product.colors[0].name',
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
                v-if="product.colors[1]",
                @click='toggleColors.second = !toggleColors.second')
                label.form__label(
                  for='product-color-second') Color adicional
                input.form__select(
                  type='text',
                  id='product-color-second',
                  v-model='product.colors[1].name',
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
                    li.toggle-select__item(
                      @click="noneColor(2)")
                      span.color-circle(
                        :style='{ opacity: 0 }')
                      span Ninguno

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
                @change="errorLog.brand = undefined",
                ref='brand',
                id='product-marca'
                v-model='product.brand_id')
                optgroup(label='Marca')
                  option(
                    v-for='brand in brands'
                    :value='brand.id'
                  ) {{ brand.name.charAt(0).toUpperCase() + brand.name.slice(1) }}
            .form__row(
              :class='{ "is-danger": errorLog.dimensions }')
              label.form__label(
                for='product-medidas') Medidas
              input.form__control(
                @keyup="errorLog.dimensions = undefined",
                ref='dimensions',
                id='product-medidas',
                type='text',
                v-model='product.dimensions')
            .form__row(
              v-if="product.status < 30",
              :class='{ "is-danger": errorLog.price }')
              label.form__label(
                for='product-precio') Precio de venta
              span.help.help_price(
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
              v-if="product.status < 30",
              :class='{ "is-danger": errorLog.original_price }')
              label.form__label(
                for='product-original-price') Precio al que compraste tu producto
              span.help.help_price(
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
                    v-if='product.images[0]',
                    :src='product.images[0]',
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
                    ) {{ brands.filter(x => x.id === product.brand_id)[0].name }}
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
    //-Formulario set 4
    .layout-inner
      fieldset.form-section.form-section_dividers
        legend.subhead.form-section__title Tu ganancia será:

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
            | Estoy de acuerdo con la <router-link class="form__label-link" :to="{ name: 'terminos' }">Política de privacidad</router-link> de Prilov
        .form__row.form__row_away
          button.btn.btn_solid(
            @click.prevent='validateBeforeSubmit($event)') Guardar cambios
</template>

<script>
import { mapState } from 'vuex'
import productAPI from '../api/product'
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

const editedProduct = {
  id: null,
  user_id: null,
  title: null,
  description: null,
  category_id: null,
  condition_id: null,
  size_id: null,
  color_ids: null,
  brand_id: null,
  dimensions: null,
  price: null,
  original_price: null,
  status: null
}

export default {
  name: 'FormPublicarVenta',
  props: ['productToEdit'],
  data () {
    return {
      displayedSize: '---',
      calculatedSize: '',
      size: null,
      uniqueSize: false,
      images: [],
      imagesToUpload: [],
      imagesToDelete: [],
      imageURL: null,
      toggleImage: false,
      toggleImages: {
        0: false,
        1: false,
        2: false,
        3: false
      },
      checkTerms: true,
      errorLog: {},
      toggleColors: {
        first: false,
        second: false
      },
      editImg0: false,
      editImg1: false,
      editImg2: false,
      editImg3: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState('ui', [
      'menus',
      'categories',
      'conditions',
      'colors',
      'brands',
      'sizes'
    ]),
    toggleImageControls () {
      return this.toggleImages
    },
    isOwner () {
      return this.product.user_id === this.user.id
    },
    product () {
      return this.productToEdit
    }
  },
  beforeMount: function () {
    this.displayedSize = ''
    this.calculatedSize = this.product.size.name
    for (var i = 0; i < 3 - this.calculatedSize.length; i++) {
      this.displayedSize += '-'
    }
    this.displayedSize += this.calculatedSize
  },
  methods: {
    updateProduct: function (event) {
      const modal = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: '¡Yees! Ya estamos actualizando tu producto'
        }
      }
      this.$store.dispatch('ui/showModal', modal)

      let patchProduct = {
        new_images: []
      }
      Object.keys(editedProduct).forEach(key => {
        patchProduct[key] = this.product[key]
      })

      // For each croppa element checks if has image and appends it to the imagesToUpload array Ex: [ { id: 0, image: image }, { id: 3, image: image } ]
      this.images.forEach((image, index, array) => {
        if (image.hasImage()) this.imagesToUpload.push({ id: index, image: image })
      })

      if (this.imagesToUpload.length > 0) {
        patchProduct.new_images = []
        patchProduct.images_remove = []
        this.imagesToUpload.forEach((imageObject, index, array) => {
          if (imageObject.image.hasImage()) {
            imageObject.image.generateBlob((blob) => {
              patchProduct.new_images.push(blob)
              let imageName = this.product.images[imageObject.id].split('/')
              patchProduct.images_remove.push(imageName[imageName.length - 1])
              console.log(patchProduct.new_images)
              if (index === this.imagesToUpload.length - 1) {
                productAPI.update(patchProduct)
                  .then(response => {
                    event.target.disabled = false
                    this.$store.dispatch('ui/closeModal').then(response => {
                      const modal = {
                        name: 'ModalMessage',
                        parameters: {
                          type: 'positive',
                          title: '¡Listo! Ya actualizamos tu producto',
                          body: 'Pronto validaremos los cambios para que se vean publicados en tu producto.'
                        }
                      }
                      this.$store.dispatch('ui/showModal', modal)
                    })
                  })
              }
            })
          }
        })
      } else {
        console.log(patchProduct)
        productAPI.update(patchProduct)
          .then(response => {
            event.target.disabled = false
            this.$store.dispatch('ui/closeModal').then(response => {
              const modal = {
                name: 'ModalMessage',
                parameters: {
                  type: 'positive',
                  title: '¡Listo! Ya actualizamos tu producto',
                  body: 'Pronto validaremos los cambios para que se vean publicados en tu producto.'
                }
              }
              this.$store.dispatch('ui/showModal', modal)
            })
          })
      }
    },
    validateBeforeSubmit: function (event) {
      event.target.disabled = true
      this.errorLog = {}
      if (!this.product.title) this.errorLog.title = 'Debes ingresar un nombre para tu producto'
      if (!this.product.description) this.errorLog.description = 'Debes ingresar una descripción para tu producto'
      if (!this.product.category) this.errorLog.category = 'Debes seleccionar una categoría principal'
      if (!this.product.category_id) this.errorLog.subcategory = 'Debes seleccionar una categoría específica'
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
        if (parseInt(this.product.price) > parseInt(this.product.original_price)) this.errorLog.price = 'No puedes vender un producto más caro de lo que cuesta originalmente'
      }
      if (!this.product.original_price) this.errorLog.original_price = 'Debes indicarnos el precio original de tu producto'
      if (!this.product.commission) this.errorLog.commission = 'Debes escoger una opción de comisión'
      if (!this.checkTerms) this.errorLog.checkTerms = 'Debes aceptar nuestra política de privacidad para subir tu producto'

      if (Object.keys(this.errorLog).length === 0) {
        this.updateProduct(event)
      } else {
        this.$refs[Object.keys(this.errorLog)[0]].focus()
        event.target.disabled = false
      }
    },
    chooseColor: function (colorId, colorPosition) {
      this.errorLog.color = undefined
      if (this.product.colors[colorPosition - 1]) {
        this.product.colors[colorPosition - 1].name = this.colors.filter(x => x.id === colorId)[0].name
        this.product.color_ids[colorPosition - 1] = colorId
      } else {
        this.product.colors.push({ name: this.colors.filter(x => x.id === colorId)[0].name })
        this.product.color_ids.push(colorId)
      }
    },
    noneColor: function (colorPosition) {
      this.product.color[colorPosition - 1] = null
      this.product.color_ids.splice(colorPosition - 1)
    },
    chooseSize: function (sizeId) {
      this.sizeScheme = sizeId - 1
      this.toggleSize = true
    },
    assistedSize: function (e) {
      this.errorLog.calculatedSize = undefined
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
      let size = {}
      this.sizes.forEach((element) => {
        if (element.children.filter(x => x.name === this.calculatedSize)[0]) {
          size = element.children.filter(x => x.name === this.calculatedSize)[0]
        }
      })
      if (size.id) {
        this.product.size_id = size.id
        return true
      } else {
        this.product.size_id = null
        return false
      }
    },
    filterPrice: function (e) {
      this.errorLog.price = undefined
      if (e.keyCode === 9) {

      } else {
        e.preventDefault()
        if (!this.product.price) this.product.price = ''
        if (e.keyCode >= 48 && e.keyCode <= 57) this.product.price += e.key
        if (e.keyCode === 8) this.product.price = this.product.price.substring(0, this.product.price.length - 1)
      }
    },
    filterOriginalPrice: function (e) {
      this.errorLog.original_price = undefined
      e.preventDefault()
      if (!this.product.original_price) this.product.original_price = ''
      if (e.keyCode >= 48 && e.keyCode <= 57) this.product.original_price += e.key
      if (e.keyCode === 8) this.product.original_price = this.product.original_price.substring(0, this.product.original_price.length - 1)
    },
    zoom: function (id, direction) {
      let image = this.images[id]
      direction === 'in' ? image.zoomIn() : image.zoomOut()
    },
    handleZoom: function (action, image, direction) {
      if (action === 'set') {
        window.zoomEvent = window.setTimeout(this.zoom(image, direction), 200)
      } else {
        window.clearTimeout(window.zoomEvent)
      }
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
    toggle: function (prop) {
      this[prop] = !this[prop]
    }
  }
}
</script>
