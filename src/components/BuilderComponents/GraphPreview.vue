<template>
  <svg
    :viewBox="`${-padding} ${-padding} ${width + 2*padding} ${height + 2*padding}`"
    style="width: 100%; height: 100%;"
  >
    <circle
      v-for="({ x, y},i) in Object.values(graph.nodes)" :key="`graph-circle-${i}`"
      :cx="x - minX"
      :cy="y - minY"
      r="50"
      fill="orange"
    />
    <SvgArrow
      v-for="[id, { from, to }] in Object.entries(graph.edges)" :key="`edge-${id}`"
      :strokeWidth="5"
      :from="offset(graph.nodes[from])"
      :to="offset(graph.nodes[to])"
    />
  </svg>
</template>

<script>

import SvgArrow from '../SvgArrowStuff/SvgArrow.vue'

export default {
  components: { SvgArrow },
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      padding: 100
    }
  },
  computed: {
    width() {
      return this.getDimensionLength('x')
    },
    height() {
      return this.getDimensionLength('y')
    },
    minX() {
      return this.getDimension('min', 'x')
    },
    minY() {
      return this.getDimension('min', 'y')
    }
  },
  methods: {
    getDimension(minMax, dimension) {
      return (
        Object
          .values(this.graph.nodes)
          .reduce(
            (acc, n) => Math[minMax](acc, n[dimension]),
            minMax === 'min' ? Infinity : -Infinity
          )
      )
    },
    offset({x, y}) {
      return { x: x - this.minX, y: y - this.minY, w: 100, h: 100 }
    },
    getDimensionLength(dimension) {
      return this.getDimension('max', dimension) - this.getDimension('min', dimension)
    }
  }
}

</script>