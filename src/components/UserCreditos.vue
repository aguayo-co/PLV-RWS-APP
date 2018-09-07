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
          p.box-flat__value(v-if="user.credits") {{ user.credits | currency }}
          p.box-flat__value(v-else) 0
          a.link_underline(
            v-if="user.credits >= 4000 && user.bank_account",
            @click.prevent="toggleConvertMoney") Convertir en dinero
    p.status.status_alert.i-alert-circle(v-if="!user.bank_account") <span class="status__txt">Para poder retirar tus créditos debes    <router-link class="link_underline" :to="{ name: 'user-datos-bancarios' }">agregar tus datos bancarios</router-link></span>
    .alert(v-if="alertConvert")
      p.alert__info.alert__info_spacing.i-alert-info Transferir a mi cuenta Tienes {{ user.credits | currency }} Créditos, ¿Deseas transferirlos?
      .form__grid_inline.form__row_away
        .form__row
          a.btn(
            href="#",
            title="Cancelar",
            @click.prevent="toggleConvertMoney") Cancelar
        .form__row
          button.btn.btn_solid(
            title="Transferir a mi cuenta",
            :disabled="saving"
            @click="confirmConvertMoney")
              Dots(v-if="saving")
              template(v-else) Transferir a mi cuenta
    .alert(v-if="alertInfo")
      p.alert__info.alert__info_spacing.i-alert-info Verás tu dinero reflejado en tu cuenta bancaria entre 1 a 5 días hábiles.
    h3.subhead Detalle de Créditos
    .dividers
      .dividers__item
        .dividers__grid
          p.dividers__txt Créditos ya solicitados para ser transferidos
          p.dividers__value ${{ pendingTransferTotal | currency }}
    .alert(v-if="user.credits < 4000")
      p.alert__info.i-alert-info  Recuerda que para transferir créditos a tu cuenta bancaria, debes tener $4.000 o más en créditos.
    h3.subhead Detalle de Transacciones
    //- Lista de transacciones
    ul.collapsible(v-for="transaction in transactions")
      li.collapsible__item
        //- arrow add class .i-down
        .collapsible__header
          .collapsible__child
            p.collapsible__title(v-html="getTitle(transaction)")
            p.collapsible__label(
              v-if="getLabel(transaction)"
              v-html="getLabel(transaction)")
          .collapsible__child
            .collapsible__subchild
              p.collapsible__value(
                :class="{txt_danger : transaction.amount < 0}") ${{ transaction.amount | currency }}
              time.collapsible__data(
                :datetime="transaction.created_at") {{ transaction.created_at | date }}
    Pager(
      v-model='transactions'
      :auth='true'
      :forcedParams='forcedParams'
      :basePath="basePath")
</template>

<script src="./js/UserCreditos.js"></script>
