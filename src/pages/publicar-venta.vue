<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head.steps__header
        h1.title Publicar una venta
        h2.title_subhead ¿No lo usas?, ¡Vendelo!
        ul.steps__list
          li.steps__item.steps__item_current
            span.steps__bullet.i-ok 1
            span.steps__label Producto
          li.steps__item
            span.steps__bullet.i-ok  2
            span.steps__label Descripción
  form.form.form_big(
    id='form-publicar',
    action='#',
    submit.prevent='',
    method='post')
    //-Formulario step 1 formlario Foto
    PublicarVentaStep1
    //-Formulario step Formulario producto
    PublicarVentaStep2

</template>

<script>
import PublicarVentaStep1 from '@/components/PublicarVenta-step1'
import PublicarVentaStep2 from '@/components/PublicarVenta-step2'

export default {
  name: 'PublicarVenta',
  components: {
    PublicarVentaStep1,
    PublicarVentaStep2
  }
  // data () {
  //   return {
  //     uploadMain: {}
  //   }
  // }
}
</script>
