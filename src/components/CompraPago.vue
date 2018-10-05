<template lang="pug">
//Paso 3: Comprobante
section.list-slot
  header.header_heart.i-heart-on(v-if="order.status === 30")
    h2.title_heart ¡Cool! tu compra ha sido realizada
    p.subtitle_heart Ya envíamos un comprobante de compra a tu correo.
  header.header_heart.i-heart-on(v-else)
    //- EL usuario está esperando aprobación de las administradoras de
    //- su pago por transferencia.
    h2.title_heart ¡Cool! estamos confirmando tu pago
    p.subtitle_heart Apenas lo confirmemos, enviaremos un comprobante de compra a tu correo.

  .list-slot__content
    //-Item
    article.list__card(
      v-for="product in products" :key="product.id")
      //-link a producto
      router-link.card__product(
        :to="{ name: 'product', params: { slug: $productSlug(product) }}",
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
          p.card__price $ {{ product.sale_price | currency }}
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
            .card__prilover  {{ product.user.full_name }}

        //-datos contacto usuaria
        .card__actions
          .card__data
            p.card__txt <strong class="card__label">Teléfono:</strong> {{ product.user.phone }}
            p.card__txt(v-if="product.user.email") <strong class="card__label">Correo:</strong>  {{ product.user.email }}
            p.card__txt <strong class="card__label">Envío:</strong> {{ product.shipping_method_name }}
            p.card__txt(v-if="product.delivery_date") <strong class="card__label">Fecha estimada:</strong> {{ product.delivery_date }}
    //-End Item

  //-End list content
  dl.dividers.dividers_list(v-if="address")
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

<script src="./js/CompraPago.js"></script>
