<template lang="pug">
.layout-page
  section.section_product(v-if='loading')
    Loader
  section.section_product(v-else-if="!isOwner")
    .alert
      p.alert__txt.i-sad No puedes editar este producto porque pertenece al clóset de alguien más
  form(
    v-else-if="isOwner"
    @submit.prevent='validateBeforeSubmit')
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
                  span.btn_edit(
                    :class="{'i-edit-line': !editImg[0], 'i-x': editImg[0]}"
                    @click.prevent="toggleImg(0)")
                    span.hide Editar
                img.upfile__img(
                  v-if="!editImg[0]",
                  :src="sortedImages[0]",
                  :alt="'Foto de ' + product.title")
                .upfile__edit(v-else)
                  span.upfile__delete.i-x(
                    v-show='toggleImages[0]',
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
                    :disable-drag-to-move="!mqDesk")
              .upfile__controls(v-show='toggleImages[0]')
                button.upfile__zoom-out.i-search-less.btn-tag(
                  @click.prevent="zoom(0, 'out')") Alejar
                button.upfile__zoom-in.i-search-plus.btn-tag(
                  @click.prevent="zoom(0, 'in')") Acercar
            .upfile__group
              h3.upfile__title Fotos Secundarias (opcionales)
              .upfile__grid
                .upfile__item-wrap(v-for="i in [1, 2, 3]")
                  .upfile__item
                    span.upfile__actions
                      span.btn_edit(
                        :class="{'i-edit-line': !editImg[i], 'i-x': editImg[i]}"
                        @click.prevent="toggleImg(i)") <small class="hide"> Editar </small>
                    img.upfile__img(
                      v-if="editImg[i] == false && sortedImages[i]"
                      :src="sortedImages[i]",
                      :alt="'Foto de ' + product.title")
                    .upfile__edit(v-else)
                      a.upfile__delete.i-x(
                        v-show='toggleImages[i]',
                        @click='removeImage(i)')
                        span.hide Eliminar
                      .upfile__label
                        .upfile__text.i-upload(
                          v-if="mqDesk") Arrastra una foto o
                        .upfile__btn Sube una imagen
                      croppa(
                        v-model='images[i]',
                        :width="300",
                        :height="450",
                        :quality="2",
                        placeholder="",
                        :prevent-white-space="true",
                        @new-image-drawn='addImage(i)',
                        :zoom-speed="10",
                        :disable-scroll-to-zoom="true",
                        :disable-drag-to-move="!mqDesk")
                  .upfile__controls(v-show='toggleImages[i]')
                    button.upfile__zoom-out.i-search-less.btn-tag(
                      @click.prevent="zoom(i, 'out')") Alejar
                    button.upfile__zoom-in.i-search-less.btn-tag(
                      @click.prevent="zoom(i, 'in')") Acercar
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
                  :class='{ "is-danger": errorLog.size_id }')
                  label.form__label(
                    ref='size_id'
                    for="productSize") Ingresa la talla de tu producto (ej: 38, S, 3XL)
                  span.help(
                    v-if="errorLog.size_id"
                  ) {{ errorLog.size_id }}
                  MultiSelect(
                    id="productSize"
                    @open="errorLog.size_id = null",
                    v-model="size",
                    :options="sizes",
                    :multiple="false",
                    group-values="children",
                    group-label="name",
                    track-by="id"
                    label="name"
                    :group-select="false",
                    placeholder="Escribe para buscar",
                    selectLabel="Seleccionar",
                    deselectLabel="Eliminar"
                  )
                    span(slot="noResult").
                      Ups, no encontramos la talla.
                .form__row.form__row_check
                  input.form__input-check(
                    v-model='uniqueSize'
                    type="checkbox"
                    id='sizeU')
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
                  span Si la marca es desconocida, selecciona "otra".
                .form__row(
                  :class='{ "is-danger": errorLog.dimensions }')
                  label.form__label(
                    for='product-medidas') Medidas
                  span.help(
                      v-if="errorLog.dimensions") {{ errorLog.dimensions }}
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
                      ref='price'
                      id='product-precio',
                      v-model='product.price'
                      type='number'
                      min=0
                      step=1)
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
                      ref='original_price'
                      id='product-original-price',
                      v-model='product.original_price',
                      type='number'
                      min=0
                      step=1)
              .form-section__item
                .form-section__slot.sticky
                  h3.form-section__head Así se verá tu publicación
                  article.slot
                    a.slot__product(
                      :href='product.url',
                      :title='product.title')
                      img.slot__img(
                        v-if="images[0] && images[0].hasImage()"
                        :src="images[0].img.src"
                        :alt='product.title')
                      img.slot__img(
                        v-else-if='sortedImages[0]',
                        :src='sortedImages[0]',
                        :alt='product.title')

                      //-title/dimensions
                      .slot__lead
                        .slot__title {{ product.title }}
                        .slot__size
                          .slot__size-txt(v-html="size ? size.name : ''")

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
                        .slot__prilover {{ product | full_name }}
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
              button.btn.btn_solid(:disabled="saving") Guardar cambios
</template>

<script>
import productAPI from '@/api/product'
import { mapState } from 'vuex'
import MultiSelect from 'vue-multiselect'

import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.component('croppa', Croppa.component)

const editableProperties = [
  'id',
  'user_id',
  'title',
  'description',
  'category_id',
  'condition_id',
  'size_id',
  'color_ids',
  'brand_id',
  'dimensions',
  'price',
  'original_price',
  'status'
]

