<template lang="pug">
.dashboard__actions(v-if="can_rate")
  p ¿Qué tal tu compra?
  //-Notificaciones
  span.help(
    v-show="errorLog.buyer_rating") {{ errorLog.buyer_rating }}
  .user-data__notify
    ul.user-data__list
      li.review-ico.i-like.btn-tag(
        :class="{'review-ico_active': buyer_rating === 1}",
        @click="buyer_rating = 1; errorLog.buyer_rating = null") Bien
      li.review-ico.i-like.btn-tag.i_flip(
        :class="{'review-ico_active': buyer_rating === -1}",
        @click="buyer_rating = -1; errorLog.buyer_rating = null") Mal
      li.review-ico.btn-tag.i-less-circle(
        :class="{'review-ico_active': buyer_rating === 0}",
        @click="buyer_rating = 0; errorLog.buyer_rating = null") Normal
  form.form.dashboard__form(@submit.prevent="setBuyerRating")
    .form__row
      label.form__label(
      :for="'comment-sale-' + sale.id") Deja un comentario sobre la vendedora
      span.help(
        v-show="errorLog.buyer_comment") {{ errorLog.buyer_comment }}
      input.form__textarea.form__textarea_height(
      :id="'comment-sale-' + sale.id"
      @input="errorLog.buyer_comment = null"
      v-model="buyer_comment"
      maxlength='255')
    button.btn.i-send Comentar
.dashboard__actions(v-else)
  p.status.status_check.i-check Ya calificaste esta compra
  .user-data__notify
    ul.user-data__list
      li.user-data__value.i-like.like__active(
        v-if="buyer_rating === 1")
      li.user-data__value.i-like.i_flip.like__active(
        v-if="buyer_rating === -1")
      li.user-data__value.i-less-circle.like__active(
        v-if="buyer_rating === 0")
  p {{ buyer_comment }}

</template>

<script src="./js/Calificar.js"></script>
