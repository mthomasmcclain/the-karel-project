<template>

  <div class="karel-map-wrapper">
    
    <div class="navbar">
      <div v-if="taskIsActive"
        class="back-button"
        @click="selected = null"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="map-icon" viewBox="0 0 576 512">
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path d="M560.02 32c-1.96 0-3.98.37-5.96 1.16L384.01 96H384L212 35.28A64.252 64.252 0 00191.76 32c-6.69 0-13.37 1.05-19.81 3.14L20.12 87.95A32.006 32.006 0 000 117.66v346.32C0 473.17 7.53 480 15.99 480c1.96 0 3.97-.37 5.96-1.16L192 416l172 60.71a63.98 63.98 0 0040.05.15l151.83-52.81A31.996 31.996 0 00576 394.34V48.02c0-9.19-7.53-16.02-15.98-16.02zM224 90.42l128 45.19v285.97l-128-45.19V90.42zM48 418.05V129.07l128-44.53v286.2l-.64.23L48 418.05zm480-35.13l-128 44.53V141.26l.64-.24L528 93.95v288.97z"/>
        </svg>
        <div>{{ t('back-to-map') }}</div>
      </div>
      <div v-else
        class="back-button"
        @click="$emit('exit')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="map-icon" viewBox="0 0 576 512">
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path xmlns="http://www.w3.org/2000/svg" d="M567.5 229.7C577.6 238.3 578.9 253.4 570.3 263.5C561.7 273.6 546.6 274.9 536.5 266.3L512 245.5V432C512 476.2 476.2 512 432 512H144C99.82 512 64 476.2 64 432V245.5L39.53 266.3C29.42 274.9 14.28 273.6 5.7 263.5C-2.875 253.4-1.634 238.3 8.473 229.7L272.5 5.7C281.4-1.9 294.6-1.9 303.5 5.7L567.5 229.7zM144 464H192V312C192 289.9 209.9 272 232 272H344C366.1 272 384 289.9 384 312V464H432C449.7 464 464 449.7 464 432V204.8L288 55.47L112 204.8V432C112 449.7 126.3 464 144 464V464zM240 464H336V320H240V464z"/>
        </svg>
        <div>{{ t('back-home') }}</div>
      </div>

      <h3>{{ taskIsActive ? t(graph.nodes[selected].label) : t(name) }}</h3>
      <div></div>
      
    </div>
    
    <div class="content-wrapper" style="flex-grow: 1;">
      <TaskPlayer v-if="taskIsActive && id"
        :key="`task-player-in-map-${selected}`"
        @taskCorrect="handleTaskCorrect"
        :id="activeTask"
      />
      <content
        v-else="!id"
        :content="activeTask"
      />

      <MapGraph v-else class="map-body"
        :graph="graph"
        :selected="selected"
        @selectId="handleNodeSelected"
        :previewMode="previewMode"
      />
    </div>
  </div>
</template>

<script>
import MapGraph from './MapGraph/index.vue'
import TaskPlayer from '../TaskPlayer/index.vue'
import { mapCompleteSwal } from '../../helpers/projectSwallows.js'
const copy = x => JSON.parse(JSON.stringify(x))

export default {
  components: { MapGraph, TaskPlayer },
  props: {
    id: {
      type: String,
      required: false
    },
    previewMode: {
      type: Boolean,
      required: false,
      default: false
    },
    mapConfig: {
      type: Object,
      required: false
    }
  },
  data() {
    //  TODO: always get scope from environment and load content from that id
    let graph
    let name
    if (this.id) {
      const g = this.$store.getters.content(this.id)
      graph = g.graph
      name = g.name
    }
    else {
      graph = this.mapConfig.graph
      name = this.mapConfig.name
    }
    return {
      graph: copy(graph),
      name,
      selected: null
    }
  },
  computed: {
    taskIsActive() {
      return this.selected && this.graph.nodes[this.selected]
    },
    activeTask() {
        if (!this.taskIsActive) return null
        else return this.graph.nodes[this.selected].taskId
    }
  },
  methods: {
    t(target) {
      return this.$store.getters.translation(target)
    },
    handleNodeSelected(id) {
      this.selected = id
      if (this.graph.nodes[id]) this.graph.nodes[id].visited = true
    },
    async handleTaskCorrect() {
      this.$store.dispatch('taskComplete', this.activeTask)
      this.selected = null
      if (this.$store.getters.mapIsComplete(this.id)) {
        await new Promise( res => setTimeout(res, 1000))
        await mapCompleteSwal()
        this.$emit('exit')
      }
    },
    isFrontierNode(id) {
      // is on 'frontier' iff ( not visited AND all immediate predecessors are visited )
      if (this.graph.nodes[id].visited) return false
      else return Object.values(this.graph.edges)
        .filter(({to}) => to === id)
        .map(({from}) => from)
        .every(fromId => this.graph.nodes[fromId] && this.graph.nodes[fromId].visited)
    },
    isAccessible(id) {
      return !this.graph.progressivelyUnlock || this.isFrontierNode(id) || this.graph.nodes[id].visited
    }
  }
}
</script>

<style scoped>
/* TODO: clean out edit based styles */

.karel-map-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.navbar {
  height: 52px;
  padding: 6px;
  background: whitesmoke;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar h3 { margin: 0; }

.navbar .back-button {
  display: flex;
  width: 50px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 6px 12px;
  font-size: 0.9em;
  cursor: pointer;
}
.navbar .back-button svg {
  padding-top:6px;
  padding-bottom: 2px;
  height: 20px;
}

.map-body {
  position: relative;
  flex-grow: 1;
}
.node,
.edge {
  user-select: none;
  position: absolute;
}
.remover,
.edit-task-name-icon {
  cursor: pointer;
  opacity: 0.25;
  transition: opacity 100ms ease-in-out;
}
.remover:hover {
  color: red;
  opacity: 1;
}
.edit-task-name-icon:hover {
  color: blue;
  opacity: 1;
}

.node > span,
.edge > span
{
  cursor: move;
}

.node-wrapper
{
  cursor: pointer;
}

.node-wrapper .remover
{
  opacity: 0;
  position: absolute;
  padding-left: 10px;
  left: 0;
  top: 0;
}
.node-wrapper .edit-task-name-icon {
  opacity: 0;
  position: absolute;
  padding-left: 10px;
  left: -15px;
  top: 0;
}
.node-wrapper:hover .remover,
.node-wrapper:hover .edit-task-name-icon
{
  opacity: 1;
}
.node-wrapper.selected {
  border: 1px solid green;
}

</style>