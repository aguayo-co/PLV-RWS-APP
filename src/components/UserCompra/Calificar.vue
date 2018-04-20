<template lang="pug">
.dashboard__actions(v-show="!rating.status")
  p Califica esta compra
  //-Notificaciones
  span.help(
    v-show="errorLog.buyer_rating") {{ errorLog.buyer_rating }}
  .user-data__notify
    ul.user-data__list
      li.user-data__value.i-like(
        :class="{like__active: buyer_rating === 1}",
        @click="buyer_rating = 1")
      li.user-data__value.i-like.i_flip(
        :class="{like__active: buyer_rating === -1}",
        @click="buyer_rating = -1")
      li.user-data__value.i-less-circle(
        :class="{like__active: buyer_rating === 0}",
        @click="buyer_rating = 0")
  form.form.dashboard__form(@submit.prevent="setBuyerRating")
    .form__row
      label.form__label(
      for='CommentSale') Deja un comentario sobre la vendedora
      span.help(
        v-show="errorLog.buyer_comment") {{ errorLog.buyer_comment }}
      input.form__textarea.form__textarea_height(
      id='CommentSale'
      v-model="buyer_comment"
      maxlength='255')
    button.btn.i-send Comentar
</template>

<script src="./js/Calificar.js"></script>
