<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Notificaciones
    .collections
      h2.collections__header Sin leer
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
