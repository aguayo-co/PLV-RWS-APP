<template lang="pug">
.layout-inner
  article.detail
    .detail__gallery
      figure.detail__picture
        img.media-img(
          v-if="srcActive === ''"
          :src='product.images[0]',
          alt='')
        img.media-img(
          v-else='',
          :src='srcActive',
          alt='')
      //- Thumbs
      .detail__tabs(
        :class="{'detail__tabs_initial' :srcActive == ''}")
        .detail__thumb.i-heart-on(
          v-for='(image,index) in product.images',
          :key='index',
          :class="{'detail__thumb_active' :srcActive == image}",
          @click='SrcActive(image)')
          img.media-img.detail__img(
            :src='image',
            alt='')
    .detail__content
      header.detail__header
        h1.detail__title {{ product.title }}
      p.detail__tag.tag Producto {{ product.condition.name }}
      p.detail__brand {{ product.brand.name }}
      p.detail__size Talla: {{ product.dimensions }} | Colores: {{ product.colors[0].name }}
      .detail__value
        p.detail__through.through ${{ product.original_price }}
        p.detail__price.txt-light ${{ product.price }}
      .detail__actions
        a.detail__btn.btn.btn_solid(
          href="#") Comprar
        a.detail__btn.btn.i-heart(
          href="#") Agregar a Favoritos
      .detail__lead
        h2.detail__subtitle Descripción
        p.detail__txt {{ product.description }}
        h2.detail__subtitle Despacho
        p.detail__txt.detail__txt_ico.i-ok
          |Envíos a todo Chile <small class="detail__txt_small"> Mediante Chile-express o Correos de Chile</small>
        p.detail__txt.detail__txt_ico.i-ok Coordinar entrega con vendedora en Viña
</template>

<script>
export default {
  name: 'ProductoDetalle',
  props: ['product'],
  data () {
    return {
      srcActive: ''
    }
  },
  methods: {
    SrcActive: function (e) {
      this.srcActive = e
    }
  }
}
</script>
