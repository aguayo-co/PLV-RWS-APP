<template lang="pug">
.sg-box__row
  h4.page__head Elementos de Texto
  .sg-box__head
    .sg-box__el
      //- Elemento 1
      .break .Break
        .break__txt .break__txt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. "
    p Elemento de texto
    pre
      code .break {
        |
        |  position: relative;
        |  padding: 12px 0 24px;
        |  text-align: center;
        |  &::before {
        |    content: '';
        |    position: absolute;
        |    top: 50%;
        |    display: block;
        |    width: 100%;
        |    height: 1px;
        |    background-color: $c-default;
        |  }
        |  .break__txt {
        |    position: relative;
        |    z-index: 2;
        |    display: inline-block;
        |    padding: 0 24px;
        |    background-color: $c-neutro;
        |   }
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 2
      .txt_brand .txt_brand
    p Texto con color de marca
    pre
      code .txt_brand {
        |
        |       color: $c-brand;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 3
      .tag .tag : "At vero eos et accusamus et iusto odio dignissimos ducimu"
    p Borde rosado
    pre
      code .page__head {
        |
        |  display: inline-block;
        |  padding: 4px 8px;
        |  color: $c-brand;
        |  border: 1px solid $c-brand;
        |  border-radius: 25px;
        |}
  .sg-box__head
    .sg-box__el
      //- Elemento 4
      .through .through
    p Texto tachado
    pre
      code .through {
        |
        |    text-decoration: line-through;
        |  }
  .sg-box__head
    .sg-box__el
      //- Elemento 5
      .txt-light .txt-light
    p Texto light
    pre
      code .txt-light {
        |
        |  font-family: $f-normal;
        |  font-weight: $fw-thin;
        |  }

</template>

<script>

export default {
  name: 'TextElements'
}
</script>
