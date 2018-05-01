<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Datos Bancarios
      p.single__subtitle Información bancaria para depósito de ventas realizadas
      .box-flat
        .box-flat__grid
          .box-flat__lead.i-bank-data
            h3.box-flat__title Cuenta Corriente Banco Chile
            p.box-flat__txt ....&nbsp;....&nbsp;....&nbsp;3306
          .box-flat__button
            a.box-flat__btn.txt-underline(href="#", title="Modificar datos bancarios") Modificar
      //2a Usuaria que no posee un método de pago
      .box.box_alert
        .box-flat__grid
          .box-flat__lead.i-alert-tri
            .box-flat__lead-group
              h3.box-flat__title Aún no posees un medio de depósito para Tus Ventas
              p.box__txt Danos tu cuenta para depositar tus ganancias de Prilov. Puedes estar tranquila que tu información bancaria estará asegurada.
          .box-flat__button
            a.btn.box-flat__btn.btn_solid(href="#", title="Agregar medio de pago") Agregar medio de pago
      //End 2a Usuaria que no posee un método de pago
    //-1a Usuaria que agrega su medio de pago
    form.form.form_big(
      v-on:submit='',
      action='#',
      method='post')
        p.single__subtitle.subtitle_line Agrega tu información bancaria para depositar tus ganancias.
        .form-section__inner
          .form__row
            label.form__label(
              for='rutUser') Rut
            input.form__control(
              id='rutUser',
              type='text')
          .form__row
            label.form__label(
              for='nameUser') Nombre y Apellido
            input.form__control(
              id='nameUser',
              type='text')
          .form__row
            label.form__label(
              for='userBank') Selecciona el Banco
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form__row
            label.form__label(
              for='userAccount') Selecciona tu tipo de cuenta
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form__row
            label.form__label(
              for='accountNumber') Número de cuenta
            input.form__control(
              id='accountNumber',
              type='text')
          .form__row
            label.form__label(
              for='emailUser') Correo
            input.form__control(
              id='emailUser',
              type='email')
          .form__grid.form__grid_center.form__row_away
            .form__row
              a.btn(href='#', title='Cancelar') Cancelar
            .form__row
              a.btn.btn_solid(href='#', title='Agregar método de pago') Agregar Método de pago

    //-1b Usuaria que  modifica su medio de pago
    form.form.form_big(
      v-on:submit='',
      action='#',
      method='post')
      p.single__subtitle.subtitle_line Modificar información bancaria para depositar tus ganancias.
        .form-section__inner
          .form__row
            label.form__label(
              for='rutUser') Rut
            input.form__control(
              id='rutUser',
              type='text')
          .form__row
            label.form__label(
              for='nameUser') Nombre y Apellido
            input.form__control(
              id='nameUser',
              type='text')
          .form__row
            label.form__label(
              for='userBank') Selecciona el Banco
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form__row
            label.form__label(
              for='userAccount') Selecciona tu tipo de cuenta
            select.form__select
              option
              option item2
              option item3
              option item4
              option item5
              option item6
          .form__row
            label.form__label(
              for='accountNumber') Número de cuenta
            input.form__control(
              id='accountNumber',
              type='text')
          .form__row
            label.form__label(
              for='emailUser') Correo
            input.form__control(
              id='emailUser',
              type='email')
          .form__grid.form__grid_center.form__row_away
            .form__row
              a.btn(href='#', title='Cancelar') Cancelar
            .form__row
              a.btn.btn_solid(href='#', title='Agregar método de pago') Agregar Método de pago

</template>

<script>
export default {
  name: 'DatosBancarios'
}
</script>
