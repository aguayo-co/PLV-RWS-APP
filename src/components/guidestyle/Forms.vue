<template lang="pug">
.sg-box__row
  h4.page__head Elementos de Formulario
  .sg-box__head
    .sg-box__el
      //- Elemento 1
      .form__set .form__set:  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. "
    p Bloque de Formulario
    pre
      code .form__set {
        |
        |  border: none;
        |  max-width: 440px;
        |  margin: 0 auto;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 2
      .form__legend .form__legend  : "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
    p Bloque de formulario Legend
    pre
      code .txt_brand {
        |
        |  padding-bottom: 24px;
        |  margin: 0;
        |  text-transform: uppercase;
        |  @include font-rem(18px);
        |  font-family: $f-fancy;
        |  font-weight: $fw-light;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 3
      label.form__label .form__label
    p Elemento de Formulario label
    pre
      code .form__label {
        |
        |    display: block;
        |    padding-bottom: 6px;
        |    @include font-rem(14px);
        |    font-weight: $fw-bold;
        |}
  .sg-box__head
    .sg-box__el
      //- Bloque de Formulario 1
      h4.page__head Bloque de Formulario [1]
      form.form
        .form__row
          label.form__label(
            for='email') Correo
          span.help
          input.form__control
        .form__row
          label.form__label Contraseña
          span.help Texto de Alerta
          input.form__control(type='password')
          p.form__note.form__note_right
            |¿Olvidaste tu contraseña?
            | <a title='Ir a recuperar contraseña'>Recuperar contraseña.</a>
        .form__row.form__row_away
          button.btn.btn_solid.btn_block Iniciar sesión
      .break
        span.break__txt O
      a.btn.btn_block Regístrate
      //- #Bloque de Formulario 1
    pre
      code FormLogin.vue
  .sg-box__head
    .sg-box__el
      //- Bloque de Formulario 2
      h4.page__head Bloque de Formulario [2]
      .notify
        .notify__ico.i-alert-tri
          h1.title.notify__title Lo sentimos pero algo ha salido mal
        .notify__body.notify__body_center
          p Por favor intenta el registro nuevamente.
        .notify__footer
          .notify__row
            a.btn.btn_solid.btn_block.i-reload(
              @click.prevent='setSignUp()'
            href='#') Intentar nuevamente
      //- #Bloque de Formulario 2
    pre
      code FormNotiErrorServer.vue
        |
  .sg-box__head
    .sg-box__el
      //- Bloque de Formulario 3
      h4.page__head Bloque de Formulario [3]
      .notify
        h1.title.notify__title bienvenida a Prilov
        .notify__body
          p Ya puedes publicar tu primera venta y realizar compras en toda la tienda.
        .notify__footer
          .notify__row
            a.btn.btn_solid.btn_block(
            href='#') Publicar una venta
          .notify__row
            a.btn.btn_block(
            href='#') Ir a la tienda
      //- #Bloque de Formulario 3
    pre
      code FormNotiSuccess.vue
        |
  .sg-box__head
    .sg-box__el
      //- Bloque de Formulario 4
      h4.page__head Bloque de Formulario [4]
      .notify
        .notify__ico.i-ok
          h1.title.notify__title Ya puedes recuperar tu contraseña
          .notify__body
            p Te hemos enviado un enlace  al Email <strong>contacto@correo.com</strong> para que puedas crear una nueva contraseña.
            p.notify__info.i-alert-info Recuerda revisar también la carpeta de <strong>correo no deseado.</strong>
          .notify__footer
            .notify__row
              a.btn.btn_solid.btn_block(
              href='/') Volver al inicio
      //- #Bloque de Formulario 4
    pre
      code FormNotiSuccessPass.vue
        |
  .sg-box__head
    .sg-box__el
      //- Bloque de Formulario 5
      h4.page__head Bloque de Formulario [5]
      .notify
        .notify__ico.i-ok
          h2.title.notify__title Has cambiado exitosamente tu contraseña
          .notify__footer.form__row_away
            p.notify__row
              //-TO-DO: poner URL de usuaria
              a.btn.btn_solid.btn_block(
              href='/') Ir a mi cuenta
      //- #Bloque de Formulario 5
    pre
      code FormNotiSuccessPassEnd.vue
        |
  .sg-box__head
    .sg-box__el
      //- Bloque de Formulario 6
      h4.page__head Bloque de Formulario [6]
      form
        fieldset.form-section
          legend.subhead.form-section__title Cuéntanos más sobre tu producto
            p.form-section__subtitle Una buena descripción hace que los compradores encuentren rápidamente tus productos.

          .form__row
            label.form__label(
              for='product-name') Nombre
            span.help Mensaje de error
            input.form__control
          .form__row
            label.form__label Descripción
            textarea.form__textarea
      //-Formulario set 2
      .layout-inner
        fieldset.form-section
          legend.subhead.form-section__title Más detalles de tu producto
          .form-section__grid
            .form-section__item
              .form__row
                label.form__label(
                  for='product-categoria') Categoría
                select.form__select
                  optgroup
                    option Categoría
              .form__row
                label.form__label(
                  for='product-estado') Estado del producto
                select.form__select
                  optgroup(label='Estado del producto')
                    option Opcion
              .form__row.color
                label.form__label Color principal
                input.form__select
                .toggle-select
                  ul.toggle-select__list
                    li.toggle-select__item
                      span Color
              .form__row.color
                label.form__label Color adicional
                input.form__select
                .toggle-select
                  ul.toggle-select__list
                    li.toggle-select__item
                      span.color-circle
                      span Nombre
              .form__row
                label.form__label Selecciona un esquema de tallas
                .size
                  input.form__input-radio
                  label.form__label.form__label_radio
                    strong.form__headline Talla
                    p.form__disclaimer Descripción
                .form__row
                  label.form__label Selecciona la talla de tu producto
                  select.form__select
                    optgroup
                      option Tamaño
              .form__row
                label.form__label Marca
                select.form__select
                  optgroup
                    option Marca
              .form__row
                label.form__label
                input.form__control
              .form__row
                label.form__label Precio de venta
                span.form__price
                  input.form__control
              .form__row
                label.form__label Precio al que compraste tu producto
                span.form__price
                  input.form__control
            .form-section__item

              .form-section__slot
                h3.form-section__head Así se verá tu publicación
                article.slot
                  a.slot__product
                    img.slot__img

                    //-title/dimensions
                    .slot__lead
                      .slot__title título
                      .slot__size
                        .slot__size-txt Tamaño de producto

                    //- brand/price
                    .slot__info
                      .slot__brand
                      .slot__price

                  //- user: picture/first_name/last_name
                  a.slot__user
                    .slot__user-img
                      .slot__avatar
                        img.slot__picture
                    .slot__user-info
                      .slot__prilover
                      .slot__group.i-it-girl It <span class='txt_brand'>girl</span>
                      .slot__group.i-starts Prilover <span class='txt_brand'>Star</span>

      //-Formulario set 3
      .layout-band.form-section_band
        .layout-inner
          fieldset.form-section
            legend.subhead.form-section__title Exposición del producto
            .form__row
              input.form__input-radio
              label.form__label.form__label_radio(
                for='comision-20')
                strong.form__headline Comisión 20%
                p.form__disclaimer Tu producto será publicado en Prilov. No te aseguramos que será promovido.
            .form__row
              input.form__input-radio
              label.form__label.form__label_radio(
                for='comision-25')
                strong.form__headline Comisión 25%
                p.form__disclaimer Tu producto será publicado en Prilov. En las búsquedas aparecerá más arriba que los productos de comisión 20% y tendrá promoción a través de, al menos, unos de los medios que usamos como campañas, newsletters y/o redes sociales.
            .form__row
              input.form__input-radio
              label.form__label.form__label_radio(
                for='comision-30')
                strong.form__headline Comisión 30%
                p.form__disclaimer Tu producto será publicado en Prilov. En las búsquedas aparecerá lo más arriba. También en Top Picks y campañas. En redes sociales lo publicaremos si es que el producto calza con nuestra línea editorial.

      //-Formulario set 4
      .layout-inner
        fieldset.form-section.form-section_dividers
          legend.subhead.form-section__title Tu ganancia quedará en

          .dividers
            dl.dividers__item.dividers_table
              dt.dividers__head Precio del producto - comisión de Prilov
              dt.dividers__term $ 100.000

        .form-section.form-section_footer
          .form__row
            input#check1.form__input-check
            label.form__label.form__label_check.i-ok(for="check1")
              | Estoy de acuerdo con la <a class="form__label-link" href="#">politica de privacidad</a> de Prilov
          .form__row.form__row_away
            button.btn.btn_solid Continuar
      //- #Bloque de Formulario 6
    pre
      code FormPublicarVenta.vue
        |
  .sg-box__head
    .sg-box__el
      //- Bloque de Formulario 7
      h4.page__head Bloque de Formulario [7]
      form.form.form_big
        .form__row
          label.form__label(
            for='nombre') Nombre
          span.help Mensaje de Error
          input.form__control
        .form__row
          label.form__label(
            for='apellidos') Apellidos
          input.form__control
        .form__row
          label.form__label(
            for='email') Correo
          input.form__control
          a(href='#') ¡Recupérala aquí!
        .form__row
          label.form__label(
            for='emailConfirm') Confirma tu correo
          input.form__control
        .form__row
          label.form__label(
            for='password') Contraseña
          input.form__control
          span.password-bar
          div.help
            ul
              li
        .form__row.form__row_away
          button.btn.btn_solid.btn_block Registrarse
      .break
        span.break__txt O
      //- #Bloque de Formulario 7
    pre
      code FormSignUp.vue
  //- .sg-box__head
  //-   .sg-box__el
  //-     //- Bloque de Formulario 8
  //-     h4.page__head Bloque de Formulario [8]
  //-     //- #Bloque de Formulario 8
  //-   pre
  //-     code FormNotiSuccessPassEnd.vue
  //-       |
  //- .sg-box__head
  //-   .sg-box__el
  //-     //- Bloque de Formulario 9
  //-     h4.page__head Bloque de Formulario [9]
  //-     //- #Bloque de Formulario 9
  //-   pre
  //-     code FormNotiSuccessPassEnd.vue
  //-       |
</template>

<script>

export default {
  name: 'Forms'
}
</script>
