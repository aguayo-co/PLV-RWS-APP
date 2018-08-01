<template lang="pug">
section.single
  .single__inner
    .alert
        p.alert__txt.i-alert Si tienes compras sin finalizar en el Prilov antiguo <a href="http://old.prilov.com" class="link_underline">gestiónalas aquí</a>
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
                v-for="(option, index) in listOptions.options"
                @click.stop="changeOrder(index)") {{ option.name }}
      //componente tabla
    .dashboard
      header.dashboard__head
        h2.dashboard__title Productos
        h3.dashboard__title(v-if="mqTablet") Estado del producto
      Loader(v-if="loading")
      UserCompra(
        v-else
        v-for="sale in sales"
        :sale="sale"
        :key="sale.id"
        v-on:refresh-order="refreshOrder")
    Pager(
      v-model='sales'
      :auth='true'
      v-on:paging="loading = $event"
      :forcedParams='forcedParams'
      :basePath="basePath")
</template>

<script src="./js/UserTusCompras.js"></script>
