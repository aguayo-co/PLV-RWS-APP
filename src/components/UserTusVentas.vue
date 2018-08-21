<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tus Ventas
    //-componente acciones filtro
    .filtrate__box
      nav.filtrate
        .filtrate__item
          router-link.link_circle.i-plus(
            :to="{ name: 'publicar-venta'}")
            span.link_underline Publicar un Producto
        .filtrate__item
          span.filtrate__btn(
            @click.stop="openList") {{ listOptions.options[listOptions.selected].name }}
          transition(name='toggle-scale')
            ul.filtrate__list(
              v-if="listActive")
              li.filtrate__list-item(
                v-for="(option, index) in listOptions.options"
                @click.stop.stop="changeOrder(index)") {{ option.name }}
    //-componente tabla
    .dashboard
      header.dashboard__head
        h2.dashboard__title Productos
        h3.dashboard__title(v-if="mqTablet") Estado del pedido
      Loader(v-if="loading")
      UserVenta(
        v-else
        v-for="sale in sales"
        :sale="sale"
        :key="sale.id"
        v-on:refresh-sale="setSale")
    Pager(
      v-model='sales'
      :auth='true'
      v-on:paging="loading = $event"
      :forcedParams='forcedParams'
      :basePath="basePath")
</template>

<script src="./js/UserTusVentas.js"></script>
