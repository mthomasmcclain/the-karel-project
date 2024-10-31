 <template>

  <div
    v-if="task"
    :class="{
      container: true,
      mobileCodeMode: mobileCodeMode
    }"
  >
  <!-- mobileCodeMode class only used inside small screen media query... that's why we don't need mobileScreen and mobileCodeMode -->
    <div class="left-col" @click="closeMobileCodeMode">
      <div class="pulse-icon-wrapper magnify">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
      </div>  <!-- Only mobile and code mode -->
      <div class="instructions-and-reset-wrapper">
        <div class="instructions-box">
          <b>{{ t('challenge') }}:</b> {{ localT(task.instructions) }}
          <p v-if="task.maxBlocks" class="max-blocks-p">
            Solve the challenge using <b>{{task.maxBlocks}}</b> or fewer blocks. The current code uses <b :style="`color: ${blocksUsed > task.maxBlocks ? 'red' : 'green'};`">{{ blocksUsed }}</b> blocks.
          </p>
        </div>
        <button v-if="!karelBlockly?.settings.disabled" class="karel-button reset" @click="resetTask">{{ t('reset-code') }}</button>
      </div>

      <div class="worlds-wrapper">
        <div class="world-col left">
          <h2>{{ t('start') }}:</h2>
          <KarelWorldRenderer :world="world" key="active-world" />
        </div>
        <div class="world-col right">
          <h2>{{ t('goal') }}:</h2>
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
          style="flex-direction: row;"
          v-if="karelBlockly"
          :toolbox="karelBlockly.toolbox"
          :workspace="karelBlockly.workspace"
          :stepSpeed="stepSpeed"
          :preWorld="activePreWorld"
          :playing="playing"
          @play="startPlaying"
          @pause="playing = false"
          @step="currentStepData = $event"
          @setStepSpeed="stepSpeed = $event"
        />
      </div>
      <div>
        <button class="karel-button hint" v-if="task.hint" @click="showHint">
          {{ t('hint') }}
        </button>
      </div>
    </div>

    <div class="right-col" @click="openMobileCodeMode">
      <div class="mask">
        <div class="pulse-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </div>
      </div>
      <KarelBlockly
        v-if="karelBlockly"
        v-model:toolbox="karelBlockly.toolbox"
        v-model:workspace="karelBlockly.workspace"
        v-model:settings="karelBlockly.settings"
        v-model:highlight="karelBlockly.highlight"
      />
    </div>
  </div>
  <div v-else> ... {{ t('loading') }} ... </div>
</template>

<script>
import { validate as isUUID } from 'uuid'
import KarelBlocklyPlayerAndControls from './KarelBlocklyPlayerAndControls/index.vue'
import KarelWorldRenderer from '../KarelWorldRenderer.vue'
import KarelBlockly from '../KarelBlockly/index.vue'
import worldsMatch from './karelWorldsMatch.js'
import translateGroupInLanguage from '../../helpers/translateGroupInLanguage.js'
import { karelBlocklyTranslateUUIDs } from '../../store/karelBlocklyUserMethodsToUUID.js'
import {
  taskSuccessSwal,
  taskPartialSuccessSwal,
  taskIncorrectSwal,
  taskTooManyBlocksSwal,
  taskHintSwal
} from '../../helpers/projectSwallows.js'

const copy = x => JSON.parse(JSON.stringify(x))


