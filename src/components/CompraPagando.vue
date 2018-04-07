<template lang="pug">
.modal__slot.content-slot
  .content-slot__inner
    .notify
      h2.title.notify__title  Estás a un paso de obtener tu compra.
      p.subtitle_heart Aun no has terminado tu compra, sube tu comprobante de pago.
      .notify__body
        form.form.form_file
          input.form__file(
            type="file",
            name="file-comprobante",
            id="file-comprobante",
            multiple="")
          label.form__label_file(for="file-comprobante")
            span.form__file-txt Selecciona archivo
            .form__file-input
              span.form-file__txt no se elegió archivo
              span.form-file__btn Subir
        p.notify__txt Recuerda que tienes un máximo de 10 minutos para realizar tu transferencia, de lo contrario tu compra se cancelará automáticamente
      .notify__footer
          button.btn.btn_solid Enviar comprobante
</template>
