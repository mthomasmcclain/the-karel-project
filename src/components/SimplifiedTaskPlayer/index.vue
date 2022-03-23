<template>
  <div class="container">
    
    <div class="left-col">
      <div class="instructions-box">
        <b>Challenge:</b> {{ instructions }}
      </div>
      <div class="worlds-wrapper">
        <div class="world-col left">
          <h2>Start:</h2>
          <KarelWorldRenderer :world="world" key="active-world" />
        </div>
        <div class="world-col right">
          <h2>Goal:</h2>
          <KarelWorldRenderer :world="postWorld" key="goal-world"/>
        </div>
      </div>
      <div class="controls-wrapper">
        <KarelBlocklyPlayerAndControls
          v-if="karelBlockly"
          :toolbox="karelBlockly.toolbox"
          :workspace="karelBlockly.workspace"
          :stepSpeed="stepSpeed"
          :preWorld="preWorld"
          :playing="playing"
          @play="playing = true"
          @pause="playing = false"
          @step="currentStepData = $event"
          @setStepSpeed="stepSpeed = $event"
        />
      </div>
      <button class="hint-button" v-if="hint" @click="showHint">hint</button>
    </div>

    <div class="right-col">
      <KarelBlockly
        v-model:toolbox="karelBlockly.toolbox"
        v-model:workspace="karelBlockly.workspace"
        v-model:settings="karelBlockly.settings"
        v-model:highlight="karelBlockly.highlight"
      />
    </div>
   
  </div>
</template>

<script>
import KarelBlocklyPlayerAndControls from '@/components/KarelBlocklyPlayerAndControls'
import KarelWorldRenderer from '@/components/KarelWorldRenderer'
import KarelBlockly from '@/components/KarelBlockly'
import worldsMatch from './karelWorldsMatch'
import { taskSuccessSwal, taskIncorrectSwal, taskHintSwal } from './karelTaskAndMapSwallows'

const copy = value => JSON.parse(JSON.stringify(value))

export default {
  components: { KarelBlockly, KarelWorldRenderer, KarelBlocklyPlayerAndControls },
  props: [
    'name',
    'preWorld',
    'postWorld',
    'instructions',
    'hint',
    'hideToolbox',
    'maxBlocks',
    'initialWorkspace',
    'initialToolbox',
    'initialSettings'
  ],
  data() {
    return {
      karelBlockly: {
        workspace: this.initialWorkspace,
        toolbox: this.initialToolbox,
        settings: this.initialSettings,
        highlight: []
      },
      currentStepData: null,
      playing: false,
      stepSpeed: 5,
    }
  },
  watch: {
    async codeCorrect(isCorrect) {
      if (isCorrect) {
        await taskSuccessSwal()
        this.$emit('taskCorrect')
      }
      else if (this.error) await taskIncorrectSwal(this.error)
      else if (isCorrect === null) { /* waiting... */ }
      else await taskIncorrectSwal()
    },
    'currentStepData.activeBlocks'(blocks) {
      this.karelBlockly = {
        ...this.karelBlockly,
        highlight: JSON.parse(JSON.stringify(blocks || []))
      }
    }
  },
  computed: {
    world: {
      get() {
        if (this.currentStepData) return this.currentStepData.world
        else return this.preWorld
      },
      set() {}
    },
    codeCompletelyRun() {
      if (this.currentStepData) {
        const { isDone, error } = this.currentStepData
        return !!(isDone || error)
      }
      else return false
    },
    error() {
      if (this.currentStepData) return this.currentStepData.error
      else return null
    },
    codeCorrect() {
        if (!this.codeCompletelyRun) return null
        else if (this.error) return false
        else return worldsMatch(this.currentStepData.world, this.postWorld)
    }
  },
  methods: {
    showHint() { taskHintSwal(this.hint ) }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  color: #5d5d5d;
  font-family: Nunito, Helvetica, sans-serif;
  width: 100%;
  height: 100%;
}
.left-col {
  flex: 2 0 400px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
}
.right-col {
  flex: 1 0 400px;
}

.left-col .instructions-box {
  width: 300px;
  background: lightblue;
  border-radius: 6px;
  padding: 10px;
}
.left-col .worlds-wrapper {
  display: flex;
  min-height: 300px;
  margin: 10px 0;
}
.left-col .world-col {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.left-col .world-col.left {
  margin-right: 6px;
}
.left-col .world-col.right {
  margin-left: 6px;
}
.left-col .world-col h2 {
  margin: 0 0 6px 0;
}
.left-col .world-col > div {
  flex-grow: 1;
}
.left-col .controls-wrapper {
  height: 82px;
}
.left-col .hint-button {
  background: purple;
  color: white;
  width: 70px;
  height: 30px;
  margin: 6px;
  border-radius: 6px;
  border: none;
  font-size: 0.9em;
}
</style>