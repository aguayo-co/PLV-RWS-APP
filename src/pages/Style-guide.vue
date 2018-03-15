<template lang="pug">
.layout-page
  .layout-inner
    form.form
      .form__row
        label.form__label Correo
        input.form__control
        p.form__text Ups! Vemos que aún no tienes una cuenta. Te crearemos una cuenta rápidamente para que puedas continuar con la publicación de tu venta. Por favor ingresa los siguientes datos:
      .form__row
        label.form__label Nombre
        input.form__control
      .form__row
        label.form__label Apellido
        input.form__control
      .form__btn
        button.btn.btn_solid Continuar
</template>

<script>

export default {
  name: 'StyleGuide'
}
</script>
