<template lang="pug">
.list__side
  .list__frame
    h3.title Detalle de tu orden
    .list__data
      .list__data-table
        //- List Detalle de tu orden
        dl.data-table
          dt.data-table__item Chaqueta
          dd.data-table__value $34.000
          dt.data-table__item Total de la orden
          dd.data-table__value ${{ total }}
          //estado sin creditos
          dt.data-table__item Código de descuento
          dd.data-table__value(
            :class="{txt_brand: coupon_discount}"
          ) {{ coupon_discount ? '-' : '' }}${{ coupon_discount }}
        dl.data-total
          dt.data-total__label Total de tu orden:
          dd.data-total__value ${{ due }}
        //- end List Detalle de tu orden

        //-código de descuento
            Estado inicial
        form.form.data-form(
          @submit.prevent="updateCouponCode")
          .form__row.form__row_away
            label.form__label(
              for='codigo') ¿Tienes algún código de descuento?
            span.help(
              v-show="errorLog.coupon_code") {{ errorLog.coupon_code }}
            .form__combo(
              :class="{'form__combo_ok i-ok': couponValid}"
            )
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
        //- end código de descuento

        //- btn continuar
        .form__row
          button.btn.btn_solid.btn_block Continuar
        //- end btn continuar

        //- Agregar productos
        .form__row_away
          span.i-plus.plus-item
            router-link.link_underline(
              to="#") Agregar más Productos
        //- End Agregar productos
</template>

<script src="./js/CompraDetalle.js"></script>
