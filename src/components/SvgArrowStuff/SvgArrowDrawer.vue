<template>
  <g
    @__drag="drag"
    @__drop="drop"
  >
    <rect
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      fill="rgba(0,0,0,0)"
      stroke="none"
    />
    <SvgArrow
      v-if="to"
      :from="from"
      :to="to"
    />
  </g>
</template>

<script>

import SvgArrow from './SvgArrow.vue'

export default {
  components: { SvgArrow },
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 }
  },
  data() {
    return {
      from: null,
      to: null
    }
  },
  methods: {
    drag(event) {
      const {x, y} = event.svg
      if (this.from === null) {
        this.from = {x,y}
        this.$emit('start', {x,y})
      }
      else {
        this.to = {x,y}
        this.$emit('move', {x,y})
      }
    },
    drop() {
      this.from = null
      this.to = null
      this.$emit('end')
    }
  }
}

</script>