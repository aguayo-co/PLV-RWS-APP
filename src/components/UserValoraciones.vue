<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Valoraciones
    .valuations
      ul.user-data__list
        li.user-data__value.i-like 20
        li.user-data__value.i-like.i_flip 0
        li.user-data__value.i-less-circle 0
      .valuations__item
        p.valuations__date
          time.valuations__date-txt 23/09/2017
        p.valuations__label.i-bag Sweater Blanco Forever 21
        figure.valuations__avatar
          img.valuations__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
          figcaption.valuations__name Daniela Villanueva
        p.valuations__bubble Todo bien vendedora siempre atenta, responde rápido y muy atenta.
      .valuations__item
        p.valuations__date
          time.valuations__date-txt 23/09/2017
        p.valuations__label.i-bag Sweater Blanco Forever 21
        figure.valuations__avatar
          img.valuations__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
          figcaption.valuations__name Daniela Villanueva
        p.valuations__bubble Todo muy bien, rápido.
        //dos items
        p.valuations__label.i-bag Sweater Blanco Forever 21
        figure.valuations__avatar
          img.valuations__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
          figcaption.valuations__name Daniela Villanueva
        p.valuations__bubble Todo bien vendedora siempre atenta, responde rápido y muy atenta.
      .valuations__item
        p.valuations__date
          time.valuations__date-txt 23/09/2017
        p.valuations__label.i-bag Sweater Blanco Forever 21
        figure.valuations__avatar
          img.valuations__img(src="static/img/demo/user-avatar.jpg", alt="Avatar")
          figcaption.valuations__name Daniela Villanueva
        p.valuations__bubble Todo muy bien, rápido.

</template>

<script>

export default {
  name: 'UserValoraciones'
  // components: {
    
  // }
}
</script>
