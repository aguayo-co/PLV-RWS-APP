<template lang="pug">
.form-slot
  h1.title Registro
  form.form.form_big(
    v-on:submit='',
    action='#',
    method='post'
  )
    .form__row
      label.form__label(
        for='userName') Nombre
      input.form__control(
        v-model='userName',
        id='userName',
        type='text')
    .form__row
      label.form__label(
        for='userLast') Apellidos
      input.form__control(
        v-model='userLast',
        id='userLast',
        type='text')
    .form__row
      label.form__label(
        for='userEmail') Correo
      input.form__control(
        v-model='userEmail',
        id='userEmail',
        type='email'
      )
    .form__row
      label.form__label(
        for='userEmail2') Confirma tu correo
      input.form__control(
        v-model='userEmail2',
        id='userEmail2',
        type='email'
      )
    .form__row
      label.form__label(
        for='userPsw') Contraseña
      input.form__control(
        v-model='userPsw',
        id='userPsw',
        type='password')
    .form__row.form__row_away
      button.btn.btn_solid.btn_block(
        @click.prevent='SignUp()') Registrarse
  .break
    span.break__txt O
</template>

<script>
export default {
  name: 'FormSingUp'
}
</script>
