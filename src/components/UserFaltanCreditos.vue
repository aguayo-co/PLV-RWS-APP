<template lang="pug">
.single__step
  .alert
    p.alert__txt.i-sad No tienes suficientes créditos para ser Prilover Star.
  .step-data
    .step-data__table
      dl.step-data__row
        dt.step-data__item Tus créditos
        dd.step-data__val 2100
        span.step-data__ico -
      dl.step-data__row
        dt.step-data__item.font-equal Ser Prilover Star
        dd.step-data__val 15000
          span.step-data__txt anuales
        span.step-data__ico =
      dl.step-data__row.c-brand
        dt.step-data__item Te faltan
        dd.step-data__val -12900
          span.step-data__txt créditos para ser Prilover Star
    .step-data__box
      a.btn.btn_space(href='#') ¿Que es ser PriloverStar?
      a.btn.btn_solid(href='#') Comprar Créditos
    .step-data__box
      a.link_underline(href='#') No quiero ser una Prilover Star
</template>

<script>

export default {
  name: 'UserFaltanCreditos'
}
</script>
