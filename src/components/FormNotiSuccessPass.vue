<template lang="pug">
  .notify
    .notify__ico.i-ok
      h1.title.notify__title Ya puedes recuperar tu contraseña
      .notify__body
        p Te hemos enviado un enlace  al Email <strong>{{getEmail}} </strong> para que puedas crear una nueva contraseña.
        p.notify__info.i-alert-info Recuerda revisar también la carpeta de <strong>correo no deseado.</strong>
      .notify__footer
        .notify__row
          a.btn.btn_solid.btn_block(
          href='/') Volver al inicio
</template>

<script>
export default {
  name: 'FormSuccessPass',
  computed: {
    getEmail () {
      return this.$store.getters['PasswordModule/getUserEmail']
    }
  }
}
</script>
