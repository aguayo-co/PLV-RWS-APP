<template lang="pug">
//Paso 3: Comprobante
section.list-slot
  header.header_heart.i-heart-on
    h2.title_heart Tu compra ha sido cancelada

  .list-slot__content
    //-Item
    article.list__card(
      v-for="product in products")
      //-link a producto
      router-link.card__product(
        :to="{ name: 'product', params: { slug: product.title + '__' + product.id }}",
        :title="'Ver detalle de ' + product.title")

        //-img producto
        .card__figure
          img.card__img(
            :src="product.images[0]",
            :alt="'Foto de ' + product.title")

        //-info producto
        .card__info
          .card__header
            h3.card__title {{ product.title }}
            p.card__brand Marca: {{ product.brand.name }}
            p.card__size Talla: {{ product.size.name }}
          p.card__price $ {{ product.price | currency }}
          p.card__tag {{ product.condition.name }}

      //-info User
      .card__column
        //-link a usuario
        router-link.card__user(
          :to="{ name: 'closet', params: { userId: product.user.id }}",
          :title="'Ir al Clóset de ' +  product.user.first_name")
          .card__user-img
            .card__avatar
              img.card__picture(
                :src="product.user.picture",
                :alt="product.user.first_name")
          .card__user-info
            .card__status Vendedora:
            .card__prilover  {{ product.user | full_name }}
    //-End Item

  //-End list content
  dl.dividers.dividers_list
    dt.subhead Dirección de envío
    dd.dividers__item {{ address | address }}

  .form__grid.form__grid_center.form__row_away
    .form__row
      router-link.btn.btn_solid(
        :to="{ name: 'home' }",
        title="Ir a Vitinear") Vitinear
    .form__row
      router-link.btn(
        :to="{name: 'user-tus-compras'}",
        title="Ir a mis compras") Ir a mis compras
  router-link.form-brand(
    :to="{ name: 'home' }",
    title='Ir a la página de inicio')
    span.brand
      img.brand__logo(src='/static/img/brand-prilov.svg', alt='Prilov Compra. Usa. Vende')
      span.brand__typo
        strong.brand__name Prilov.com
        span.brand__tagline  Compra. Usa. Vende.
</template>

<script src="./js/CompraCancelada.js"></script>
