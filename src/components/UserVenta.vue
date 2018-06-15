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
              p Compradora: <router-link class="link_underline" :to="{ name: 'closet', params: { userId: sale.order.user_id }}"> {{ sale.order.user.first_name }} {{ sale.order.user.last_name }}</router-link>
              p(v-if="phone") Teléfono: {{ phone }}
              p(v-if="address") Dirección: {{ address | address }}
              p(v-if="sale.shipping_method") Método de envío: {{ sale.shipping_method.name }}

    Pendiente(:sale="sale" v-if="sale.status === 20" v-on:refresh-sale="$emit('refresh-sale', $event)")
    Pagada(:sale="sale" v-else-if="sale.status === 30" v-on:refresh-sale="$emit('refresh-sale', $event)")
    Enviada(:sale="sale" v-else-if="sale.status === 40 || sale.status === 41" v-on:refresh-sale="$emit('refresh-sale', $event)")
    Recibida(:sale="sale" v-else-if="sale.status === 49" v-on:refresh-sale="$emit('refresh-sale', $event)")
    Completada(:sale="sale" v-else-if="sale.status === 90" v-on:refresh-sale="$emit('refresh-sale', $event)")
    Devuelta(:sale="sale" v-else-if="sale.status === 91 || sale.status === 92" v-on:refresh-sale="$emit('refresh-sale', $event)")
    Cancelada(:sale="sale" v-else-if="sale.status === 99")
</template>

<script src="./js/UserVenta.js"></script>
