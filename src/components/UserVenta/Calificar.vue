<template lang="pug">
.dashboard__actions(v-show="!rating.status")
  p Califica esta compra
  //-Notificaciones
  span.help(
    v-show="errorLog.seller_rating") {{ errorLog.seller_rating }}
  .user-data__notify
    ul.user-data__list
      li.user-data__value.i-like(
        :class="{like__active: seller_rating === 1}",
        @click="seller_rating = 1")
      li.user-data__value.i-like.i_flip(
        :class="{like__active: seller_rating === -1}",
        @click="seller_rating = -1")
      li.user-data__value.i-less-circle(
        :class="{like__active: seller_rating === 0}",
        @click="seller_rating = 0")
  form.form.dashboard__form(@submit.prevent="setSellerRating")
    .form__row
      label.form__label(
      for='CommentSale') Deja un comentario sobre la vendedora
      span.help(
        v-show="errorLog.seller_comment") {{ errorLog.seller_comment }}
      input.form__textarea.form__textarea_height(
      id='CommentSale'
      v-model="seller_comment"
      maxlength='255')
    button.btn.i-send Comentar
</template>

<script src="./js/Calificar.js"></script>
