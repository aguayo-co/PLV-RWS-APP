<template lang="pug">
//- metodos de envío vendedora lista de productos
.boxcheck.boxcheck_card
  //-listado productos
  .boxcheck__list
    //-item
    .boxcheck__card(
      v-for="product in sale.products" :key="product.id")
      .boxcheck__figure
        img.media-img(
          :src="product.images[0]",
          alt="")

      //-info producto
      .boxcheck__info
        .boxcheck__lead
          p.boxcheck__title {{ product.title }}
          p.boxcheck__size
            span.boxcheck__size-txt {{ product.size }}
        p.boxcheck__price ${{ product.price }}
    //-end item
  //-end listado productos
  //-Métodos de envío por vendedora
  .boxcheck__actions
    .boxcheck__sticky
      .boxcheck__header
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
            .card__prilover  {{ user_full_name(sale.id) }}
        h4.boxcheck__headline Métodos de envío que ofrece esta vendedora
      form.boxcheck__grid.boxcheck__grid_tip
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
