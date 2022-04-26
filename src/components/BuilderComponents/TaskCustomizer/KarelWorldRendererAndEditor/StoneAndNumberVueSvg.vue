<template> 
  <svg viewBox="0 0 10 10">
    <path
      d="M 5 0 l 5 5 l -5 5 l -5 -5 z"
      :fill="color"
    />
    <text v-if="n" class="no-select"
      x="5" :y="numberYPos"
      font-size="3.5"
      fill="white"
      font-family="Tahoma"
      text-anchor="middle"
      alignment-baseline="middle"
      user-select="none"
    >{{ n }} </text>
  </svg>
</template>

<script>
export default {
  name: 'stone-and-number',
  props: {
    n: {
      type: [ Number, String ],
      required: false,
      default: 5,
    },
    numPosition: {
      type: String,
      required: false,
      default: 'top',
      validator: val => (['top', 'middle','bottom'].includes(val))
    },
    color: {
      type: String,
      required: false,
      default: 'blue',
    }
  },
  computed: {
    numberYPos() {
      if (this.numPosition === 'top') return 5-2.5
      else if (this.numPosition === 'bottom') return 5+2.5
      else return 5
    }
  }
}
</script>

<style scoped>
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>