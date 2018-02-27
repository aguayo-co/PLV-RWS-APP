<template lang="pug">
//- Footer PAGE
footer.page-foot.i-heart-on
  .layout-inner
    .foot__grid
      nav.foot-nav
        //- Footer Menu lista
        dl.foot-nav__list(
            v-for='list in footNavList')
          dt.foot__title {{ list.title }}
          dd.foot-nav__item(
            v-for='items in list.items')
            a.foot-nav__link(
              :href='items.url') {{ items.name }}
        //- Footer Menu lista redes
        dl.foot-nav__list.foot-nav__list_center
          dt.foot__title Síguenos
          dd.foot-nav__item
            a.foot-nav__link.i-insta-red(
              href='#')
                span.hide Instagram
          dd.foot-nav__item
            a.foot-nav__link.i-twitter-red(
              href='#')
                span.hide Twitter
          dd.foot-nav__item
            a.foot-nav__link.i-fb-red(
              href='#')
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
export default {
  name: 'PageFooter',
  data () {
    return {
      footNavList: [
        {
          title: 'List 1',
          items: [
            {
              name: 'item 1',
              url: '#'
            },
            {
              name: 'item 2',
              url: '#'
            }
          ]
        },
        {
          title: 'List 2',
          items: [
            {
              name: 'item 1',
              url: '#'
            },
            {
              name: 'item 2',
              url: '#'
            }
          ]
        },
        {
          title: 'List 3',
          items: [
            {
              name: 'item 1',
              url: '#'
            }
          ]
        }
      ]
    }
  }
}
</script>
