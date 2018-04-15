<template lang="pug">
.single__step
  .single__banner
    .single__banner__slot.right
      h3.single__banner__title.bg_white Puedes ser una PRILOVER STAR sólo por $15.000 anuales
    picture.single__banner__crop
      source.single__banner__img(media='(max-width: 640px)', srcset='/static/img/demo/banner-internal_closet-m1.jpg')
      img.single__banner__img(src='/static/img/demo/banner-internal_closet.jpg')
  .single__box
    ol.single__list-rank
      li.single__item-rank Si tienes créditos, se te descontarán $15.000 automáticamente. Si no tienes créditos, puedes comprarlos.
      li.single__item-rank Al ser Prilover Star:
        ul.single__list
          li.single__item Tu perfil en Prilov aparecerá de los primeros en la sección "Prilovers".
          li.single__item Tu perfil tendrá un sello "Prilover STAR" y tus productos también.
          li.single__item Siempre estaremos pendiente de ti y contestaremos tus mensajes en tiempo record.
          li.single__item Tu productos serán promocionados en nuestros e-mail masivos y en redes sociales.
          li.single__item Si tus fotos y productos no cumplen con el requisito mínimo de aprobación (Revisar Manual de cómo sacar buenas fotos) no podremos permitirte ser una Prilover STAR.
    .single__row
      a(href='#').btn.btn_solid Canjear créditos y ser una Prilover Star
    .single__row
      a(href='#').link_underline No quiero ser una Prilover Star
</template>

<script>

export default {
  name: 'UserInformacion'
}
</script>
