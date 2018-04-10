<template lang="pug">
//- Footer PAGE
footer.page-foot.i-heart-on
  .layout-inner
    .foot__grid
      nav.foot-nav
        //- Footer Menu lista
        dl.foot-nav__list(
            v-for='list in footer')
          dt.foot__title {{ list.name }}
          dd.foot-nav__item(
            v-for='items in list.children')
            a.foot-nav__link(
              :href='items.url',
              :class='items.icon',
              :target='items.target')
              span {{ items.name }}

      .foot-news
        h4.foot__title Newsletter
        p.foot__txt Inscríbete en el Newsletter para recibir promociones, descuentos especiales y noticias.

        form.form.foot__form(
          v-on:submit='',
          action='#',
          method='post'
        )
          .form__row
            label.form__label(
              for='subscriberEmail') Correo
            input.form__control(
              id='subscriberEmail',
              type='email'
            )
            a.link_underline(
              href="#") Ver Política de Datos

          .form__row.form__row_away.form__btn
            button.btn.btn_solid Inscribir en el Newsletter
    .foot-legal
      p.foot-legal__copy Copyright © 2017 prilov.com. Todos los derechos reservados.

</template>

<script>
export default {
  name: 'PageFooter',
  data () {
    return {
      footer: {}
    }
  },
  created () {
    this.$axios.get('/api/menus/footer').then(response => {
      this.footer = response.data.items
    })
  }
}
</script>
