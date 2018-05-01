<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Prilover Star
    //- Step 4 => Flujo de llegada del Flujo 3
    //- Módulos de retorno
    .single__step
      UserVacaciones
      .box.box_alert
        .box-flat__grid
          .box-flat__lead.i-credits
            .box-flat__lead-group
              h3.box-flat__title Tus créditos
              p.box-flat__value 2100
          .box-flat__grid
            .box-flat__button
              a.btn.btn_solid(href='#') Convertir en dinero
            .box-flat__button
              a.link_underline(href='#') Ver historial

    //- Step 1
    //- Flujo 1 desde btn => Ser Prilover Star
    .single__step
      .alert
        p.alert__txt.i-sad No tienes suficientes créditos para ser Prilover Star.
      .step-data
        .step-data__table
          dl.step-data__row
            dt.step-data__item Tus créditos
            dd.step-data__val.data 2100
          span.symbol.symbol_less
          dl.step-data__row
            dt.step-data__item Ser Prilover Star
            dd.step-data__val 15000
              span.step-data__txt anuales
          span.symbol.symbol_equal
          dl.step-data__row.c-brand
            dt.step-data__item Te faltan
            dd.step-data__val -12900
              span.step-data__txt créditos para ser Prilover Star
        .step-data__box
          a.btn.btn_space(href='#') ¿Que es ser PriloverStar?
          a.btn.btn_solid(href='#') Comprar Créditos
        .step-data__box
          a.link_underline(href='#') No quiero ser una Prilover Star aún

    //- Step 1_b
    //- Flujo 1_b desde btn => Comprar Créditos
    .single__step
      h4.subhead Comprar Créditos
      .pay-off.pay-off_center
        .pay-off__item
          p.pay-off__value $ 12900
        span.pay-off__item
          span.symbol.symbol_equal
        .pay-off__item
          p.pay-off__label Créditos Prilov disponibles
          p.pay-off__value  12900 <small class="pay-off__small">Créditos</small>
      //-tipo de medio de pago
      h3.subhead ¿Con que medio te gustaría pagar?
      //-checkbox tipo pago
      .boxcheck-wrap
        .boxcheck
          form.boxcheck__grid
            //-item 2
            .boxcheck__card
              input.form__input-radio(
                id="PayU",
                type="radio",
                value="pay_u")
              label.form__label.form__label_radio(
                for="PayU")
                span.boxcheck__box
                  img(src="/static/img/logo-payu.png", alt="Pagar por medio de PayU")
            //-end item 2
            //-item 3
            .boxcheck__card
              input.form__input-radio(
                id="transferencia",
                type="radio",
                value="transfer")
              label.form__label.form__label_radio(
                for="transferencia")
                span.boxcheck__box
                  span Transferencia Bancaria
            .step-data__box
              button.btn.btn_solid Pagar
          .step-data__box
            a.link_underline(href='#') No quiero ser una Prilover Star aún
            //-end item 3

    //- Step 1_c NO => ¿Usuaria paga con pasarela online?
    //- Flujo 1_c
    .single__step
      .notify
        header.head_ico
          small.ico__title.i-clock 10:00
          h2.title Estás a un paso de ser Prilover Star.
          p.subtitle_heart Aún no has finalizado tu compra. Sube tu comprobante de transferencia bancaria.
        .content-slot__inner
          .notify__body
            form.form.form_file
              input.form__file(
                type="file",
                name="file-comprobante",
                id="file-comprobante",
                multiple="")
              label.form__label_file(for="file-comprobante")
                span.form__file-txt Selecciona archivo
                .form__file-input
                  span.form-file__txt no se elegió archivo
                  span.form-file__btn Subir
            p.notify__txt Recuerda que tienes un máximo de 10 minutos para realizar tu transferencia, de lo contrario tu compra se cancelará automáticamente
          .notify__footer
              button.btn.btn_solid Enviar comprobante
      .step-data__box
        a.link_underline(href='#') No quiero ser una Prilover Star aún

    //- Step 1_d Éxito Transferencia bancaria
    //- Flujo 1_d => Btn enviar comprobante
    .single__step
      .alert.status_check
        p.alert__txt.i-rocket Tu comprobante fue enviado y será confirmado, ya casi eres una Prilover Star

    //- Step 2  => Prilover Star usuaria con capacidad de créditos
    //- Flujo 2
    .single__step
      .alert.status_check
        p.alert__txt.i-start Estás a un paso de ser una Prilover Star
      .step-data
        .step-data__table
          dl.step-data__row
            dt.step-data__item Tus créditos
            dd.step-data__val 2100
          span.symbol.symbol_less
          dl.step-data__row
            dt.step-data__item Ser Prilover Star
            dd.step-data__val 15000
              span.step-data__txt anuales
          span.symbol.symbol_equal
          p.step-data__row.step-data_left
            span.step-data__txt.i-start Toda una Prilover Star con 1700 créditos
        .step-data__box
          a.btn.btn_space(href='#') ¿Que es ser PriloverStar?
          a.btn.btn_solid(href='#') Comprar Créditos
        .step-data__box
          a.link_underline(href='#') No quiero ser una Prilover Star aún

    //- Step 2_b SI => Transferencia bancaria exitosa
    //- Flujo 2_b ** CASO 1 **
    .single__step
      .alert.status_check
        p.alert__txt.i-start ¡Cool!
        p.alert__txt Ya eres toda una Prilover Star.
        p Ya envíamos un comprobante de compra a tu correo.

    //- Step 2_b SI => Transferencia bancaria exitosa
    //- Flujo 2_b ** CASO 2 **
    .single__step
      .alert.status_check
        p.alert__txt.i-start ¡Cool!
        p.alert__txt Ya eres toda una Prilover Star.
        p Comprobamos tu transferencia y ya envíamos un comprobante de pago a tu correo.

    //- Step 2_c NO => Transferencia bancaria ERROR
    //- Flujo 2_c ** CASO 1 **
    .single__step
      .alert
        p.alert__txt.i-alert-circle Ha ocurrido un problema, no pudimos validar la transferencia bancaria.
      .step-data__box
        a.btn.btn_solid(href='#') Reenviar comprobante
      .step-data__box
        a.link_underline(href='#') No quiero ser una Prilover Star aún

    //- Step 2_c NO => Transferencia bancaria ERROR
    //- Flujo 2_c ** CASO 2 **
    .single__step
      .alert
        p.alert__txt.i-alert-circle Ha ocurrido un problema, no pudimos validar el pago.
      .step-data__box
        a.btn.btn_solid(href='#') Volverlo a intentar
      .step-data__box
        a.link_underline(href='#') No quiero ser una Prilover Star aún

    //- Step 3 => Información sobre Prilover Star
    //- Flujo 3
    .single__step
      .single__banner
        .single__banner__slot.right
          h3.single__banner__title.bg_white Puedes ser una PRILOVER STAR sólo por $15.000 anuales
        picture.single__banner__crop
          source.single__banner__img(media='(max-width: 640px)', srcset='/static/img/demo/banner-internal_closet-m1.jpg')
          img.single__banner__img(src='/static/img/demo/banner-internal_closet.jpg')
      .single__box.single__box_bg
        ol.single__list-rank
          li.single__item-rank Si tienes créditos, se te descontarán $15.000 automáticamente. Si no tienes créditos, puedes comprarlos.
          li.single__item-rank Al ser Prilover Star:
            ul.single__list
              li.single__item Tu perfil en Prilov aparecerá de los primeros en la sección "Prilovers".
              li.single__item Tu perfil tendrá un sello "Prilover STAR" y tus productos también.
              li.single__item Siempre estaremos pendiente de ti y contestaremos tus mensajes en tiempo record.
              li.single__item Tu productos serán promocionados en nuestros e-mail masivos y en redes sociales.
              li.single__item Si tus fotos y productos no cumplen con el requisito mínimo de aprobación (Revisar Manual de cómo sacar buenas fotos) no podremos permitirte ser una Prilover STAR.
        .single__row
          a(href='#').btn.btn_solid Pagar con créditos y ser una Prilover Star
        .single__row
          a(href='#').link_underline No quiero ser una Prilover Star aún

</template>

<script>
import UserVacaciones from '@/components/UserVacaciones'
export default {
  name: 'UserPriloverStar',
  components: {
    UserVacaciones
  }
}
</script>
