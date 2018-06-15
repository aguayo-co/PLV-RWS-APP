<template lang="pug">
section.single
  .single__inner
    .alert
        p.alert__txt.i-alert Si tienes compras sin finalizar en el Prilov antiguo <a href="#" class="link_underline">gestiónalas aquí</a>
    header.single__header
      h1.single__title Tus Compras
    .filtrate__box
      nav.filtrate.filtrate_end
        .filtrate__item
          span.filtrate__btn(
            @click.stop="openList") {{ listOptions.options[listOptions.selected].name }}
          transition(name='toggle-scale')
            ul.filtrate__list(
              v-if="listActive")
              li.filtrate__list-item(
                @click.stop.stop="changeOrder(option.id)"
                v-for="option in listOptions.options") {{ option.name }}
      //componente tabla
    .dashboard
      header.dashboard__head
        h2.dashboard__title Productos
        h3.dashboard__title(v-if="mqTablet") Estado del producto
      UserCompra(
        v-for="sale in sortedSales" :sale="sale" :key="sale.id" v-on:refresh-order="refreshOrder")
      Pager(v-model="pagination", :auth="true")

</template>

<script src="./js/UserTusCompras.js"></script>
