<template>
  <div class="container">
    
    <div class="left-col">
      <div class="instructions-box">
        <b>Challenge:</b> {{ task.instructions }}
      </div>
      <div class="worlds-wrapper">
        <div class="world-col left">
          <h2>Start:</h2>
          <KarelWorldRenderer :world="world" key="active-world" />
        </div>
        <div class="world-col right">
          <h2>Goal:</h2>
          <KarelWorldRenderer :world="task.postWorld" key="goal-world"/>
        </div>
      </div>
      <div class="controls-wrapper">
        <KarelBlocklyPlayerAndControls
          v-if="karelBlockly"
          :toolbox="karelBlockly.toolbox"
          :workspace="karelBlockly.workspace"
          :stepSpeed="stepSpeed"
          :preWorld="task.preWorld"
          :playing="playing"
          @play="playing = true"
          @pause="playing = false"
          @step="currentStepData = $event"
          @setStepSpeed="stepSpeed = $event"
        />
      </div>
      <button class="hint-button" v-if="task.hint" @click="showHint">hint</button>
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
import KarelBlocklyPlayerAndControls from './KarelBlocklyPlayerAndControls'
import KarelWorldRenderer from '@/components/KarelWorldRenderer'
import KarelBlockly from '@/components/KarelBlockly'
import worldsMatch from './karelWorldsMatch'
import { taskSuccessSwal, taskIncorrectSwal, taskHintSwal } from '@/helpers/projectSwallows'
const copy = x => JSON.parse(JSON.stringify(x))

export default {
  components: { KarelBlockly, KarelWorldRenderer, KarelBlocklyPlayerAndControls },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const { karelBlockly } = this.$store.getters.task(this.id)
    return {
      karelBlockly: copy(karelBlockly),
      currentStepData: null,
      playing: false,
      stepSpeed: 5,
    }
  },
  watch: {
    async codeCorrect(isCorrect) {
      if (isCorrect) {
        await taskSuccessSwal()
        // TODO: Think about how to get rid of this delay haaaack
        // which is needed because of sweetaltert using
        // a body style !important to get its transition to work
        await new Promise( res => setTimeout(res, 150))
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
    task() { return this.$store.getters.task(this.id) },

    world() {
      return this.currentStepData ? this.currentStepData.world : this.task.preWorld
    },
    codeCompletelyRun() {
      if (this.currentStepData) {
        const { isDone, error } = this.currentStepData
        return !!(isDone || error)
      }
      else return false
    },
    error() {
      return this.currentStepData ? this.currentStepData.error : null
    },
    codeCorrect() {
        if (!this.codeCompletelyRun) return null
        else if (this.error) return false
        else return worldsMatch(this.currentStepData.world, this.task.postWorld)
    }
  },
  methods: {
    showHint() { taskHintSwal(this.task.hint) }
  },
}
</script>

<style scoped>
.container {
  display: flex;
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