<template lang="pug">
.sg-box__row
  h4.page__head Títulos
  .sg-box__head
    .sg-box__el
      //- Elemento 1
      .title__main Title Main
    p Título principal
    pre
      code .title__main {
        |
        |     display: inline-block;
        |     padding-bottom: 14px;
        |     text-align: center;
        |     text-transform: uppercase;
        |     @include font-rem(28px);
        |     font-family: $f-fancy;
        |     font-weight: $fw-semi-bold;
        |     border-bottom: 1px solid $c-default;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 2
      .title Title
    p Título de página para el slot
    pre
      code .title {
        |
        |       padding-bottom: 14px;
        |        margin-bottom: 24px;
        |        text-align: center;
        |        text-transform: uppercase;
        |        @include font-rem(26px);
        |        font-family: $f-fancy;
        |        font-weight: $fw-semi-bold;
        |        border-bottom: 1px solid $c-default
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 3
      .page__head page__head
    p Título de cabecera
    pre
      code .page__head {
        |
        |       padding: 30px 0 36px;
        |       text-align: center;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 4
      .section__head section__head
    p Título de sección
    pre
      code .section__head {
        |
        |    width: 96%;
        |    margin: 0 auto;
        |    padding: 24px 0 20px;
        |  }
  .sg-box__head
    .sg-box__el
      //- Elemento 5
      .section__subhead section__subhead
    p Subtítulo de sección
    pre
      code .section__subhead {
        |
        |    width: 96%;
        |    margin: 0 auto;
        |    padding: 58px 0 48px;
        |  }
  .sg-box__head
    .sg-box__el
      //- Elemento 6
      .title_head title_head
    p Título de cabecera
    pre
      code .title_head {
        |
        |  text-align: center;
        |  text-transform: uppercase;
        |  @include font-rem(26px);
        |  font-family: $f-fancy;
        |  font-weight: $fw-light;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 7
      .title_subhead title_subhead
    p Subtítulo de cabecera
    pre
      code .title_subhead {
        |
        |  padding-top: 18px;
        |  text-align: center;
        |  text-transform: uppercase;
        |  color: $c-default-2;
        |  @include font-rem(16px);
        |  font-family: $f-fancy;
        |  font-weight: $fw-medium;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 8
      .title_line title_line
    p Título de bloque
    pre
      code .title_line {
        |
        |  line-height: 0.97;
        |  letter-spacing: -1.2px;
        |  text-transform: uppercase;
        |  @include font-rem(36px);
        |  font-family: $f-fancy;
        |  font-weight: $fw-semi-bold;
        |  &::before {
        |    content: '';
        |    display: block;
        |    max-width: 160px;
        |    margin: 0 auto;
        |    height: 3px;
        |    background-color: $c-brand;
        |  }
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 9
      .subhead subhead
    p Subtítulo de bloque
    pre
      code .subhead {
        |
        |  padding-bottom: 16px;
        |  text-align: center;
        |  text-transform: uppercase;
        |  @include font-rem(20px);
        |  font-family: $f-fancy;
        |  font-weight: $fw-light;
        |  border-bottom: 1px solid $c-neutro-3;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 10
      .headline .headline
    p Subtítulo de bloque
    pre
      code headline {
        |
        |  padding: 10px 0 50px;
        |  text-transform: uppercase;
        |  font-family: $f-fancy;
        |  font-weight: $fw-medium;
        |  @include font-rem(22px);
        |}

</template>

<script>

export default {
  name: 'Titles'
}
</script>
