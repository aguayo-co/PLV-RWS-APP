<template lang="pug">
  .layout-page
    .step
      .layout-inner
        .form-section
          header.page__head
            h1.title__main ¡Listo! pronto tu producto aparecerá en Prilov
          p.form-section__subtitle Ahora debes esperar que tu producto sea aprobado por nuestro equipo. Esto puede tardar hasta 48 horas hábiles. Recibirás un mail notificándote cuando esto ocurra.
        .form-section.form-section_footer
          .form__row
            a.btn.btn_solid(
            href='#') Agregar más productos
          .form__row
            a.btn(
            href='#') Vitrinear
</template>

<script>

export default {
  name: 'PublicarVentaPendiente'
}
</script>
