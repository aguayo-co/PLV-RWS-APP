<template lang="pug">
  .notify
    .notify__ico.i-ok
      h2.title.notify__title ¡Tu contraseña se ha cambiado exitosamente!
      .notify__footer.form__row_away
        p.notify__row
          router-link.btn.btn_solid.btn_block(
            :to="{ name: 'user-data'}") Ir a mi cuenta
</template>

<script>
export default {
  name: 'FormSuccessPassEnd',
  data () {
    return {
      userEmail: ''
    }
  }
}
</script>
