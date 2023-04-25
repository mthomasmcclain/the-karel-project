<template>
  <g ref="outerSvg">
    <slot />
  </g> 
</template>

<script>
const validateAnchor = val => [
  'left top', 'center top', 'right top',
  'left center', 'center center', 'right center',
  'left bottom', 'center bottom', 'right bottom'
].includes(val)
  
export default {
  name: 'svg-positioner',
  props: {
    w: { // computed from h if absent.... does not support width as %
      required: false,
      type: [ Number, String ],
    },
    h: { // computed from w if absent .... does not support height as %
      required: false,
      type: [ Number, String ]
    },
    xPos: {
      required: false,
      default: 0,
      type: [ Number, String ],
    },
    yPos: {
      required: false,
      default: 0,
      type: [ Number, String ],
    },
    anchor: {
      required: false,
      default: 'left top',
      type: String,
      validator: validateAnchor
    },
    rotation: {
      required: false,
      type: [ String, Number ],
      default: 0,
    },
    rotationAnchor: {
      required: false,
      // no default prop, use anchor if absent
      type: String,
      validator: validateAnchor
    },
  },
  mounted() { this.setSvg() },
  watch: {
    '$props': {
        deep: true,
        handler() { this.setSvg() }
      }
  },
  computed: {
    finalWidth() {
      // if no w or h passed, set to 100
      // if no w passed, get from passed h
      if (this.w === undefined && this.h === undefined) {
        return 100
      } else if (this.w === undefined) {
        return parseFloat(this.h) * (this.viewBox.w / this.viewBox.h)
      } else { // if passed, set to prop
        return parseFloat(this.w)
      }
    },
    finalHeight() {
      // if no w or h passed, set to 100
      // if no h passed, get from passed w
      if (this.w === undefined && this.h === undefined) {
        return 100
      } else if (this.h === undefined) {
        return parseFloat(this.w) * (this.viewBox.h / this.viewBox.w)
      } else { // if passed, set to prop
        return parseFloat(this.h)
      }
    },
  },
  data() {
    return {
      viewBox: { x:0, y:0, w:0, h:0 }, // set on mounted
    }
  },
  methods: {
    setSvg() {
      const el = this.$refs.outerSvg
      const innerSvg = el.querySelector('svg')
      if (!innerSvg) throw new Error('svg element must be put into svg-positioner slot')

      const vb = innerSvg.getAttribute('viewBox')
      const [ x, y, w, h ] = vb.split(/\s+/).map(el => parseInt(el))
      this.viewBox = { x, y, w, h }
      const offsets = this.getOffsetsFromAnchor(this.anchor)      

      innerSvg.setAttribute('x', this.xPos + offsets.x)
      innerSvg.setAttribute('y', this.yPos + offsets.y)
      innerSvg.setAttribute('width', this.finalWidth)
      innerSvg.setAttribute('height', this.finalHeight)

      // set rotation on wrapping <g>, not inner <svg>
      let diffBtwOffsets
      if (!this.rotationAnchor) {
        diffBtwOffsets = { x: 0, y: 0 }
      } else {
        const posOffset = this.getOffsetsFromAnchor(this.anchor)
        const rotOffset = this.getOffsetsFromAnchor(this.rotationAnchor)
        diffBtwOffsets = {
          x: rotOffset.x - posOffset.x,
          y: rotOffset.y - posOffset.y
        }
      }
      el.setAttribute('transform-origin', `${this.xPos - diffBtwOffsets.x} ${this.yPos - diffBtwOffsets.y}`)
      el.setAttribute('transform', `rotate(${this.rotation})`)
      
    },
    getOffsetsFromAnchor(anchor) {
      let x, y
      const xAnchor = anchor.split(' ')[0] // 'left' 'center' or 'right'
      const yAnchor = anchor.split(' ')[1]  // 'top' 'center' or 'bottom'
      
      if (xAnchor === 'right') {
        x = -1*this.finalWidth
      } else if (xAnchor === 'center') {
        x = (-1/2)*this.finalWidth
      } else {
        x = 0 // default 0 for left
      }

      if (yAnchor === 'bottom') {
        y = -1*this.finalHeight
      } else if (yAnchor === 'center') {
        y = (-1/2)*this.finalHeight
      } else {
        y = 0 // default 0 for top
      }
      return { x, y }
    }
  },
}
</script>