<template lang="pug">
.box
  .box-flat__grid
    .box-flat__lead.i-trip
      .box-flat__lead-group
        h3.box-flat__title Modo vacaciones
        p.box__txt Recuerda que si te vas de vacaciones o vas a estar sin conexión por un tiempo, puedes habilitar esta opción y tus productos no estarán disponibles para la venta.
    .box__switch
      .form__switch
        input.switch__input(
          @change="setMode"
          type="checkbox",
          id="standard",
          v-model="enabled")
        label.switch__label(
          for="standard")
            span.switch__status

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserVacaciones',
  data () {
    return {
      enabled: false
    }
  },
  computed: {
    ...mapState('user', [
      'id',
      'vacation_mode'
    ])
  },
  methods: {
    setMode: function () {
      const data = {
        vacation_mode: this.enabled
      }
      this.$store.dispatch('user/update', data)
        .then(response => {
          let productStatus = ''
          this.enabled ? productStatus = 'deshabilitados' : productStatus = 'habilitados'
          const modal = {
            name: 'ModalMessage',
            parameters: {
              type: 'positive',
              title: 'Actualizaste tu modo vacaciones. Todos tus productos han quedado ' + productStatus
            }
          }
          this.$store.dispatch('ui/showModal', modal)
        })
        .catch(e => {
          const modal = {
            name: 'ModalMessage',
            parameters: {
              type: 'alert',
              title: 'Ocurrió un error al actualizar tu modo vacaciones'
            }
          }
          this.$store.dispatch('ui/showModal', modal)
          this.enabled = this.vacations_mode
        })
    }
  },
  watch: {
    id: function () {
      this.enabled = this.vacation_mode
    }
  }
}
</script>
