<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tus Créditos
    .box.box_alert
      .box-flat__grid
        .box-flat__lead.i-tula
          .box-flat__lead-group
            h3.box-flat__title Créditos disponibles
            p.box__txt Estos son los créditos que estan disponibles para tranferir a tu cuenta bancaria o usar en compras.
        .box-flat__button
          p.box-flat__value(v-if="user.credits") $ {{ user.credits | currency }}
          p.box-flat__value(v-else) $ 0
          //- a.link_underline(href="#") Convertir en dinero
          //-To-do== modales del flujo, Ver wireframe https://wtsjxe.axshare.com/#g=1&p=d__cr_ditos
    h3.subhead Detalle de Créditos
    .dividers
      .dividers__item
        .dividers__grid
          p.dividers__txt Créditos ya solicitados para ser transferidos
          p.dividers__value 0
    .alert
      p.alert__info.i-alert-info  Recuerda que para transferir créditos a tu cuenta bancaria, debes tener más de $4.000 en créditos.
    h3.subhead Detalle de Transacciones
    //- Lista de transacciones
      ul.collapsible
        li.collapsible__item
          .collapsible__header.i-down
            .collapsible__child
              p.collapsible__title Compra: Polerón Pink Zara
              p.collapsible__label ········5678
            .collapsible__child
              .collapsible__subchild
                p.collapsible__value.txt_danger -$2.100
                time.collapsible__data(
                  datetime="2017-08-22") 22 de agosto, 2017
          ul.collapsible__body(
            v-show="false")
            li.collapsible__subitem.collapsible_big
              img.collapsible__img(
                src="static/img/demo/product-003.jpg")
            li.collapsible__subitem
              p.collapsible__subtitle Precio de venta
              p.collapsible__meta $18.700
            li.collapsible__subitem
              p.collapsible__subtitle Cobro Prilov
              p.collapsible__meta $1.700
            li.collapsible__subitem
              p.collapsible__subtitle Descuento
              p.collapsible__meta $0
            li.collapsible__subitem
              p.collapsible__subtitle Compradora
              p.collapsible__meta Carla Onetto
      //- To Do: ejemplo de elemento desplegado
          add class .collapsible__item_active
          change class  .i-down por .i-up
        li.collapsible__item.collapsible__item_active
          .collapsible__header.i-up
            .collapsible__child
              p.collapsible__title Venta
              p.collapsible__label Jeans Americanino
            .collapsible__child
              .collapsible__subchild
                p.collapsible__value $ 22.100
                time.collapsible__data(
                  datetime="2017-07-02") 2 de Julio, 2017
          ul.collapsible__body(
            v-show="true")
            li.collapsible__subitem.collapsible_big
              img.collapsible__img(
                src="static/img/demo/product-003.jpg")
            li.collapsible__subitem
              p.collapsible__subtitle Precio de venta
              p.collapsible__meta $18.700
            li.collapsible__subitem
              p.collapsible__subtitle Cobro Prilov
              p.collapsible__meta $1.700
            li.collapsible__subitem
              p.collapsible__subtitle Descuento
              p.collapsible__meta $0
            li.collapsible__subitem
              p.collapsible__subtitle Compradora
              p.collapsible__meta Carla Onetto
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserCreditos',
  computed: {
    ...mapState(['user'])
  }
}
</script>
