<template lang="pug">
.layout
  //- Datos personales
  .layout-inner
    .content-grid
      UserMenu(
        v-if="mqTablet"
      )
      router-view
      form.form
        .form__row
          label.form__label Ejemplo textarea
          textarea.form__textarea
        .form__row
          label.form__label Ejemplo select
          select.form__select
            option
            option item2
            option item3
            option item4
            option item5
            option item6
        .form__row
          input#radio1.form__input-radio(type="radio", name="radio", checked)
          label.form__label.form__label_radio(for="radio1")
            strong Comisión 20%
            | Tu producto serán publicado en Prilov. No te aseguramos que será promovido.
        .form__row
          input#radio2.form__input-radio(type="radio", name="radio")
          label.form__label.form__label_radio(for="radio2")
            strong Comisión 25%
            | Tu producto será publicado en Prilov. En las búsquedas aparecerá más arriba que los productos de comisión 20% y tendrá promoción a través de, al menos, unos de los medios que usamos como campañas, newsletters y/o redes sociales.
        .form__row
          input#radio3.form__input-radio(type="radio", name="radio")
          label.form__label.form__label_radio(for="radio3")
            strong Comisión 30%
            | Tu producto será publicado en Prilov. En las búsquedas aparecerá lo más arriba. También en Top Picks y campañas. En redes sociales lo    publicaremos si es que el producto calza con nuestra línea editorial.

        .form__row
          input#check1.form__input-check(type="checkbox", name="checkbox", checked)
          label.form__label.form__label_check.i-ok(for="check1") Estoy de acuerdo con la&nbsp;
            a.form__label-link(href="#") politica de privacidad
            |  de Prilov
</template>

<script>
import UserMenu from '@/components/UserMenu'

export default {
  name: 'User',
  components: {
    UserMenu
  }
}
</script>
