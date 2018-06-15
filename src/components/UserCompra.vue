<template lang="pug">
.dashboard__item
  .dashboard__data
      p.dashboard__high Número de Orden: {{ sale.order_id }}-{{ sale.id }}
      p {{ paymentDate | date }}
  .dashboard__grid
    .dashboard__subitem
      article.list__card(
        v-for="product in sale.products" :key="product.id")
        .card__product

          //-img producto
          .card__figure
            img.card__img(
              :src="product.images[0]",
              :alt="'Foto de ' + product.title")

          //-info producto
          .card__info
            .card__header
              h3.card__title {{ product.title }}
              p.card__size Talla: {{ product.size.name }}
            p.card__price $ {{ product.price | currency }}
            .card__user-data
              p Vendedora: <router-link class="link_underline" :to="{ name: 'closet', params: { userId: sale.user_id }}">  {{ sale.user.first_name }} {{ sale.user.last_name }}</router-link>
              p(v-if="sellerPhone") Teléfono: {{ sellerPhone }}
              p
                strong Datos de la orden
              p(v-if="phone") Teléfono: {{ phone }}
              p(v-if="address") Dirección: {{ address | address }}
              p Método de envío: {{ sale.shipping_method.name }}

    Pendiente(:sale="sale" v-if="sale.status === 20" v-on:refresh-order="$emit('refresh-order', $event)")
    Pagada(:sale="sale" v-else-if="sale.status === 30" v-on:refresh-order="$emit('refresh-order', $event)")
    Enviada(:sale="sale" v-else-if="sale.status === 40 || sale.status === 41" v-on:refresh-order="$emit('refresh-order', $event)")
    Recibida(:sale="sale" v-else-if="sale.status === 49" v-on:refresh-order="$emit('refresh-order', $event)")
    Completada(:sale="sale" v-else-if="sale.status === 90" v-on:refresh-order="$emit('refresh-order', $event)")
    Devuelta(:sale="sale" v-else-if="sale.status === 91 || sale.status === 92" v-on:refresh-order="$emit('refresh-order', $event)")
    Cancelada(:sale="sale" v-else-if="sale.status === 99")
</template>

<script src="./js/UserCompra.js"></script>
