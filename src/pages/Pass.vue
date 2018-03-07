<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario recuperar PASS
      FormPass(
        v-if="recoverSuccess == false")
      //- NotiSuccess
      FormSuccess(v-else)

      //- Formulario Confirmar PASS
      FormPassEnd
      //- NotiSuccess
      FormNotiSuccessPassEnd

</template>

<script>
import FormPass from '@/components/FormPass'
import FormSuccess from '@/components/FormNotiSuccessPass'
import FormPassEnd from '@/components/FormPassEnd'
import FormNotiSuccessPassEnd from '@/components/FormNotiSuccessPassEnd'
export default {
  name: 'Pass',
  components: {
    FormPass,
    FormSuccess,
    FormPassEnd,
    FormNotiSuccessPassEnd
  },
  data () {
    return {
      recoverSuccess: false,
      userEmail: ''
    }
  },
  methods: {
    setRecoverSuccess () {
      this.recoverSuccess = true
    }
  }
}
</script>
