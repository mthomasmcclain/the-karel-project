<template>
  <div class="container">
    <div class="left-col">
      <div class="instructions-and-reset-wrapper">
        <div class="instructions-box">
          <b>{{ t('challenge') }}:</b>
          {{ t(task.instructions )}}
          <p v-if="task.maxBlocks" class="max-blocks-p">
            Solve the challenge using <b>{{task.maxBlocks}}</b> or fewer blocks. The current code uses <b :style="`color: ${blocksUsed > task.maxBlocks ? 'red' : 'green'};`">{{ blocksUsed }}</b> blocks.
          </p>
        </div>
        <button
          v-if="!karelBlockly.settings.disabled"
          class="karel-button reset"
          @click="resetTask"
        >{{ t('reset-code') }}</button>
      </div>

      <div class="worlds-wrapper">
        <div class="world-col left">
          <h2> {{ t('start') }}:</h2>
          <KarelWorldRenderer :world="world" key="active-world" />
        </div>
        <div class="world-col right">
          <h2> {{ t('goal') }}:</h2>
          <KarelWorldRenderer :world="activePostWorld" key="goal-world"/>
        </div>
      </div>

      <!-- Scenario Selector, if More Than One -->
      <div v-if="task.worlds.length > 1" class="scenario-selector">
        <div
          v-for="(n,i) in task.worlds"
          :key='`radio-template-${i}`'
          :class="{
            scenario: true,
            active: activeScenarioIndex === i,
            unattempted: correctScenarios[i] === null,
            correct: correctScenarios[i] === true,
            incorrect: correctScenarios[i] === false
          }"
        >
          <input
            type="radio"
            :key="`world-${i}`"
            :id="`world-${i}`"
            :value="i"
            v-model="activeScenarioIndex"
          />
          <label :for="`world-${i}`">{{ getScenarioLabel(i) }}</label>
        </div>
      </div>

      <div class="controls-wrapper">
        <KarelBlocklyPlayerAndControls
          v-if="karelBlockly"
          :toolbox="karelBlockly.toolbox"
          :workspace="karelBlockly.workspace"
          :stepSpeed="stepSpeed"
          :preWorld="activePreWorld"
          :playing="playing"
          @play="playing = true"
          @pause="playing = false"
          @step="currentStepData = $event"
          @setStepSpeed="stepSpeed = $event"
        />
      </div>
      <div>
        <button class="karel-button hint" v-if="task.hint" @click="showHint">{{ t('hint') }}</button>
      </div>
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
import KarelBlocklyPlayerAndControls from './KarelBlocklyPlayerAndControls/index.vue'
import KarelWorldRenderer from '../KarelWorldRenderer.vue'
import KarelBlockly from '../KarelBlockly/index.vue'
import worldsMatch from './karelWorldsMatch.js'
import {
  taskSuccessSwal,
  taskPartialSuccessSwal,
  taskIncorrectSwal,
  taskTooManyBlocksSwal,
  taskHintSwal
} from '../../helpers/projectSwallows.js'
import { injectTranslationsForBlocklyWorkspaceUserMethods } from '../../helpers/translateBlocklyWorkspaceUserMethods.js'
const copy = x => JSON.parse(JSON.stringify(x))


