<template>

  <div class="karel-map-wrapper"
    :ref="el => {
      if (!el) return
      width = el.clientWidth
      height = el.clientHeight
    }"
    @dragover="handleDragover"
    @drop="handleDrop"
    @click="$emit('selectId', null)"
  >
    <svg
      class="underlay"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <SVGArrowDrawer
        v-if="!uneditable"
        :width="width"
        :height="height"
        @start="setPotentialStartNode"
        @move="setPotentialEndNode"
        @end="addDrawnEdge"
      />
      <SVGArrow
        v-for="[id, { from, to }] in Object.entries(edges)"
        :key="id"
        :from="nodes[from]"
        :to="nodes[to]"
        :highlighted="selected === id || (from === newFromNode && to === newToNode)"
        @click.stop="$emit('selectId', uneditable ? null : id)"
      />
    </svg>

    <div
      class="node-wrapper"
      v-for="([nodeId, { x, y, w, h, content, visited, correct, label='loading...' }]) in Object.entries(nodes)"
      :key="nodeId"
      :ref="el => trackSize(el, nodes[nodeId])"
      :style="{ position: 'absolute', left: `${Math.round(x - w/2)}px`, top: `${Math.round(y - h/2)}px` }"
      :draggable="!uneditable"
      @dragstart="event => event.dataTransfer.setData('text/plain', content)"
      @mousedown.stop
      @click.stop="handleNodeClick(nodeId)"
    >
      <IconAndName class="icon-and-name"
        :label="label"
        :locked="!isAccessible(nodeId)"
        :correct="correct"
        :highlighted="nodeId === newFromNode || nodeId === newToNode || selected === nodeId"
        :activeColor="visited ? 'gainsboro' : 'orange'"
      />
    </div>
  </div>
</template>

<script>
import { v1 as uuid } from 'uuid'
import SVGArrow from './SVGArrow'
import SVGArrowDrawer from './SVGArrowDrawer'
import Swal from 'sweetalert2'
import IconAndName from './IconAndNameForMap'

const isUUID = x => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x)
const distanceSq = (a, b) => Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
const closest = (set, pos) => {
  const ids = Object.keys(set)
  let cid = null
  let cd = Infinity
  ids.forEach(id => {
    const d = distanceSq(set[id], pos)
    if (d < cd) {
      cd = d
      cid = id
    }
  })
  return cid
}

export default {
  components: { SVGArrow, SVGArrowDrawer, IconAndName },
  props: [ 'graph' ],
  data() {
    return {
      width: 0,
      height: 0,
      edges: this.graph.edges,
      nodes: this.graph.nodes,
      uneditable: true,
      selected: null,
      newFromNode: this.graph.newFromNode,
      newToNode: this.graph.newToNode,
      progressivelyUnlock: this.graph.progressivelyUnlock
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
    window.addEventListener('resize', this.handleResize)
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.height = window.innerHeight
      this.width = window.innerWidth
    },
    handleNodeClick(nodeId) {
      if (!this.uneditable || this.isAccessible(nodeId)) this.$emit('selectId', nodeId)
      else this.$emit('selectId', null)
    },
    handleKeydown(event) {
      if (this.uneditable) return

      if (['Backspace', 'Delete'].includes(event.key)) {
        delete this.edges[this.selected]
        if (this.nodes[this.selected]) {
          Object
            .entries(this.edges)
            .filter(([ , { to, from}]) => to === this.selected || from === this.selected)
            .forEach(([id]) => delete this.edges[id])
          delete this.nodes[this.selected]
        }
      }
    },
    isFrontierNode(id) {
      // is on 'frontier' iff ( (a) not visited AND (b) all immediate predecessors are visited )
      if (this.nodes[id].visisted) return false
      else return Object.values(this.edges)
          .filter(({to}) => to === id)
          .map(({from}) => from)
          .every(fromId => this.nodes[fromId] && this.nodes[fromId].visited)
    },
    isAccessible(id) {
      return !this.progressivelyUnlock || this.isFrontierNode(id) || this.nodes[id].visited
    },
    handleDragover(event) {
      if (this.uneditable) return
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },
    async handleDrop({ x, y, currentTarget, dataTransfer }) {
      const content = dataTransfer.getData("text/plain")

      if (!isUUID(content)) return alert('Unknown drop type.')

      const { left, top } = currentTarget.getBoundingClientRect()

      x -= left
      y -= top

      //  TODO: if Control/Alt is pressed, allow copy of referenced content into nodes

      const existingReference = Object.values(this.nodes).find(ref => ref.content === content)
      if (existingReference) Object.assign(existingReference, {x,y})
      else {
        this.nodes[uuid()] = {
          content, x, y,
          w: 0, h: 0,
          state: null,
          visited: false,
          correct: false,
        }
      }
    },
    removeNode(id) {
      if (Object.values(this.edges).some(({ to, from }) => to === id || from === id)) {
        Swal.fire('Cannot Delete Task', 'You must remove all connections before removing a task.', 'warning')
      }
      else delete this.nodes[id]
    },
    setPotentialStartNode(pos) {
      this.newFromNode = closest(this.nodes, pos)
    },
    setPotentialEndNode(pos) {
      this.newToNode = closest(this.nodes, pos)
    },
    removeEdge(id) {
      delete this.edges[id]
    },
    edgeExists(f, t) {
      return Object.values(this.edges).some(({ from, to }) => from === f && to === t )
    },
    addDrawnEdge() {
      const from = this.newFromNode
      const to = this.newToNode
      if ( from && to && from !== to && !this.edgeExists(from, to)) {
        this.edges[uuid()] = { from, to }
      }
      this.newFromNode = null
      this.newToNode = null
    },
    trackSize(el, item) {
      if (!item || !el) return

      const w = el.clientWidth
      const h = el.clientHeight
      //  element dimensions can sometimes vary slightly based on positioning on screen
      //  this thresholding prevents infinite reactive update loops
      const threshold = 2
      if (Math.abs(item.w - w) > threshold || Math.abs(item.h - h) > threshold ) {
        item.w = w
        item.h = h
      }
    }
  }
}
</script>

<style scoped>
.karel-map-wrapper {
  width: 100%; height: 100%;
  font-family: 'Nunito', sans-serif;
  color: #5d5d5d;
}
.node,
.edge
{
  user-select: none;
  position: absolute;
}
.node-wrapper
{
  cursor: pointer;
}
.underlay
{
  width: 100%;
  height: 100%;
  display: block;
}
</style>