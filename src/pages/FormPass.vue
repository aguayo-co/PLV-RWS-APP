<template lang="pug">
main.content-slot
  .content-slot__inner
    h1.title Recuperar Contraseña
    p Ingresa tu correo y te enviaremos un enlace para recuperar tu contraseña.
    form.form.form_big(
      v-on:submit='',
      action='#',
      method='post')
      .form__row
        label.form__label(
          for='userEmail') Correo
        input.form__control(
          v-model='userEmail',
          id='userEmail',
          type='email')
      .form__row.form__row_away
        button.btn.btn_solid.btn_block(
          @click.prevent='Login()') Enviar Correo
</template>

<script>
export default {
  name: 'FormSingUp'
}
</script>
