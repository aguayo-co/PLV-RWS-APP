<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Datos Bancarios
      p.single__subtitle(v-show="!editVissible") Información bancaria para pago de tus ventas realizadas
      .box-flat(v-if="user.bank_account && !editVissible")
        .box-flat__grid
          .box-flat__lead.i-credits
            h3.box-flat__title {{ bank.name }} {{ accountType.name }}
            p.box-flat__txt {{ user.bank_account.accountNumber }}
          .box-flat__button
            button.link_underline(@click="switchForm", title="Modificar datos bancarios") Modificar
      .box.box_alert(v-if="!user.bank_account && !editVissible")
        .box-flat__grid
          .box-flat__lead.i-alert-tri
            .box-flat__lead-group
              h3.box-flat__title Aún no posees datos bancarios para el pago de tus ventas
              p.box__txt Ingresa los datos de tu cuenta bancaria para trasnferir tus ganancias de Prilov. Puedes estar tranquila que tu información bancaria estará asegurada.
          .box-flat__button
            button.btn.box-flat__btn.btn_solid(@click="switchForm", title="Agregar medio de pago") Agregar cuenta

    //-1b Usuaria que  modifica su medio de pago
    form.form.form_big(
      v-show="editVissible"
      v-on:submit='',
      action='#',
      method='post')
      p.single__subtitle.subtitle_line Ingresa a continuación la información bancaria que debemos usar para depositar tus ganancias
        .form-section__inner
          .form__row(:class='{ "is-danger": errorLog.description }')
            label.form__label(
              for='rut') Rut
            span.help(
              v-if="errorLog.rut"
            ) {{ errorLog.rut }}
            input.form__control(
              v-model="bankData.rut"
              id='rut',
              ref='rut',
              type='text')
          .form__row(:class='{ "is-danger": errorLog.description }')
            label.form__label(
              for='fullname') Nombre y Apellido
            span.help(
              v-if="errorLog.fullname"
            ) {{ errorLog.fullname }}
            input.form__control(
              v-model="bankData.fullname"
              id='fullname',
              ref='fullname',
              type='text')
          .form__row(:class='{ "is-danger": errorLog.description }')
            label.form__label(
              for='bankId') Selecciona el Banco
            span.help(
              v-if="errorLog.bankId"
            ) {{ errorLog.bankId }}
            select.form__select(
              id="bankId",
              ref="bankId",
              v-model="bankData.bankId")
              option(
                v-for="bank in banks",
                :value="bank.id") {{ bank.name }}
          .form__row(:class='{ "is-danger": errorLog.description }')
            label.form__label(
              for='accountTypeId') Selecciona tu tipo de cuenta
            span.help(
              v-if="errorLog.accountTypeId"
            ) {{ errorLog.accountTypeId }}
            select.form__select(
              id="accountTypeId",
              ref="accountTypeId",
              v-model="bankData.accountTypeId")
              option(
                v-for="type in accountTypes",
                :value="type.id") {{ type.name }}
          .form__row(:class='{ "is-danger": errorLog.description }')
            label.form__label(
              for='accountNumber') Número de cuenta
            span.help(
              v-if="errorLog.accountNumber"
            ) {{ errorLog.accountNumber }}
            input.form__control(
              v-model="bankData.accountNumber"
              id='accountNumber',
              ref='accountNumber',
              type='text')
          .form__grid.form__grid_center.form__row_away
            .form__row
              button.btn(@click.prevent='switchForm', title='Cancelar') Cancelar
            .form__row
              button.btn.btn_solid(@click.prevent="validate" title='Agregar método de pago') Guardar método de pago

</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'DatosBancarios',
  data () {
    return {
      errorLog: {},
      editVissible: false,
      banks: [
        { id: 1, name: 'Banco de Chile / A. Edwards / Citibank N.A.' },
        { id: 2, name: 'Banco del Estado de Chile' },
        { id: 3, name: 'Banco Santander - Santiago' },
        { id: 4, name: 'Banco Falabella' },
        { id: 5, name: 'Banco Crédito e Inversiones' },
        { id: 6, name: 'Corpbanca' },
        { id: 7, name: 'Banco Bice' },
        { id: 8, name: 'Scotiabank' },
        { id: 9, name: 'Banco Itaú' },
        { id: 10, name: 'Banco Security' },
        { id: 11, name: 'Banco Consorcio' },
        { id: 12, name: 'BBVA Banco Bhif' },
        { id: 13, name: 'Banco del Desarrollo' },
        { id: 14, name: 'Banco Ripley' },
        { id: 15, name: 'Banco Internacional' },
        { id: 16, name: 'Dresdner Bank Leteinamerika' },
        { id: 17, name: 'Banco Do Brasil S.A.' },
        { id: 18, name: 'HSBC Bank Chile' },
        { id: 19, name: 'JP Morgan Chase Bank' },
        { id: 20, name: 'Banco de la Nación Argentina' },
        { id: 21, name: 'The Bank of Tokyo – Mitsubishi' },
        { id: 22, name: 'Abn Amro Bank (Chile)' },
        { id: 23, name: 'Deutsche Bank (Chile)' },
        { id: 24, name: 'HNS Banco' },
        { id: 25, name: 'Banco Conosur' },
        { id: 26, name: 'Banco Paris' }
      ],
      accountTypes: [
        { id: 1, name: 'Cuenta RUT' },
        { id: 2, name: 'Cuenta de ahorros' },
        { id: 3, name: 'Cuenta corriente' },
        { id: 4, name: 'Cuenta vista' }
      ]

    }
  },
  computed: {
    ...mapState(['user']),
    bank () {
      return this.banks.filter(x => x.id === this.user.bank_account.bankId)[0] || {}
    },
    accountType () {
      return this.accountTypes.filter(x => x.id === this.user.bank_account.accountTypeId)[0] || {}
    },
    bankData () {
      return this.user.bank_account || {}
    }
  },
  methods: {
    switchForm: function () {
      this.editVissible = !this.editVissible
    },
    validate: function () {
      this.errorLog = {}
      if (!this.bankData.rut) this.errorLog.rut = 'Debes ingresar tu número de Rut'
      if (!this.bankData.fullName) this.errorLog.fullname = 'Debes ingresar el nombre completo del dueño de la cuenta'
      if (!this.bankData.bankId) this.errorLog.bankId = 'Debes seleccionar un banco'
      if (!this.bankData.accountType) this.errorLog.accountTypeId = 'Debes seleccionar un tipo de cuenta'
      if (!this.bankData.accountNumber) this.errorLog.accountNumber = 'Debes ingresar un número de cuenta'

      if (Object.keys(this.errorLog).length === 0) {
        this.save()
      } else {
        this.$refs[Object.keys(this.errorLog)[0]].focus()
      }
    },
    save: function () {
      const data = {
        bank_account: this.bankData
      }
      this.$store.dispatch('user/update', data)
        .then(() => {
          this.switchForm()
        })
        .catch((e) => {
          this.$handleApiErrors(e, ['bank_account'], this.errorLog)
        })
    }
  }
}
</script>