const initialData = () => {
  return {
    saving: null,
    images: (() => [])(),
    imagesToDelete: (() => [])(),
    toggleImages: (() => [
      false,
      false,
      false,
      false
    ])(),
    checkTerms: true,
    errorLog: (() => { return {} })(),
    toggleColors: (() => {
      return {
        first: false,
        second: false
      }
    })(),
    editImg: (() => [
      false,
      false,
      false,
      false
    ])(),
    loading: true
  }
}

export default {
  name: 'EditarProducto',
  components: {
    MultiSelect
  },
  data () {
    return {
      ...initialData(),
      product: {}
    }
  },
  computed: {
    size: {
      set (size) {
        this.product.size_id = size ? size.id : null
      },
      get () {
        return this.getSizeBy('id', this.product.size_id)
      }
    },
    uniqueSize: {
      set (value) {
        if (!value) {
          this.product.size_id = null
          return
        }
        this.size = this.getSizeBy('name', 'U')
      },
      get () {
        return this.size && this.size.name === 'U'
      }
    },
    isOwner () {
      return this.product.user_id === this.user.id
    },
    ...mapState(['user']),
    ...mapState('ui', [
      'menus',
      'categories',
      'conditions',
      'colors',
      'brands',
      'sizes'
    ]),
    // Images should come with names like #-@@@@@@@.ext
    // We try to return the images using the index (#) it has in the name.
    // This allows the user to set the images in the order that he/she wants.
    // If the user removes the second image, that field will remain empty.
    sortedImages () {
      const indexed = []
      const nonIndexed = []
      this.product.images.forEach(url => {
        const name = url.split('/').slice(-1)[0]
        // Match an index between 0 and 3
        // Anything else, consider out of index.
        const matches = name.match(/^([0-3])-/)
        if (matches &&
          !indexed[parseInt(matches[1])]) {
          indexed[matches[1]] = url
          return
        }
        nonIndexed.push(url)
      })

      let i = 0
      while (nonIndexed.length > 0) {
        if (!indexed[i]) {
          indexed[i] = nonIndexed.shift()
        }
        i++
      }
      return indexed
    }
  },
  created () {
    productAPI.getProductAuthById(this.$route.params.productId)
      .then(response => {
        this.product = response.data
      })
      .finally(e => {
        this.loading = false
      })
  },
  methods: {
    getSizeBy (key, search) {
      if (!key || !search) {
        return null
      }
      let foundSize = null
      this.sizes.some(group => {
        return group.children.some(size => {
          if (size[key] === search) {
            foundSize = size
            return true
          }
        })
      })
      return foundSize
    },
    async updateProduct () {
      const modalUpdating = {
        name: 'ModalMessage',
        parameters: {
          type: 'preload',
          title: '¡Yees! Ya estamos actualizando tu producto'
        }
      }
      this.$store.dispatch('ui/showModal', modalUpdating)

      let patchProduct = {}
      editableProperties.forEach(key => {
        patchProduct[key] = this.product[key]
      })

      patchProduct.images = {}
      patchProduct.images_remove = []
      // Para mantener el orden de las imágenes, recorremos el arreglo de imágenes nuevas
      // y las ponémos con el indice en el que le usuario la ubicó.
      for (let index = 0; index < this.images.length; index++) {
        if (this.images[index] && this.images[index].hasImage()) {
          const blob = await this.images[index].promisedBlob()
          patchProduct.images[index] = blob
          // Verificamos las imágenes ordenadas y si existía una en esa posición, la eliminamos.
          if (this.sortedImages[index]) {
            const imageName = this.sortedImages[index].split('/').slice(-1)[0]
            patchProduct.images_remove.push(imageName)
          }
        }
      }

      this.product.images.forEach((url, index) => {
        if (index > 3) {
          const imageName = url.split('/').slice(-1)[0]
          patchProduct.images_remove.push(imageName)
        }
      })

      const modalDone = {
        name: 'ModalMessage',
        parameters: {
          type: 'positive',
          title: '¡Listo! Ya actualizamos tu producto',
          body: 'Pronto validaremos los cambios para que se vean publicados en tu producto.'
        }
      }
      productAPI.update(patchProduct)
        .then(response => {
          this.saving = false
          this.product = response.data
          const data = initialData()
          Object.keys(data).forEach(key => {
            this[key] = data[key]
          })
          this.$store.dispatch('ui/closeModal').then(response => {
            this.$store.dispatch('ui/showModal', modalDone)
          })
        })
        .finally(e => {
          this.loading = false
        })
    },
    validateBeforeSubmit () {
      this.saving = true
      this.errorLog = {}
      if (!this.product.title) this.errorLog.title = 'Debes ingresar un nombre para tu producto'
      if (!this.product.dimensions) this.errorLog.dimensions = 'Debes ingresar una medida para tu producto'
      if (!this.product.description) this.errorLog.description = 'Debes ingresar una descripción para tu producto'
      if (!this.product.category) this.errorLog.category = 'Debes seleccionar una categoría principal'
      if (!this.product.category_id) this.errorLog.subcategory = 'Debes seleccionar una categoría específica'
      if (!this.product.condition_id) this.errorLog.condition = 'Debes seleccionar una condición para tu producto'
      if (!this.product.color_ids[0]) this.errorLog.color = 'Debes seleccionar al menos un color'
      if (!this.product.size_id) {
        this.errorLog.size_id = 'Debes seleccionar una talla para tu producto'
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
        this.updateProduct()
      } else {
        this.$refs[Object.keys(this.errorLog)[0]].focus()
        this.saving = false
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
    addImage: function (index) {
      this.toggleImages[index] = true
    },
    removeImage: function (index) {
      this.toggleImages[index] = false
      this.images[index].remove()
    },
    toggleImg: function (i) {
      this.$set(this.editImg, i, !this.editImg[i])
    }
  }
}
</script>
