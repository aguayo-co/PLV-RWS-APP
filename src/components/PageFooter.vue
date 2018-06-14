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
              target="_blank")
              span {{ items.name }}

      .foot-news
        h4.foot__title Newsletter
        p.foot__txt Inscríbete en el Newsletter para recibir promociones, descuentos especiales y noticias.

        form.form.foot__form(
          action="https://prilov.us9.list-manage.com/subscribe/post?u=8b6af106f12d9ec63c8570ebb&amp;id=02225c7945"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          novalidate
        )
          .form__row
            label.form__label(
              for='subscriberEmail') Correo
            input.form__control(
              type="email"
              value=""
              name="EMAIL"
              class="required email"
              id="mce-EMAIL"
            )
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            div(
              style="position: absolute; left: -5000px;"
              aria-hidden="true")
              input(type="text"
              name="b_8b6af106f12d9ec63c8570ebb_02225c7945"
              tabindex="-1"
              value="")
            router-link.link_underline(
              :to="{ name: 'terminos' }") Ver Condiciones de uso

          .form__row.form__row_away.form__btn
            button.btn.btn_solid(
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              class="button"
            ) Inscribir en el Newsletter
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
