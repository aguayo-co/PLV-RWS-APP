<template lang="pug">
  div {{ minutesLeft }} minutos
</template>

<script>
export default {
  name: 'CountDown',
  props: ['time'],
  data () {
    return {
      intervalId: null,
      minutesLeft: null
    }
  },
  created () {
    this.startTimer()
  },
  methods: {
    clearTimer () {
      clearInterval(this.intervalId)
    },
    startTimer () {
      this.setTimeLeft()
      this.intervalId = setInterval(this.setTimeLeft, 10000)
    },
    setTimeLeft () {
      if (this.countDownTo < this.$moment()) {
        this.minutesLeft = '0'
        return
      }
      this.minutesLeft = this.countDownTo.diff(this.$moment(), 'minutes')
    }
  },
  computed: {
    countDownTo () {
      return this.$moment(this.time)
    }
  },
  watch: {
    time () {
      this.clearTimer()
      this.startTimer()
    }
  }
}
</script>
