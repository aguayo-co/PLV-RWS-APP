<template lang="pug">
//- metodos de envío vendedora lista de productos
.list__item
  router-link.card__user(
    to="#",
    title="")
    .card__user-img
      .card__avatar
        img.card__picture(
          :src="sale.user_picture",
          alt="")
    .card__user-info
      .card__status Vendedora
      .card__prilover  {{ sale.user_full_name }}
  //-listado productos
  .list__grid
    .list__group
      article.list__card(
        v-for="product in sale.products" :key="product.id")
        //-link a producto
        .card__product
          //-img producto
          .card__figure
            img.card__img(
              :src="product.images[0]",
              alt="")

          //-info producto
          .card__info
            .card__header
              h3.card__title {{ product.title }}
              p.card__brand {{ product.brand }}
              p.card__size Talla: {{ product.size }}
            p.card__price $ {{ product.price | currency }}
            p.card__tag.tag {{ product.condition }}
            .card__actions
              a.i-trash.card__link(
                href="#"
                @click.prevent="removeProduct(product)") Eliminar Producto

    .boxcheck
      .boxcheck__sticky
        h4.boxcheck__headline Métodos de envío disponibles:
        p.boxcheck__subheadline Estos son los métodos de envío habilitados por la vendedora de estos productos.
        form.boxcheck__form
          //-item
          .boxcheck__item(
            v-for="shippingMethod in sale.user_shipping_methods" :key="shippingMethod.name")
            input.form__input-radio(
              :id="sale.id + shippingMethod.slug",
              type="radio",
              :value="shippingMethod.id",
              v-model="shipping_method_id")
            label.form__label.form__label_radio(
              :for="sale.id + shippingMethod.slug")
              span.boxcheck__label
                span {{ shippingMethod.name }} <small class="boxcheck__disclaimer">($3000)</small>
            //-nota
            .boxcheck__tip
              p {{ shippingMethod.description_buyer }}
          //-end item
      //-End Métodos de envío por vendedora
</template>

<script src="./js/CompraSale.js"></script>