export default {
  name: 'task-player',
  components: { KarelBlockly, KarelWorldRenderer, KarelBlocklyPlayerAndControls },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      task: null,
      karelBlockly: null,
      currentStepData: null,
      playing: false,
      stepSpeed: 5,
      hintUsed: false,
      activeScenarioIndex: 0,
      correctScenarios: null ,

      mobileScreen: false,
      mobileCodeMode: false,
      localTranslationMap: {}
    }
  },
  async created() {

    if (!this.task) {
      const task = await Agent.state(this.id)
      this.karelBlockly = copy(task.karelBlockly)
      this.task = copy(task)
      this.karelBlockly.settings.customizerMode = false
      this.correctScenarios = new Array(task.worlds.length).fill(null)
    }

    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    const language = this.$store.getters.language()
    this.localTranslationMap  = await translateGroupInLanguage(this.id, language)
    this.karelBlockly = await karelBlocklyTranslateUUIDs(this.karelBlockly, this.localTranslationMap)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    async codeSolvesWorld(isCorrect) {
      if (isCorrect) {
        if (this.task.maxBlocks && this.blocksUsed > this.task.maxBlocks) {
          await taskTooManyBlocksSwal(this.t)
          return
        }
        this.correctScenarios[this.activeScenarioIndex] = true
        const incompleteScenarios = this.correctScenarios.filter(d => !d).length
        if (incompleteScenarios) await taskPartialSuccessSwal(this.t)        
      }
      else if (this.error) {
        this.correctScenarios[this.activeScenarioIndex] = false
        await taskIncorrectSwal(this.t, this.error)
      }
      else if (isCorrect === null) { /* waiting... */ }
      else {
        this.correctScenarios[this.activeScenarioIndex] = false
        await taskIncorrectSwal(this.t)
      }
    },
    'karelBlockly.workspace'() {
      this.correctScenarios = new Array(this.task.worlds.length).fill(null)
    },
    'currentStepData.activeBlocks'(blocks) {
      this.karelBlockly.highlight = JSON.parse(JSON.stringify(blocks || []))
    },
    activeScenarioIndex() {
      this.playing = false
      this.currentStepData = null
    },
    correctScenarios: {
      deep: true,
      async handler(val) {
        const isCorrect = val.every(val => val)
        if (isCorrect && Agent.embedded) {
          Agent.close({ success: true })
        } else if (isCorrect) {
          await taskSuccessSwal(this.t)
        }
      }
    }
  },
  computed: {
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
    t(slug) { return this.$store.getters.t(slug) },
    localT(id) {
      if (isUUID(id)) {
        return this.localTranslationMap?.[id] || `missing or empty ${id}`
      } else {
        return id
      }
    },
    openMobileCodeMode() {
      if (!this.mobileScreen || this.mobileCodeMode) return
      this.mobileCodeMode = true
      console.log('opening mobile code mode')
      console.log('this is now:: ', this)
      this.karelBlockly.settings.showToolbox = true
      this.karelBlockly.settings.disabled = false
    },
    closeMobileCodeMode() {
      if (!this.mobileScreen || !this.mobileCodeMode) return
      this.mobileCodeMode = false
      this.karelBlockly.settings.showToolbox = false
      this.karelBlockly.settings.disabled = true
    },
    handleResize() {
      const isSmall = window.innerWidth <= 600
      const newlyMobile = isSmall && !this.mobileScreen
      const newlyBig = !isSmall && this.mobileScreen
      if (newlyMobile) {
        this.mobileScreen = true
        this.mobileCodeMode = false
        this.karelBlockly.settings.showToolbox = false
        this.karelBlockly.settings.disabled = true
      } else if (newlyBig) {
        this.mobileScreen = false
        this.mobileCodeMode = false
        this.karelBlockly.settings.showToolbox = true
        this.karelBlockly.settings.disabled = false
      }
    },
    getScenarioLabel(i) {
      const start = `${this.t('scenario')} ${i+1}: `
      let end = this.t('not-tried')
      if (this.correctScenarios[i]) end = this.t('solved')
      else if (this.correctScenarios[i] === false) end = this.t('not-solved')
      return start + end
    },
    startPlaying() {
      this.playing = true
      this.correctScenarios[this.activeScenarioIndex] = null
    },
    showHint() {
      this.hintUsed = true
      taskHintSwal( this.t, this.localT(this.task.hint) )
    },
    async resetTask() {
      const originalKarelBlockly = copy(this.task.karelBlockly)
      this.karelBlockly = await karelBlocklyTranslateUUIDs(originalKarelBlockly, this.localTranslationMap)
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
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 200px;
  margin: 2px 2px 0 4px;
  display: flex;
  flex-direction: column;
}
.right-col {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 500px;
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
button.karel-button.reset {
  white-space: nowrap;
  background: darkred;
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
  flex: 0 0 300px;
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

.left-col .karel-button.hint {
  background: purple;
  margin-top: 4px;
}
.right-col .mask { display: none; }
.pulse-icon-wrapper.magnify { display: none; }

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

@media only screen and (max-width: 600px) {
  .container { flex-direction: column; }
  .left-col { flex: 0 0 auto; }
  .left-col .instructions-box { width: 100%; }

  .mobileCodeMode .left-col {
    flex: 0 0 180px;
    overflow: hidden;
    position: relative;
  }
  .mobileCodeMode .left-col .instructions-and-reset-wrapper {
    display: none;
  }
  .mobileCodeMode .left-col .worlds-wrapper {
    flex: 1 1 0;
    overflow: hidden;
    margin: 0 auto;

  }
  .mobileCodeMode .left-col .controls-wrapper {
    display: none;
  }

  .right-col {
    position: relative;
    border: 1px solid black;
    border-radius: 4px;
    flex: 1 1 100%;
    margin: 6px;
    cursor: pointer;
  }
  .right-col .mask {
    /* display: none; set outside of media query */
    display: unset;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #FFCCCB;
    z-index: 1000;
    opacity: 0.4;
    text-align: right;
  }
  .mobileCodeMode .right-col .mask {
    display: none;
  }

  .pulse-icon-wrapper {
    position: absolute;
    top: 2%;
    left: calc(50% - 35px);
    height: 70px;
    width: 70px;
    animation: pulse 1.15s ease-in-out infinite alternate;
  }
  /* set to display: none; outside of media query  */
  .mobileCodeMode .pulse-icon-wrapper.magnify {
    display: revert;
    top: revert;
    bottom: 0%;
  }
  button.karel-button.hint {
    display: none;
  }
}

@keyframes pulse {
  from {
    transform: scale(0.8);
    opacity: 0.4;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>