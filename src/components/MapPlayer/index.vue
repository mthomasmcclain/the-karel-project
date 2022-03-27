<template>

  <div class="karel-map-wrapper">
    
    <div class="navbar">
      <div v-if="taskIsActive"
        class="back-button"
        @click="graph.selected = null"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="map-icon" viewBox="0 0 576 512">
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path d="M560.02 32c-1.96 0-3.98.37-5.96 1.16L384.01 96H384L212 35.28A64.252 64.252 0 00191.76 32c-6.69 0-13.37 1.05-19.81 3.14L20.12 87.95A32.006 32.006 0 000 117.66v346.32C0 473.17 7.53 480 15.99 480c1.96 0 3.97-.37 5.96-1.16L192 416l172 60.71a63.98 63.98 0 0040.05.15l151.83-52.81A31.996 31.996 0 00576 394.34V48.02c0-9.19-7.53-16.02-15.98-16.02zM224 90.42l128 45.19v285.97l-128-45.19V90.42zM48 418.05V129.07l128-44.53v286.2l-.64.23L48 418.05zm480-35.13l-128 44.53V141.26l.64-.24L528 93.95v288.97z"/>
        </svg>
        <div>Back</div><div>to Map</div>
      </div>
      <div v-else
        class="back-button"
        @click="$emit('exitMap')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="map-icon" viewBox="0 0 576 512">
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path xmlns="http://www.w3.org/2000/svg" d="M567.5 229.7C577.6 238.3 578.9 253.4 570.3 263.5C561.7 273.6 546.6 274.9 536.5 266.3L512 245.5V432C512 476.2 476.2 512 432 512H144C99.82 512 64 476.2 64 432V245.5L39.53 266.3C29.42 274.9 14.28 273.6 5.7 263.5C-2.875 253.4-1.634 238.3 8.473 229.7L272.5 5.7C281.4-1.9 294.6-1.9 303.5 5.7L567.5 229.7zM144 464H192V312C192 289.9 209.9 272 232 272H344C366.1 272 384 289.9 384 312V464H432C449.7 464 464 449.7 464 432V204.8L288 55.47L112 204.8V432C112 449.7 126.3 464 144 464V464zM240 464H336V320H240V464z"/>
        </svg>
        <div>Back</div><div>Home</div>
      </div>

      <h3>{{ taskIsActive ? graph.nodes[graph.selected].label : name }}</h3>
      <div></div>
      
    </div>
    
    <TaskPlayer v-if="taskIsActive"
      :key="`task-player-in-map-${graph.selected}`"
      @taskCorrect="handleTaskCorrect"
      :id="activeTask"
    />

    <MapGraph v-else class="map-body"
        :graph="graph"
        @selectId="handleNodeSelected"
    />

  </div>
</template>

<script>
import MapGraph from './MapGraph'
import TaskPlayer from '@/components/TaskPlayer'

export default {
  components: { MapGraph, TaskPlayer },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const { graph, name } = this.$store.getters.map(this.id)
    return { graph, name }
  },
  computed: {
    taskIsActive() {
      return this.graph.selected && this.graph.nodes[this.graph.selected]
    },
    activeTask() {
        if (!this.taskIsActive) return null
        else return this.graph.nodes[this.graph.selected].content
    }
  },
  methods: {
    openContent(id) {
      if (this.isAccessible(id)) this.graph.selected = id
    },
    handleNodeSelected(id) {
      this.graph.selected = id
      if (this.graph.nodes[id]) this.graph.nodes[id].visited = true
    },
    handleTaskCorrect() {
      this.$store.commit('taskComplete', this.activeTask)
      this.graph.selected = null
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
  width: 100%; height: 100%;
  font-family: 'Nunito', sans-serif;
  color: #5d5d5d;
  fill: #5d5d5d;

  display: flex;
  flex-direction: column;
}
.navbar {
  height: 52px;
  padding: 6px;
  background: #e5e5e5;

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
.underlay {
  width: 100%;
  height: 100%;
  display: block;
}
</style>