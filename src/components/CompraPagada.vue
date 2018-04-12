<template lang="pug">
//Paso 3: Comprobante
section.list-slot
  header.header_heart.i-heart-on(v-if="payment_status !== 1")
    h2.title_heart ¡Genial! tu compra ha sido realizada
    p.subtitle_heart Ya envíamos un comprobante de compra a tu correo.
  header.header_heart.i-heart-on(v-else)
    h2.title_heart ¡Genial! estamos confirmando tu pago
    p.subtitle_heart Apenas lo confirmemos, enviaremos un comprobante de compra a tu correo.

  //- To do: crear componente
  //1d Cliente Registrado, logueado, comprando a  diferentes vendedoras
  .list-slot__content
    //-Item
    article.list__card(
      v-for="product in products")
      //-link a producto
      router-link.card__product(
        to="#",
        title="")

        //-img producto
        .card__figure
          img.card__img(
            :src="product.images[0]",
            alt="")

        //-info producto
        .card__info
          .card__header
            h3.card__title {{ product.title }}
            p.card__brand Marca: {{ product.brand }}
            p.card__size Talla: {{ product.size }}
          p.card__price $ {{ product.price | currency }}
          p.card__tag.tag {{ product.condition }}

      //-info User
      .card__column
        //-link a usuario
        router-link.card__user(
          to="#",
          title="")
          .card__user-img
            .card__avatar
              img.card__picture(
                src="/static/img/demo/user-avatar-009.jpg",
                alt="")
          .card__user-info
            .card__status Vendedora
            .card__prilover  {{ product.user_full_name }}

        //-datos contacto usuaria
        .card__actions
          .card__data
            p.card__txt <strong class="card__label">Teléfono:</strong> {{ product.user_phone }}
            p.card__txt <strong class="card__label">Correo:</strong>  mail@gmail.com
            p.card__txt <strong class="card__label">Envío:</strong> {{ product.shipping_method_name }}
            p.card__txt <strong class="card__label">Fecha estimada:</strong> Abr 21 de 2018
    //-End Item

  //-End list content
  dl.dividers.dividers_list
    dt.subhead Dirección de envío
    dd.dividers__item {{ address | address }}
    dt.subhead Fecha estimada de entrega
    dd.dividers__item 5/11/2017

  .form__grid.form__grid_center.form__row_away
    .form__row
      a.btn.btn_solid(href="#", title="Ir a Vitinear") Vitinear
    .form__row
      a.btn(href="#", title="Ir a mis compras") Ir a mis compras
  a.form-brand(href='/', title='Ir a la página de inicio')
    span.brand
      img.brand__logo(src='/static/img/brand-prilov.png', alt='Prilov Compra. Usa. Vende')
      span.brand__typo
        strong.brand__name Prilov.com
        span.brand__tagline  Compra. Usa. Vende.
</template>

<script src="./js/CompraPagada.js"></script>
