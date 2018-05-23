<template lang="pug">
  .notify
    .notify__ico.i-alert
      h1.title.notify__title Lo sentimos, algo salió mal
    .notify__body.notify__body_center
      p Por favor intenta registrarte nuevamente.
    .notify__footer
      .notify__row
        button.btn.btn_solid.btn_block.i-reload(
          @click.prevent='setSignUp()') Intentar nuevamente
</template>

<script>
export default {
  name: 'FormErrorServer',
  data: function () {
    return {
      flagSignUp: 'SignUp'
    }
  },
  methods: {
    setSignUp () {
      this.flagSignUp = 'SignUp'
      this.$emit('setSignUp')
    }
  }
}
</script>
