<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Prilover Star
    //- Step 4 => Flujo de llegada del Flujo 3
    //- Módulos de retorno
    UserPriloverOpciones
    //- Step 1
    //- Flujo 1 desde btn => Ser Prilover Star
    UserFaltanCreditos
    //- Step 1_b
    //- Flujo 1_b desde btn => Comprar Créditos
    UserComprarCreditos
    //- Step 1_c NO => ¿Usuaria paga con pasarela online?
    //- Flujo 1_c
    UserFaltaunPaso
    //- Step 1_d Éxito Transferencia bancaria
    //- Flujo 1_d => Btn enviar comprobante
    UserAlertaEnviado
    //- Step 2  => Prilover Star usuaria con capacidad de créditos
    //- Flujo 2
    UserAlertaaunPaso
    //- Step 2_b SI => Transferencia bancaria exitosa
    //- Flujo 2_b ** CASO 1 **
    UserAlertaComprobanteCorreo
    //- Step 2_b SI => Transferencia bancaria exitosa
    //- Flujo 2_b ** CASO 2 **
    UserAlertaComprobanteTransferencia
    //- Step 2_c NO => Transferencia bancaria ERROR
    //- Flujo 2_c ** CASO 1 **
    UserAlertaErrorTransferencia
    //- Step 2_c NO => Transferencia bancaria ERROR
    //- Flujo 2_c ** CASO 2 **
    UserAlertaErrorValidacion
    //- Step 3 => Información sobre Prilover Star
    //- Flujo 3
    UserInformacion

</template>

<script>
import UserPriloverOpciones from '@/components/UserPriloverOpciones'
import UserFaltanCreditos from '@/components/UserFaltanCreditos'
import UserComprarCreditos from '@/components/UserComprarCreditos'
import UserFaltaunPaso from '@/components/UserFaltaunPaso'
import UserAlertaEnviado from '@/components/UserAlertaEnviado'
import UserAlertaaunPaso from '@/components/UserAlertaaunPaso'
import UserAlertaComprobanteCorreo from '@/components/UserAlertaComprobanteCorreo'
import UserAlertaComprobanteTransferencia from '@/components/UserAlertaComprobanteTransferencia'
import UserAlertaErrorTransferencia from '@/components/UserAlertaErrorTransferencia'
import UserAlertaErrorValidacion from '@/components/UserAlertaErrorValidacion'
import UserInformacion from '@/components/UserInformacion'

export default {
  name: 'UserPriloverStar',
  components: {
    UserPriloverOpciones,
    UserFaltanCreditos,
    UserComprarCreditos,
    UserFaltaunPaso,
    UserAlertaEnviado,
    UserAlertaaunPaso,
    UserAlertaComprobanteCorreo,
    UserAlertaComprobanteTransferencia,
    UserAlertaErrorTransferencia,
    UserAlertaErrorValidacion,
    UserInformacion
  }
}
</script>
