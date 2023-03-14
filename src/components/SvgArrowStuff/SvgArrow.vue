<template>
  <g>
    <defs>
      <marker
        :id="uniqueId"
        markerWidth="10"
        markerHeight="7"
        refX="8"
        refY="3.5"
        orient="auto"
        :fill="color"
      >
        <polygon points="0 0, 10 3.5, 0 7" />
      </marker>
    </defs>
    <path
      :d="`
        M ${fromPt.x - normal.x * 8 } ${ fromPt.y - normal.y * 8 }
        L ${fromPt.x + normal.x * 8 } ${ fromPt.y + normal.y * 8}
        L ${toPt.x + normal.x * 8 } ${ toPt.y + normal.y * 8 }
        L ${toPt.x - normal.x * 8 } ${ toPt.y - normal.y * 8}
        Z
      `"
      :fill="`rgba(0,0,0,${ highlighted ? 0.1 : 0 })`"
    />
    <line
      :x1="fromPt.x"
      :y1="fromPt.y"
      :x2="toPt.x"
      :y2="toPt.y"
      :stroke="color"
      :stroke-width="strokeWidth"
      :marker-end="`url(#${uniqueId})`" 
    />
  </g>
</template>

<script>
import { v1 as uuid } from 'uuid'
import minimumAreaEllipseIntersections from './minimumAreaEllipseIntersections.js'

const dist2 = ({x:x1, y:y1}, {x:x2, y:y2}) => (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)
const closest = (pts, pt) => {
  let closestPt = null
  let closestDistance = Infinity
  pts.forEach(p => {
    const dist = dist2(p, pt)
    if (dist < closestDistance) {
      closestPt = p
      closestDistance = dist
    }
  })
  return closestPt
}

export default {
  props: {
    from: {
      type: Object,
      required: true
    },
    to: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: 'black'
    },
    highlighted: {
      type: Boolean,
      default: false
    },
    strokeWidth: {
      type: Number,
      default: 1
    }
  },
  data() {
    return { uniqueId: uuid() }
  },
  computed: {
    slope() {
      const {x:x1, y:y1} = this.from
      const {x:x2, y:y2} = this.to
      return (y2-y1)/(x2-x1)
    },
    normal() {
      let x = this.to.x - this.from.x
      let y = this.to.y - this.from.y

      if (x+y === 0) return {x:0,y:1}

      const length = Math.sqrt(x*x + y*y)

      x /= length
      y /= length

      return { x:y, y:-x }
    },
    fromPt() {
      const {x:x0, y:y0, w, h} = this.from
      if (isNaN(w) || isNaN(h)) return this.from
      const intersections = minimumAreaEllipseIntersections(Math.max(w, 8), Math.max(h, 8), this.slope)
      const pt = {
        x: this.to.x - x0,
        y: this.to.y - y0
      }
      const { x, y } = closest(intersections, pt)
      return { x: x0 + x, y: y0 + y }
    },
    toPt() {
      const {x:x0, y:y0, w, h} = this.to
      if (isNaN(w) || isNaN(h)) return this.to
      const intersections = minimumAreaEllipseIntersections(Math.max(w, 8), Math.max(h, 8), this.slope)
      const pt = {
        x: this.from.x - x0,
        y: this.from.y - y0
      }
      const { x, y } = closest(intersections, pt)
      return { x: x0 + x, y: y0 + y }
    }
  }
}

</script>