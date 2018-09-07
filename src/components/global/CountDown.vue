<template lang="pug">
  div
    template(v-if="daysLeft") {{ daysLeft | pluralize('día') }}&nbsp;
    template(v-if="hoursLeft") {{ hoursLeft | pluralize('hora') }}&nbsp;
    template {{ minutesLeft | pluralize('minuto') }}
</template>

<script>
export default {
  name: 'CountDown',
  props: ['time'],
  data () {
    return {
      intervalId: null,
      timeLeft: null
    }
  },
  created () {
    this.startTimer()
  },
  destroyed () {
    this.clearTimer()
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
        this.timeLeft = this.$moment.duration(0)
        return
      }
      this.timeLeft = this.$moment.duration(this.countDownTo.diff(this.$moment()))
    }
  },
  computed: {
    daysLeft () {
      return Math.floor(this.timeLeft.asDays())
    },
    hoursLeft () {
      return this.timeLeft.hours()
    },
    minutesLeft () {
      return this.timeLeft.minutes()
    },
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
