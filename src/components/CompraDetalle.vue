<template lang="pug">
.list__side
  .list__frame
    h3.title Detalle de tu compra
    .list__data
      .list__data-table
        //- List Detalle de tu compra
        dl.data-table
          dt.data-table__item Total de la compra
          dd.data-table__value ${{ total | currency }}
          dt.data-table__item Costo de envío
          dd.data-table__value {{ shipping_cost ? '$' : '-' }}{{ shipping_cost | currency }}
          //- Estado sin creditos
          dt.data-table__item Créditos
          dd.data-table__value(
            :class="{txt_brand: used_credits}"
          ) -{{ used_credits ? '$' : '' }}{{ used_credits | currency }}
          dt.data-table__item Código de descuento
          dd.data-table__value(
            :class="{txt_brand: coupon_discount}"
          ) -{{ coupon_discount ? '$' : '' }}{{ coupon_discount | currency }}
        dl.data-total
          dt.data-total__label Total de la orden:
          dd.data-total__value ${{ due | currency }}
        //- End List Detalle de tu compra

        //- Código de descuento
            Estado inicial
        form.form.data-form(
          @submit.prevent="updateCouponCode")
          .form__row.form__row_away
            label.form__label(
              for='codigo') ¿Tienes algún código de descuento?
            span.help(
              v-show="errorLog.coupon_code") {{ errorLog.coupon_code }}
            .form__combo(
              :class="{'form__combo_ok i-ok': couponValid}")
              input.form__control.combo__control(
                id='codigo'
                type='text'
                :disabled="disabled.coupon_code"
                :placeholder="coupon_code"
                v-model="new_coupon_code")
              button.btn.combo__btn(
                :disabled="disabled.coupon_code"
                v-show="!couponValid && new_coupon_code") Validar
              button.btn.combo__btn(
                :disabled="disabled.coupon_code"
                v-show="coupon_code && !new_coupon_code") Eliminar
        //- End código de descuento

        //- Botón continuar
        .form__row
          button.btn.btn_solid.btn_block(
            @click.prevent="nextStep") Continuar
          a(
            v-if="shoppingCartStep"
            @click.prevent="$emit('setShoppingCartStep', null)") Volver
          compraPayU(v-if="payUPayment", :payment-data="payUPayment")
        //- End botón continuar
</template>

<script src="./js/CompraDetalle.js"></script>
