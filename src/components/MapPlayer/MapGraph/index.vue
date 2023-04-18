<template>

  <div class="karel-map-wrapper"
    ref="wrapper"
    @dragover="handleDragover"
    @drop="handleDrop"
    @click="$emit('selectId', null)"
  >
    <svg
      class="underlay"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <SvgArrowDrawer
        v-if="editMode"
        :width="width"
        :height="height"
        @start="setPotentialStartNode"
        @move="setPotentialEndNode"
        @end="addDrawnEdge"
      />
      <SvgArrow
        v-for="[id, { from, to }] in Object.entries(edges)"
        :key="`edge-arrow-${id}`"
        :from="nodes[from]"
        :to="nodes[to]"
        :highlighted="selected === id || (from === newFromNode && to === newToNode)"
        @click.stop="$emit('selectId', editMode ? id : null)"
      />
    </svg>

    <div
      class="node-wrapper"
      v-for="([nodeId, { x, y, w, h, taskId, visited, label }]) in Object.entries(nodes)"
      :key="nodeId"
      :ref="el => trackSize(el, nodes[nodeId])"
      :style="{ position: 'absolute', left: `${Math.round(x - w/2)}px`, top: `${Math.round(y - h/2)}px` }"
      :draggable="editMode"
      @dragstart="event => event.dataTransfer.setData('text/plain', taskId)"
      @mousedown.stop
      @click.stop="handleNodeClick(nodeId)"
    >
      <IconAndName class="icon-and-name"
        :label="t(label)"
        :locked="!isAccessible(nodeId)"
        :correct="editMode || previewMode ? undefined : taskAtNodeIsCorrect(nodeId)"
        :highlighted="nodeId === newFromNode || nodeId === newToNode || selected === nodeId"
        :activeColor="visited ? 'gainsboro' : 'orange'"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import SvgArrow from '../../SvgArrowStuff/SvgArrow.vue'
import SvgArrowDrawer from '../../SvgArrowStuff/SvgArrowDrawer.vue'
import Swal from 'sweetalert2'
import IconAndName from './IconAndNameForMap.vue'

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

const copy = x => JSON.parse(JSON.stringify(x))

export default {
  components: { SvgArrow, SvgArrowDrawer, IconAndName },
  props: {
    graph: {
      type: Object,
      required: true,
    },
    editMode: {
      type: Boolean,
      required: false,
      default: false
    },
    selected: {
      type: String || null,
      required: false,
      default: null
    },
    previewMode: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      edges: copy(this.graph.edges),
      nodes: copy(this.graph.nodes),
      newFromNode: null,
      newToNode: null,
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('keydown', this.handleKeydown)
    window.addEventListener('resize', this.handleResize)
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    graph(val) {
      this.edges = copy(val.edges)
      this.nodes = copy(val.nodes)
    }
  },
  methods: {
    t(target) {
      return this.$store.getters.translation(target)
    },
    emitChange() {
      this.$emit('change', {
        edges: this.edges,
        nodes: this.nodes,
      })
    },
    taskAtNodeIsCorrect(nodeId) {
      const taskId = this.graph.nodes[nodeId].taskId

      //  TODO: use something like an analyzer when we're rendering on the core
      if (this.$store) return this.$store.getters.taskIsComplete(taskId)
      else return false
    },
    handleResize() {
      this.height = this.$refs.wrapper.clientHeight
      this.width = this.$refs.wrapper.clientWidth
    },
    handleNodeClick(nodeId) {
      if (this.editMode) {
        this.$emit('selectId', this.selected === nodeId ? null : nodeId)
      } else { // play mode
        if (this.isAccessible(nodeId)) this.$emit('selectId', nodeId)
      }
    },
    handleKeydown(event) {
      if (!this.editMode) return

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
      this.emitChange()
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
      return this.isFrontierNode(id) || this.nodes[id].visited
    },
    handleDragover(event) {
      if (!this.editMode) return
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },
    async handleDrop({ x, y, currentTarget, dataTransfer }) {
      if (!this.editMode) return
      const taskId = dataTransfer.getData("text/plain")
      if (!isUUID(taskId)) return alert('Unknown drop type.')
      
      const { left, top } = currentTarget.getBoundingClientRect()
      x -= left
      y -= top
      //  TODO: if Control/Alt is pressed, allow copy of referenced taskId into nodes
      const existingReference = Object.values(this.nodes).find(ref => ref.taskId === taskId)
      if (existingReference) Object.assign(existingReference, {x,y})
      else {
        const node = {
          taskId, x, y,
          w: 0, h: 0,
          visited: false
        }
        node.label = this.$store.getters.name(taskId) // this writes the raw uuid, do not translate

        this.nodes[uuid()] = node
      }
      this.emitChange()
    },
    removeNode(id) {
      if (Object.values(this.edges).some(({ to, from }) => to === id || from === id)) {
        Swal.fire('Cannot Delete Task', 'You must remove all connections before removing a task.', 'warning')
      }
      else delete this.nodes[id]
      this.emitChange()
    },
    setPotentialStartNode(pos) {
      this.newFromNode = closest(this.nodes, pos)
    },
    setPotentialEndNode(pos) {
      this.newToNode = closest(this.nodes, pos)
    },
    removeEdge(id) {
      delete this.edges[id]
      this.emitChange()
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
      this.emitChange()
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
  width: 100%;
  height: 100%;
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