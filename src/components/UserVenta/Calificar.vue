<template lang="pug">
.dashboard__actions(v-if="can_rate")
  p Califica esta compra
  //-Notificaciones
  span.help(
    v-show="errorLog.seller_rating") {{ errorLog.seller_rating }}
  .user-data__notify
    ul.user-data__list
      li.user-data__value.i-like(
        :class="{'user-data__value_active': seller_rating === 1}",
        @click="seller_rating = 1")
      li.user-data__value.i-like.i_flip(
        :class="{'user-data__value_active': seller_rating === -1}",
        @click="seller_rating = -1")
      li.user-data__value.i-less-circle(
        :class="{'user-data__value_active': seller_rating === 0}",
        @click="seller_rating = 0")
  form.form.dashboard__form(@submit.prevent="setSellerRating")
    .form__row
      label.form__label(
      for='CommentSale') Deja un comentario sobre la compradora
      span.help(
        v-show="errorLog.seller_comment") {{ errorLog.seller_comment }}
      input.form__textarea.form__textarea_height(
      id='CommentSale'
      v-model="seller_comment"
      maxlength='255')
    button.btn.i-send Comentar
.dashboard__actions(v-else)
  p.status.status_check.i-check Ya calificaste esta venta
  .user-data__notify
    ul.user-data__list
      li.user-data__value.i-like.like__active(
        v-if="seller_rating === 1")
      li.user-data__value.i-like.i_flip.like__active(
        v-if="seller_rating === -1")
      li.user-data__value.i-less-circle.like__active(
        v-if="seller_rating === 0")
  p {{ seller_comment }}
</template>

<script src="./js/Calificar.js"></script>
