@@ -0,0 +1,559 @@
<template lang="pug">
.layout-page
  section.section_product(v-if='loading')
    Loader
  form.form.form_big(
    v-else-if='isOwner'
    id='form-publicar',
    action='#',
    @submit.prevent='validateBeforeSubmit'
    method='post')
    .layout-form
      .layout-band
        .layout-inner
          header.page__head
            h1.title__main {{titleMain}}
            h2.title_subhead {{titleSubhead}}
          .upfile
            .upfile__main.i-plus
              h3.upfile__title Foto Principal
              UploadPhoto(ref='img0', :errorLog='errorLog.image', v-model="images[0]", :initialImage='product.images[0]')
            .upfile__group
              h3.upfile__title Fotos Secundarias (opcionales)
              .upfile__grid
                UploadPhoto(v-model="images[1]", :initialImage='product.images[1]')
                UploadPhoto(v-model="images[2]", :initialImage='product.images[2]')
                UploadPhoto(v-model="images[3]", :initialImage='product.images[3]')
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
                    v-model='product.category',
                    @change='errorLog.category = undefined')
                    optgroup(label='Categoría principal')
                      option(
                        v-for='category in categories'
                        :value='category.id'
                      ) {{ category.name }}
                .form__row(
                  v-if='product.category'
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
                        v-for='category in categories.filter(x => x.id === product.category)[0].children'
                        :value='category.id'
                      ) {{ category.name }}
                .form__row(
                  :class='{ "is-danger": errorLog.condition }'
                  v-if='create')
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
                      v-model='product.color[0]',
                      disabled)
                    .toggle-select(
                      v-show='toggleColors.first')
                      ul.toggle-select__list
                        li.toggle-select__item(
                          v-for='(color, index) in colors',
                          @click='chooseColor(index, 0)')
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
                          v-for='(color, index) in colors',
                          @click='chooseColor(index, 1)')
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
                    MultiSelect(
                      ref='calculatedSize'
                      id="productSize"
                      @open="errorLog.calculatedSize = null",
                      v-model="size",
                      :value= "size"
                      :options="sizes",
                      :multiple="false",
                      group-values="children",
                      group-label="name",
                      track-by="id",
                      label="name",
                      :group-select="false",
                      placeholder="Escribe para buscar",
                      selectLabel="Seleccionar",
                      deselectLabel="Eliminar"
                    )
                      span(slot="noResult").
                        Ups, no encontramos la talla.
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
                  input.form__control(
                    @keyup="errorLog.dimensions = undefined",
                    ref='dimensions',
                    id='product-medidas',
                    type='text',
                    v-model='product.dimensions')
                .form__row(
                  :class='{ "is-danger": errorLog.price }')
                  label.form__label(
                    for='product-precio') Precio de venta
                  span.help.help_price(
                    v-if="errorLog.price"
                  ) {{ errorLog.price }}
                  span.form__price
                    input.form__control(
                      ref='price'
                      id='product-precio'
                      v-model='product.price'
                      type='number'
                      min=0,
                      step=1)
                .form__row(
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
                      min=0,
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
                        .slot__prilover {{ product.first_name }} {{ product.last_name }}
                        .slot__group.i-it-girl(
                          v-if='product.slot__group == 1') It <span class='txt_brand'>girl</span>
                        .slot__group.i-starts(
                          v-if='product.slot__group == 2') Prilover <span class='txt_brand'>Star</span>

        //-Formulario set 3
        .layout-band.form-section_band(v-if="create")
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
                | Estoy de acuerdo con la <router-link class="form__label-link" :to="{ name: 'terminos' }">Política de privacidad</router-link> de Prilov
            .form__row.form__row_away
              button.btn.btn_solid(:disabled="saving") Continuar
  section.section_product(v-else="!isOwner")
    .alert
      p.alert__txt.i-sad No puedes editar este producto porque pertenece al clóset de alguien más
</template>

<script>
import { mapState } from 'vuex'
import productAPI from '../api/product'
// import Vue from 'vue'
import MultiSelect from 'vue-multiselect'
import UploadPhoto from '../components/uploadPhoto'

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
export default {
  name: 'FieldsFormProduct',
  data () {
    return {
      loading: true,
      saving: null,
      displayedSize: '---',
      calculatedSize: '',
      size: null,
      uniqueSize: false,
      size_id: '',
      images: [],
      imagesToUpload: [],
      imageURL: null,
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
        images: [],
        firstImages: []
      },
      errorLog: {},
      toggleColors: {
        first: false,
        second: false
      }
    }
  },
  props: ['create', 'update', 'titleMain', 'titleSubhead'],
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
    isOwner () {
      if (this.create) {
        return true
      } else {
        return this.product.user_id === this.user.id
      }
    }
  },
  components: {
    UploadPhoto,
    MultiSelect
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      this.create && (this.loading = false)
      this.update && productAPI.getProductAuthById(this.$route.params.productId)
        .then(response => {
          const data = response.data
          this.product = {
            ...this.product,
            category: data.category.parent_id,
            fullCategoty: data.category,
            id: this.$route.params.productId,
            user_id: data.user_id,
            title: data.title,
            description: data.description,
            condition_id: data.condition_id,
            dimensions: data.dimensions,
            original_price: data.original_price,
            price: data.price,
            commission: data.commission,
            category_id: data.category_id,
            images: data.images,
            subcategory_id: data.subcategory_id,
            color_ids: data.color_ids,
            brand: data.brand,
            brand_id: data.brand_id,
            color: data.colors.map(x => x.name),
            size: data.size,
            size_id: data.size_id,
            status: data.status,
            firstImages: data.images
          }
          this.size = data.size
        })
        .finally(e => {
          this.loading = false
        })
    },
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
                  this.$store.dispatch('ui/closeModal')
                  let pending
                  response.data.status === 0 ? pending = true : pending = false
                  if (!pending) {
                    this.$router.push('/producto/' + response.data.slug + '__' + response.data.id)
                  } else {
                    this.$router.push('/venta-publicada/pendiente')
                  }
                  this.saving = true
                })
            }
          })
        }
      })
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
        const imageName = this.product.firstImages[index].split('/').slice(-1)[0]
        patchProduct.images_remove.push(imageName)
        if (this.images[index] && this.images[index].hasImage()) {
          const blob = await this.images[index].promisedBlob()
          patchProduct.images[index] = blob
          // Verificamos las imágenes ordenadas y si existía una en esa posición, la eliminamos.
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
          this.getProduct()
          this.$store.dispatch('ui/closeModal').then(response => {
            this.$store.dispatch('ui/showModal', modalDone)
          })
        })
        .finally(e => {
          this.loading = false
        })
    },
    validateBeforeSubmit: function () {
      this.saving = true
      this.errorLog = {}
      if (!this.images[0]) {
        this.errorLog.image = 'Carga una fotografía de tu producto'
      } else {
        if (!this.images[0].imageSet) this.errorLog.image = 'Carga una fotografía de tu producto'
      }
      if (!this.product.title) this.errorLog.title = 'Debes ingresar un nombre para tu producto'
      if (!this.product.description) this.errorLog.description = 'Debes ingresar una descripción para tu producto'
      if (!this.product.category) this.errorLog.category = 'Debes seleccionar una categoría principal'
      if (!this.product.category_id) this.errorLog.subcategory = 'Debes seleccionar una categoría específica'
      if (!this.product.condition_id) this.errorLog.condition = 'Debes seleccionar una condición para tu producto'
      if (this.product.color_ids.length === 0) this.errorLog.color = 'Debes seleccionar al menos un color'
      if (!this.size) {
        this.errorLog.calculatedSize = 'Debes seleccionar una talla para tu producto'
      } else {
        this.product.size_id = this.size.id
      }

      if (!this.product.brand_id) this.errorLog.brand = 'Debes seleccionar una marca para tu producto'
      if (!this.product.price) this.errorLog.price = 'Debes ingresar el precio de tu producto'
      if (this.product.price) {
        if (parseInt(this.product.price) > parseInt(this.product.original_price)) this.errorLog.price = 'No puedes vender un producto más caro de lo que cuesta originalmente'
      }
      if (!this.product.original_price) this.errorLog.original_price = 'Debes indicarnos el precio original de tu producto'
      if (!this.product.commission) this.errorLog.commission = 'Debes escoger una opción de comisión'
      if (!this.checkTerms) this.errorLog.checkTerms = 'Debes aceptar nuestra política de privacidad para subir tu producto'

      if (Object.keys(this.errorLog).length === 0) {
        this.create && this.createProduct()
        this.update && this.updateProduct()
      } else {
        if (Object.keys(this.errorLog)[0] === 'image') {
          this.$refs.img0.$refs.image.focus()
        } else {
          this.$refs[Object.keys(this.errorLog)[0]].focus()
          this.saving = false
        }
        this.saving = false
      }
    },
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
    },
    chooseColor: function (colorId, colorPosition) {
      this.errorLog.color = undefined
      this.product.color[colorPosition] = this.colors[colorId].name
      this.product.color_ids[colorPosition] = this.colors[colorId].id
    },
    noneColor: function (colorPosition) {
      this.product.color[colorPosition - 1] = null
      this.product.color_ids.splice(colorPosition - 1)
    }
  }
}
</script>
