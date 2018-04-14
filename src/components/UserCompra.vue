<template lang="pug">
.dashboard__item
  .dashboard__data
      p.dashboard__high Número de Orden: {{ sale.order_id }}-{{ sale.id }}
      p {{ paymentDate | date }}
  .dashboard__grid
    .dashboard__subitem
      article.list__card(
        v-for="product in sale.products" :key="product.id")
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
              p.card__size Talla: {{ product.size.name }}
            p.card__price $ {{ product.price | currency }}
            .card__user-data
              p Vendedora: {{ sale.user.first_name }} {{ sale.user.last_name }}
              p Teléfono: {{ sale.user.phone }}
              p Dirección: Av. Pajaritos 1309, maipu

    Pendiente(:order="order" :sale="sale" v-if="sale.status === 20" v-on:refresh-order="$emit('refresh-order', $event)")
    Pagada(:order="order" :sale="sale" v-else-if="sale.status === 30" v-on:refresh-order="$emit('refresh-order', $event)")
    Enviada(:order="order" :sale="sale" v-else-if="sale.status === 40 || sale.status === 41" v-on:refresh-order="$emit('refresh-order', $event)")
    Recibida(:order="order" :sale="sale" v-else-if="sale.status === 49" v-on:refresh-order="$emit('refresh-order', $event)")
    Completada(:order="order" :sale="sale" v-else-if="sale.status === 90" v-on:refresh-order="$emit('refresh-order', $event)")
</template>

<script src="./js/UserCompra.js"></script>
