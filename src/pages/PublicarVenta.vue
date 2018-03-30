<template lang="pug">
.layout-page
  form.form.form_big(
    id='form-publicar',
    action='#',
    submit.prevent='',
    method='post')
    FormPublicarVenta
  FormPublicarUserData
  //- 2a Usuaria no logueada
      2b Usuaria registrada no logueada
  FormPublicarLogin
  //- 3a Usuaria no registrada
  FormPublicarSignUp

</template>

<script>
import FormPublicarVenta from '@/components/FormPublicarVenta'
import FormPublicarUserData from '@/components/FormPublicarUserData'
import FormPublicarLogin from '@/components/FormPublicarLogin'
import FormPublicarSignUp from '@/components/FormPublicarSignUp'

export default {
  name: 'PublicarVenta',
  components: {
    FormPublicarVenta,
    FormPublicarUserData,
    FormPublicarLogin,
    FormPublicarSignUp
  }
}
</script>
