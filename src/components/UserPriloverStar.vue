<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Prilover Star
    //- Flujo 2 desde btn => Ser Prilover Star
    .single__step
      .alert
        p.alert__txt.i-sad No tienes suficientes créditos para ser Prilover Star.
      .data
        dl.data-table
          dt.data-table__item Tus créditos
          dd.data-total__value 2100
        dl.data-table
          dt.data-table__item Ser Prilover Star
          dd.data-total__value 15000
            span.data-table__txt-sm anuales
        dl.data-table
          dt.data-table__item Te faltan
          dd.data-total__value -12900
            span.data-table__txt-sm créditos para ser Prilover Star
        .data-table
          a.btn(href='#') ¿Que es ser PriloverStar?
          a.btn.btn_solid(href='#') Comprar Créditos
        .data-table
          a.link_underline(href='#') No quiero ser una Prilover Star
      //- .single__box
      //-   ol.single__list-rank
      //-     li.single__item-rank Si tienes créditos, se te descontarán $15.000 automáticamente. Si no tienes créditos, puedes comprarlos.
      //-     li.single__item-rank Al ser Prilover Star:
      //-       ul.single__list
      //-         li.single__item Tu perfil en Prilov aparecerá de los primeros en la sección "Prilovers".
      //-         li.single__item Tu perfil tendrá un sello "Prilover STAR" y tus productos también.
      //-         li.single__item Siempre estaremos pendiente de ti y contestaremos tus mensajes en tiempo record.
      //-         li.single__item Tu productos serán promocionados en nuestros e-mail masivos y en redes sociales.
      //-         li.single__item Si tus fotos y productos no cumplen con el requisito mínimo de aprobación (Revisar Manual de cómo sacar buenas fotos) no podremos permitirte ser una Prilover STAR.
      //-   .single__row
      //-     a(href='#').btn.btn_solid Canjear créditos y ser una Prilover Star
      //-   .single__row
      //-     a(href='#').link_underline No quiero ser una Prilover Star
</template>

<script>
// import BannerSingle from '@/components/BannerSingle'

export default {
  name: 'UserPriloverStar',
  components: {
  // BannerSingle
  }
}
</script>
