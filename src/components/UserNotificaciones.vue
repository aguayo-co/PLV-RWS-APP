<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Notificaciones
      p.single__subtitle Habilita los métodos de envío disponibles para todos tus productos
  UserNotificacionesMensaje

</template>

<script>
import UserNotificacionesMensaje from '@/components/UserNotificacionesMensaje'

export default {
  name: 'UserNotificaciones',
  components: {
    UserNotificacionesMensaje
  }
}
</script>
