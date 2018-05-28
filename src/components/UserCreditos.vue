<template lang="pug">
section.single
  .single__inner
    .alert
      p.alert__txt.i-alert Si tienes transacciones de creditos sin finalizar en el Prilov antiguo <a href="#" class="link_underline">gestiónalas aquí</a>
    header.single__header
      h1.single__title Tus Créditos
    .box.box_alert
      .box-flat__grid
        .box-flat__lead.i-tula
          .box-flat__lead-group
            h3.box-flat__title Créditos disponibles
            p.box__txt Estos son los créditos que estan disponibles para tranferir a tu cuenta bancaria o usar en compras.
        .box-flat__button
          p.box-flat__value(v-if="user.credits") {{ user.credits | currency }}
          p.box-flat__value(v-else) 0
          a.link_underline(
            v-if="user.credits",
            href="#",
            @click.prevent="convertMoney") Convertir en dinero
    .alert(v-if="alertConvert")
      p.alert__info.alert__info_spacing.i-alert-info Transferir a mi cuenta Tienes {{ user.credits | currency }} Créditos, ¿Deseas transferirlos?
      .form__grid_inline.form__row_away
        .form__row
          a.btn(
            href="#",
            title="Cancelar",
            @click.prevent="convertMoney") Cancelar
        .form__row
          button.btn.btn_solid(
            title="Transferir a mi cuenta",
            @click="confirmConvertMoney") Transferir a mi cuenta
    .alert(v-if="alertInfo")
      p.alert__info.alert__info_spacing.i-alert-info Verás tu dinero reflejado en tu cuenta bancaria entre 1 a 4 días hábiles.
    h3.subhead Detalle de Créditos
    .dividers
      .dividers__item
        .dividers__grid
          p.dividers__txt Créditos ya solicitados para ser transferidos
          p.dividers__value 0
    .alert(v-if="user.credits <= 4000")
      p.alert__info.i-alert-info  Recuerda que para transferir créditos a tu cuenta bancaria, debes tener más de $4.000 en créditos.
    h3.subhead Detalle de Transacciones
    //- Lista de transacciones
    ul.collapsible(v-for="transaction in transactions")
      li.collapsible__item
        .collapsible__header.i-down
          .collapsible__child
            p.collapsible__title(v-html="getTitle(transaction)")
            p.collapsible__label -
          .collapsible__child
            .collapsible__subchild
              p.collapsible__value.txt_danger ${{ transaction.amount|currency }}
              time.collapsible__data(
                :datetime="transaction.created_at") {{ transaction.created_at|date }}
</template>

<script src="./js/UserCreditos.js"></script>
