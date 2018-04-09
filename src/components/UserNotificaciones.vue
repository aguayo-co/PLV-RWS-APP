<template lang="pug">
section.single
  .single__inner
    //- form.form_flex
    //-   .form__row
    //-     input.form__control(
    //-       type="search",
    //-       name="search-noti")
    //-   ul.filter__box
    //-     li.filter__box-select
    //-       span.filter__arrow
    //-         .filter__box-label Todas <strong>Nuestros favoritos</strong>
    //-       ul.filter__list
    //-         li.filter__item Lo último
    //-         li.filter__item Menor precio
    //-         li.filter__item Mayor precio
    //-         li.filter__item Destacados
    //-         li.filter__item Nuestros favoritos

    header.single__header
      h1.single__title Notificaciones
    .collections
      h2.collections__header Sin leer <small class="badge">1</small>
      ul.collections__list
        li.collections__item.i-email
          .collection__lead
            .collection__head
              span.collection__title Carla  D.
              span.collection__label Te ha escrito
            |Hola, estoy viendo la chaqueta zara que publicaste pero no se si es la del verano pasado con estampado o una diferente, tienes fotos de la parte de atrás?. Sólo envías por chilexpress?
        li.collections__item.i-chat
          .collection__lead
            .collection__head
              span.collection__title Karina T.
              span.collection__label Ha comentado en <small class="collection__tag">'Enterito Foster Nuevo'</small>
            |Recomendable 100%. Excelente mi compra
      ul.collections__list.collections__list_off
        li.collections__item.i-email
          .collection__lead
            .collection__head
              span.collection__title Lula  D.
              span.collection__label Te ha escrito
            |Hola, estoy viendo la chaqueta zara que publicaste pero no se si es la del verano pasado con estampado o una diferente, tienes fotos de la parte de atrás?. Sólo envías por chilexpress?
        li.collections__item.i-chat
          .collection__lead
            .collection__head
              span.collection__title Paquita B.
              span.collection__label Te ha respondido
            |Sólo L1 y L5, siempre puedes escoger Chilexpress
        li.collections__item.i-chat
          .collection__lead
            .collection__head
              span.collection__title Carolina P.
              span.collection__label Respondió tu comentario en <small class="collection__tag">'Polera Gris S'</small>
            |Hola, estoy viendo la chaqueta zara que publicaste pero no se si es la del verano pasado con estampado o una diferente, tienes fotos de la parte de atrás?. Sólo envías por chilexpress?
    footer.collections__footer
      a.btn(
        href="#") Ver todos
  UserNotificacionesMensaje

</template>

<script>
import UserNotificacionesMensaje from '@/components/UserNotificacionesMensaje'

export default {
  name: 'UserNotificaciones',
  components: {
    UserNotificacionesMensaje
  }
}
</script>
