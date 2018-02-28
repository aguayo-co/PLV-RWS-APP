<template lang="pug">
.notify
  .notify__ico.i-alert-tri
    h1.title.notify__title Lo sentimos pero algo ha salido mal
  .notify__body
    p Por favor intenta el registro nuevamente.
  .notify__footer
    .notify__row
      a.btn.btn_solid.btn_block(
      href='#') Intentar nuevamente
</template>

<script>
export default {
  name: 'FormErrorServer'
}
</script>
