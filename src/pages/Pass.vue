<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario de registro
      FormPass
      //- Noti Error
      FormSuccess

</template>

<script>
import FormPass from '@/components/FormPass'
import FormSuccess from '@/components/FormNotiSuccessPass'
export default {
  name: 'Pass',
  components: {
    FormPass,
    FormSuccess
  }
}
</script>
