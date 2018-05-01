<template lang="pug">
.box
  .box-flat__grid
    .box-flat__lead.i-trip
      .box-flat__lead-group
        h3.box-flat__title ¿Te vas de vacaciones?
        p.box__txt Recuerda que si te vas de vacaciones o vas a estar sin conexión por un tiempo, habilita el "Modo Vacaciones" y tus productos no estarán disponibles para la venta.
    .box__switch
      .form__switch
        input.switch__input(
          type="checkbox",
          id="standard",
          checked)
        label.switch__label(
          for="standard")
            span.switch__status

</template>

<script>

export default {
  name: 'UserVacaciones'
}
</script>
