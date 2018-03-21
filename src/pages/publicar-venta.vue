<template lang="pug">
.layout-page
  form.form.form_big(
    id='form-publicar',
    action='#',
    submit.prevent='',
    method='post')
    FormPublicarVenta
    .step
      //-1.1b Usuaria selecciona su método de envío
      .layout-inner
        fieldset.form-section
          legend.subhead.form-section__title Estás a un paso de terminar la publicación de tu producto.
            p.form-section__subtitle Habilita los métodos de envío disponibles para tus productos

</template>

<script>
import FormPublicarVenta from '@/components/FormPublicarVenta'

export default {
  name: 'PublicarVenta',
  components: {
    FormPublicarVenta
  }
  // data () {
  //   return {
  //     uploadMain: {}
  //   }
  // }
}
</script>