export default {
  name: 'task-player',
  components: {
    KarelBlockly,
    KarelWorldRenderer,
    KarelBlocklyPlayerAndControls
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const task = copy(this.$store.getters.loadedContent()[this.id])

    const { karelBlockly } = task
    karelBlockly.settings.customizerMode = false

    const translationIds = this.$store.state.translationGroups[this.id]
    if (translationIds) {
      const translationMap = translationIds.reduce((acc, id) => {
        return { ...acc, [id]: this.t(id) }
      }, {})
      karelBlockly.workspace = injectTranslationsForBlocklyWorkspaceUserMethods(karelBlockly.workspace, translationMap)
    }

    return {
      karelBlockly,
      currentStepData: null,
      playing: false,
      stepSpeed: 5,
      activeScenarioIndex: 0,
      correctScenarios: new Array(task.worlds.length).fill(null),
    }
  },
  watch: {
    async codeSolvesWorld(isCorrect) {
      if (isCorrect) {
        if (this.task.maxBlocks && this.blocksUsed > this.task.maxBlocks) {
          await taskTooManyBlocksSwal()
          return
        }


        this.correctScenarios[this.activeScenarioIndex] = true
        const incompleteScenarios = this.correctScenarios.filter(d => !d).length
        if (incompleteScenarios) await taskPartialSuccessSwal(incompleteScenarios)        
      }
      else if (this.error) {
        this.correctScenarios[this.activeScenarioIndex] = false
        await taskIncorrectSwal(this.error)
      }
      else if (isCorrect === null) { /* waiting... */ }
      else {
        this.correctScenarios[this.activeScenarioIndex] = false
        await taskIncorrectSwal()
      }
    },
    'karelBlockly.workspace'() {
      this.correctScenarios = new Array(this.task.worlds.length).fill(null)
    },
    'currentStepData.activeBlocks'(blocks) {
      this.karelBlockly = {
        ...this.karelBlockly,
        highlight: JSON.parse(JSON.stringify(blocks || []))
      }
    },
    activeScenarioIndex() {
      this.playing = false
      this.currentStepData = null
    },
    correctScenarios: {
      deep: true,
      async handler(val) {
        if (val.every(val => val)) {
          await taskSuccessSwal()
          // TODO: Think about how to get rid of this delay haaaack
          // which is needed because of sweetaltert using
          // a body style !important to get its transition to work
          await new Promise( res => setTimeout(res, 260))
          this.$emit('taskCorrect')
        }
      }
    }
  },
  computed: {
    task() { return this.$store.getters.loadedContent()[this.id] },
    blocksUsed() { return (this.karelBlockly.workspace.match(/block /g) || []).length },
    activePreWorld() {
      return this.task.worlds[this.activeScenarioIndex].preWorld
    },
    activePostWorld() {
      return this.task.worlds[this.activeScenarioIndex].postWorld
    },
    world() {
      return this.currentStepData ? this.currentStepData.world : this.activePreWorld
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
    codeSolvesWorld() {
        if (!this.codeCompletelyRun) return null
        else if (this.error) return false
        else return worldsMatch(this.currentStepData.world, this.activePostWorld)
    }
  },
  methods: {
    t(target) { return this.$store.getters.translation(target) },
    getScenarioLabel(i) {
      const start = `${this.t('scenario')} ${i+1}: ` // eg: 'Scenario 1:'
      let end = this.t('not-tried')
      if (this.correctScenarios[i]) end = this.t('solved')
      else if (this.correctScenarios[i] === false) end = this.t('not-solved')
      return start + end
    },
    showHint() {
      const { hint } = this.task
      const translatedHint = this.t(hint)
      taskHintSwal(translatedHint)
    },
    resetTask() {
      const { karelBlockly } = this.task
      this.karelBlockly = copy(karelBlockly)
      this.playing = false
      this.currentStepData = null
    }
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
  width: 420px;
  margin: 2px 2px 0 4px;
  display: flex;
  flex-direction: column;
}
.right-col {
  flex-grow: 1;
}
.left-col .instructions-and-reset-wrapper {
  display: flex;
  justify-content: space-between;
}
.tab-wrapper {
  display:flex;
  align-items: center;
  font-size:1.3rem;
  height: 2.6rem;

  width: 100%;
  background: #EEEEEE;
  border-bottom: 1px solid #AAAAAA;
}
.example-label {
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  margin-left: 2px;
  margin-right: 20px;
  padding-left: 4px;
  padding-right: 4px;
}
.example-icon {
  font-size: 0.8rem;
  margin-right: 5px;
}

.karel-button.reset {
  background: darkred;
  height: 36px;
}

.left-col .instructions-box {
  width: 300px;
  background: lightblue;
  border-radius: 6px;
  padding: 10px;
}
.left-col .instructions-box .max-blocks-p {
  background: lightsalmon;
  padding: 6px;
  border-radius: 6px;
  margin: 4px 0 0 0;
}

.left-col .worlds-wrapper {
  display: flex;
  min-height: 300px;
  max-height: 300px;
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
.left-col .karel-button.hint {
  background: purple;
  margin-top: 4px;
}


.scenario-selector {
  display: flex;
}
.scenario {
  margin-right: 20px;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  padding: 0.4rem;
}
.scenario.active {
  font-weight: bold;
}
.scenario.correct {
  background: lightgreen;
}
.scenario.incorrect {
  background: #fcccbc;
}


.kb-select-area {
  display: flex;
  justify-content: flex-end;
}
.kb-select-button {
  cursor: pointer;
  margin: 2px 6px;
  color: #4183c4;
  background-color: #fff;
  border-radius: .25rem;
  padding: .5rem 1rem;
  border: solid #007bff 2px;
}
.kb-select-button.active {
  color: #fff;
  background-color: #007bff;
}
</style>