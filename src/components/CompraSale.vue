<template lang="pug">
//- metodos de envío vendedora lista de productos
.list__item
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
      .card__prilover  {{ user_full_name(sale.id) }}
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
            p.card__price $ {{ product.price }}
            p.card__tag.tag {{ product.condition }}
            .card__actions
              a.i-trash.card__link(
                href="#") Eliminar Producto

    .boxcheck
      .boxcheck__sticky
        h4.boxcheck__headline Métodos de envío disponibles:
        p.boxcheck__subheadline Estos son los métodos de envío habilitados por la vendedora de estos productos.
        form.boxcheck__form
          //-item 1
          .boxcheck__item
            input.form__input-radio(
              id="estandar1",
              type="radio",
              name="envio",
              value="estandar1",
              checked="checked")
            label.form__label.form__label_radio(
              for="estandar1")
              span.boxcheck__label
                span Envío estándar (Chilexpress) <small class="boxcheck__disclaimer">($3000)</small>
            //-nota
            .boxcheck__tip
              p Al seleccionar esta opción de despacho, las entregas son según su disponibilidad y efectuadas de Lunes a Sábado.
              p Tiempo de entrega entre 1 y 5 días hábiles
          //-end item 1
          //-item 2
          .boxcheck__item
            input.form__input-radio(
              id="ultra1",
              type="radio",
              name="envio",
              value="ultra1",
              checked="checked")
            label.form__label.form__label_radio(
              for="ultra1")
              span.boxcheck__label
                span Envío ultra rápido (Chilexpress) <small class="boxcheck__disclaimer">($5000)</small>
          //-end item 2
          //-item 3
          .boxcheck__item
            input.form__input-radio(
              id="saleswoman1",
              type="radio",
              name="envio",
              value="saleswoman1",
              checked="checked")
            label.form__label.form__label_radio(
              for="saleswoman1")
              span.boxcheck__label
                span Acuerdo envío con vendedora <small class="boxcheck__disclaimer">($3000)</small>
          //-end item 3
      //-End Métodos de envío por vendedora
</template>

<script src="./js/CompraSale.js"></script>
