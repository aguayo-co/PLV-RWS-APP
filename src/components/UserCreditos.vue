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
          p.box-flat__value $ 100.100
          a.link_underline(href="#") Convertir en dinero
    h3.subhead Detalle de Créditos
    .dividers
      .dividers__item
        .dividers__grid
          p.dividers__txt Créditos ya solicitados para ser transferidos
          p.dividers__value -$2.100
      .dividers__item
        .dividers__grid
          p.dividers__txt Total créditos Obtenidos:
          p.dividers__value $ 393.184
      .dividers__item
        .dividers__grid
          p.dividers__txt Créditos usados en compras
          p.dividers__value $ 28.600
      .dividers__item
        .dividers__grid
          p.dividers__txt Créditos usados para Prilover Star:
          p.dividers__value $ 5.000
      .dividers__item
        .dividers__grid
          p.dividers__txt Créditos transferidos a tu cuenta:
          p.dividers__value $ 357.484
    .alert
      p.alert__info.i-alert-info  Recuerda que para transferir créditos debes tener más de $4.000
    h3.subhead Detalle de Transacciones

</template>

<script>
export default {
  name: 'UserCreditos'
}
</script>
