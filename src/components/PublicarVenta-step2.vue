<template lang="pug">
.step
  //-Formulario set 1
  .layout-inner
    fieldset.form-section
      legend.subhead.form-section__title Cuéntanos más sobre tu producto
        p.form-section__subtitle Una buena descripción hace que los compradores encuentren rápidamente tus productos.

      .form__row
        label.form__label(
          for="product-name") Nombre
        input.form__control(
          id="product-name",
          type='text')
      .form__row
        label.form__label(
          for="product-description") Descripción
        textarea.form__textarea(
          id="product-description",
          maxlength="340"
          form="form-publicar")

  //-Formulario set 2
  .layout-inner
    fieldset.form-section
      legend.subhead.form-section__title Más detalles de tu producto
      .form-section__grid
        .form-section__item
          .form__row
            label.form__label(
              for="product-categoria") Categoría
            select.form__select(
              id="product-categoria")
              optgroup(label="Categoría")
                option
                option item2
                option item3
                option item4
                option item5
                option item6
          .form__row
            label.form__label(
              for="product-estado") Estado del producto
            select.form__select(
              id="product-estado")
              optgroup(label="Estado del producto")
                option
                option item2
                option item3
                option item4
                option item5
                option item6
          .form__row
            label.form__label(
              for="product-color") Color
            select.form__select(
              id="product-color")
              optgroup(label="Color")
                option
                option item2
                option item3
                option item4
                option item5
                option item6
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
          .form__row
            label.form__label(
              for="product-marca") Marca
            select.form__select(
              id="product-marca")
              optgroup(label="Marca")
                option
                option item2
                option item3
                option item4
                option item5
                option item6
          .form__row
            label.form__label(
              for="product-medidas") Medidas
            input.form__control(
              id="product-medidas",
              type='text')
          .form__row
            label.form__label(
              for="product-precio") Precio venta
            span.form__price
              input.form__control(
                id="product-precio",
                type='text')
          .form__row
            label.form__label(
              for="product-precio2") Precio original
            span.form__price
              input.form__control(
                id="product-precio2",
                type='text')
        .form-section__item

          .form-section__slot
            h3.form-section__head Así se verá tu publicación
            article.slot(
              v-for='product in products')
              a.slot__product(
                :href='product.url',
                :title='product.title')
                img.slot__img(
                  :src="product.file",
                  :alt="product.title")

                //-title/dimensions
                .slot__lead
                  .slot__title {{ product.title }}
                  .slot__size
                    .slot__size-txt {{ product.dimensions }}

                //- brand/price
                .slot__info
                  .slot__brand {{ product.brand }}
                  .slot__price ${{ product.price }}

              //- user: picture/first_name/last_name
              a.slot__user(
                :href='product.user',
                :title='product.first_name')
                .slot__user-img
                  .slot__avatar
                    img.slot__picture(
                      :src="product.picture",
                      :alt="product.first_name")
                .slot__user-info
                  .slot__prilover {{ product.first_name }} {{ product.last_name }}
                  .slot__group.i-it-girl(
                    v-if='product.slot__group == 1') It <span class="txt_brand">girl</span>
                  .slot__group.i-starts(
                    v-if='product.slot__group == 2') Prilover <span class="txt_brand">Star</span>

  //-Formulario set 3
  .layout-band.form-section_band
    .layout-inner
      fieldset.form-section
        legend.subhead.form-section__title Exposición del producto
        .form__row
          input.form__input-radio(
            id="comision-20"
            type="radio",
            name="comision",
            checked)
          label.form__label.form__label_radio(
            for="comision-20")
            strong.form__headline Comisión 20%
            p.form__disclaimer Tu producto serán publicado en Prilov. No te aseguramos que será promovido.
        .form__row
          input.form__input-radio(
            id="comision-25"
            type="radio",
            name="comision")
          label.form__label.form__label_radio(
            for="comision-25")
            strong.form__headline Comisión 25%
            p.form__disclaimer Tu producto será publicado en Prilov. En las búsquedas aparecerá más arriba que los productos de comisión 20% y tendrá promoción a través de, al menos, unos de los medios que usamos como campañas, newsletters y/o redes sociales.
        .form__row
          input.form__input-radio(
            id="comision-30"
            type="radio",
            name="comision")
          label.form__label.form__label_radio(
            for="comision-30")
            strong.form__headline Comisión 30%
            p.form__disclaimer Tu producto será publicado en Prilov. En las búsquedas aparecerá lo más arriba. También en Top Picks y campañas. En redes sociales lo    publicaremos si es que el producto calza con nuestra línea editorial.

  //-Formulario set 4
  .layout-inner
    fieldset.form-section.form-section_dividers
      legend.subhead.form-section__title Tu ganancia quedará en

      .dividers
        dl.dividers__item.dividers_table
          dt.dividers__head Precio del producto - comisión de Prilov
          dt.dividers__term $40.000

    .form-section.form-section_footer
      .form__row
        input#check1.form__input-check(
          type="checkbox",
          name="checkbox",
          checked)
        label.form__label.form__label_check.i-ok(for="check1")
          | Estoy de acuerdo con la <a class="form__label-link" href="#">politica de privacidad</a> de Prilov
      .form__row.form__row_away
        button.btn.btn_solid(
          @click.prevent='') Continuar
</template>

<script>
export default {
  name: 'PublicarVentaStep2',
  data () {
    return {
      products: [
        {
          url: '/',
          title: 'Blusa Rayas',
          dimensions: 'm',
          brand: 'Nicopoly',
          price: '12.000',
          status_id: '',
          file: '/static/img/demo/product-001.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-009.jpg',
          first_name: 'Mariana',
          last_name: 'Gómez',
          slot__group: '2'
        }
      ]
    }
  }
}
</script>
