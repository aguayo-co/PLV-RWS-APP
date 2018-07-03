<template lang="pug">
.dashboard__actions(v-if="can_rate")
  p ¿Qué tal tu compra?
  //-Notificaciones
  span.help(
    v-show="errorLog.seller_rating") {{ errorLog.seller_rating }}
  .user-data__notify
    ul.user-data__list
      li.review-ico.i-like.btn-tag(
        :class="{'review-ico_active': seller_rating === 1}",
        @click="seller_rating = 1; errorLog.seller_rating = null") Bien
      li.review-ico.i-like.i_flip.btn-tag(
        :class="{'review-ico_active': seller_rating === -1}",
        @click="seller_rating = -1; errorLog.seller_rating = null") Mal
      li.review-ico.i-less-circle.btn-tag(
        :class="{'review-ico_active': seller_rating === 0}",
        @click="seller_rating = 0; errorLog.seller_rating = null") Normal
  form.form.dashboard__form(@submit.prevent="setSellerRating")
    .form__row
      label.form__label(
      :for="'comment-sale-' + sale.id") Deja un comentario sobre la compradora
      span.help(
        v-show="errorLog.seller_comment") {{ errorLog.seller_comment }}
      input.form__textarea.form__textarea_height(
      :id="'comment-sale-' + sale.id"
      @input="errorLog.seller_comment = null"
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
