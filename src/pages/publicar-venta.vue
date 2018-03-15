<template lang="pug">
.layout-page
  form.form.form_big(
    id='form-publicar',
    action='#',
    submit.prevent='',
    method='post')
    FormPublicarVenta
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
