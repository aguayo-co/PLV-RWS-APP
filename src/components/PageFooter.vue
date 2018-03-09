<template lang="pug">
//- Footer PAGE
footer.page-foot.i-heart-on
  .layout-inner
    .foot__grid
      nav.foot-nav
        //- Footer Menu lista
        dl.foot-nav__list(
            v-for='(list, index) in footer')
          dt.foot__title(v-if= "index < 4") {{ list.name }}
          dd.foot-nav__item(
            v-for='(items, indexG) in list.children')
            a.foot-nav__link(
              v-if="index < 4"
              :href='items.url') {{ items.name }}
        //- Footer Menu lista redes
        dl.foot-nav__list.foot-nav__list_center
          dt.foot__title Síguenos
          dd.foot-nav__item
            a.foot-nav__link.i-insta-red(
              href='https://www.instagram.com/prilovchile/?hl=es-la')
                span.hide Instagram
          dd.foot-nav__item
            a.foot-nav__link.i-twitter-red(
              href='https://twitter.com/prilovchile?lang=es')
                span.hide Twitter
          dd.foot-nav__item
            a.foot-nav__link.i-fb-red(
              href='https://www.facebook.com/prilovchile')
                span.hide Facebook
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
              for='userEmail') Correo
            input.form__control(
              v-model='userEmail',
              id='userEmail',
              type='email'
            )
            a.link_underline(
              href="") Ver Política de Datos
          .form__row.form__row_away.form__btn
            button.btn.btn_solid(
              @click.prevent='') Inscribir en el Newsletter
    .foot-legal
      p.foot-legal__copy Copyright © 2017 prilov.com. Todos los derechos reservados.

</template>

<script>
import axios from 'axios'
export default {
  name: 'PageFooter',
  data () {
    return {
      footer: {}
    }
  },
  async created () {
    await axios.get('https://prilov.aguayo.co/api/menus', {
    })
      .then(response => {
        this.footer = response.data.data[1].items
      })
      .catch(e => {
        console.log('ERROR : ' + e)
      })
  }
}
</script>
