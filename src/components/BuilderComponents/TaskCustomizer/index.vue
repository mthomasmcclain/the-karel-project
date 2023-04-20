<template>
  <div class="container no-select">
    <div id="worlds-and-workspace">
      
      <div class="start-world-area">
        <h4>{{ t('start') }}{{ worlds.length > 1 ? ` (${t('scenario')} ${activeWorldIndex + 1})`: '' }}:</h4>
        <KarelWorldRendererAndEditor
          class="edit-start-world"
          :world="activeWorld.preWorld"
          @change="activeWorld.preWorld = $event"
        />
      </div>
      
      <div class="end-world-area">
        <h4>{{ t('goal') }} {{ worlds.length > 1 ? ` (${t('scenario')} ${activeWorldIndex + 1})`: '' }}:</h4>
        <KarelWorldRendererAndEditor
          class="edit-post-world"
          :world="activeWorld.postWorld"
          @change="activeWorld.postWorld = $event"
        />
      </div>
      
      <div class="karel-blockly-wrapper">
        <KarelBlockly
            v-model:toolbox="karelBlockly.toolbox"
            v-model:workspace="karelBlockly.workspace"
            v-model:settings="karelBlockly.settings"
            v-model:highlight="karelBlockly.highlight"
        />
      </div>
    </div>
    <div id="tabs">
      <div id="tab-bar"
      >
        <span v-for="tab in [ 'basic', 'toolbox', 'multi-world', 'tags'  ]"
          :key="`tab-${tab}`"
          @click="activeTab = tab"
          :class="{ active: activeTab === tab, tab: true }"
        >
          {{ t(tab) }}
        </span>
        <span class="spaceholder"></span>
      </div>
      <div id="tab-body">
        <div id="tab-body-scroller">
          <div v-show="activeTab === 'toolbox'">
            <KarelBlocklySettingsEditor
              :settings="karelBlockly.settings"
              @toggleBlock="toggleBlock"
              @setBlockLimit="({ name, amount }) => setBlockLimit(name, amount)"
              @updateSetting="({ name, value }) => updateBlocklySetting(name, value)"
              :maxBlocks="maxBlocks"
              @updateMaxBlocks="maxBlocks = $event"
            />
          </div>
          
          <div id='basic-settings' v-show="activeTab === 'basic'">
            
            <div id="basic-settings-left-side">
              <div class="task-name-wrapper">
                <span>{{ t('task-name') }}: </span>
                <input
                  id="task-name"
                  :placeholder="t('task-name-goes-here')"
                  v-model="name"
                />
              </div>
              <div class="instructions-wrapper">
                <div>{{ t('instructions') }}:</div>
                <textarea
                  id="task-instructions"
                  :placeholder="t('instructions-go-here')"
                  v-model="instructions"
                />
              </div>              
            </div>
            
            <div id="basic-settings-right-side">
              <div>
                {{ t('rows') }}:
                <button @click="handleRowOrColChange('nRows', -1)">-</button>
                <button @click="handleRowOrColChange('nRows', 1)">+</button>
                {{ t('columns') }}:
                <button @click="handleRowOrColChange('nCols', -1)">-</button>
                <button @click="handleRowOrColChange('nCols', 1)">+</button>
              </div>

              <div class="hint-wrapper">
                <div>{{ t('hint') }}: ({{ t('optional' )}}) </div>
                <textarea
                  id="task-hint"
                  :placeholder="t('hint-goes-here')"
                  v-model="hint"
                />
              </div>
              
            </div>
          </div>
          <!-- END OF BASIC SETTINGS TAB -->
          
          <div v-show="activeTab === 'tags'">
            <KarelTagSelector :tags="tags" @change="tags = $event" />
          </div>

          <div id="multi-world" v-show="activeTab === 'multi-world'">
            <h4>{{ t('active-world') }}: {{ activeWorldIndex + 1 }}</h4>
            <button
              v-for="(w,i) in worlds"
              :key="`select-world-button-${i}`"
              @click="activeWorldIndex = i"
              :disabled="activeWorldIndex === i"
            >
              {{ t('select-world') }} {{ i + 1 }}
            </button>
            <br>
            <button
              @click="addWorld"
              :disabled="worlds.length >= 4"
            >{{ t('add-world') }}</button>
            <br>
            <button
              v-for="(w,i) in worlds"
              :key="`remove-world-button-${i}`"
              @click="removeWorld(i)"
              :disabled="worlds.length === 1"
            >
              {{ t('remove-world') }} {{ i + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import KarelWorldRendererAndEditor from './KarelWorldRendererAndEditor/index.vue'
import KarelBlockly from '../../KarelBlockly/index.vue'
import KarelTagSelector from './KarelTagSelector.vue'
import KarelBlocklySettingsEditor from './KarelBlocklySettingsEditor.vue'
import defaultNewTaskState from '../../../store/defaultNewTaskState.js'
import {
  invalidResizeWallsSwal,
  invalidResizeKarelSwal,
  invalidResizeStonesSwal
} from '../../../helpers/projectSwallows.js'
import { injectTranslationsForBlocklyWorkspaceUserMethods } from '../../../helpers/translateBlocklyWorkspaceUserMethods.js'


const copy = (val)  => JSON.parse(JSON.stringify(val))

export default {
  name: 'task-customizer',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    KarelWorldRendererAndEditor,
    KarelBlockly,
    KarelTagSelector,
    KarelBlocklySettingsEditor
  },
  data() {
    const taskAtId = this.$store.getters.content(this.id)
    let customizerStartState
    if (taskAtId) {
      customizerStartState = copy(taskAtId)
      customizerStartState.name = this.t(customizerStartState.name)
      customizerStartState.instructions = this.t(customizerStartState.instructions)
      if (customizerStartState.hint) {
        customizerStartState.hint = this.t(customizerStartState.hint)
      }
      // TODO: translate embedded method names
      const itemTranslationIds = this.$store.state.translationGroups[this.id]
      if (itemTranslationIds) {
        const translationMap = itemTranslationIds.reduce((acc, id) => {
          return { ...acc, [id]: this.t(id) }
        }, {})
        const newWorkspace = injectTranslationsForBlocklyWorkspaceUserMethods(customizerStartState.karelBlockly.workspace, translationMap)
        customizerStartState.karelBlockly.workspace = newWorkspace
              
      }

    } else {
      customizerStartState = copy(defaultNewTaskState)
      customizerStartState.name = this.t('new-karel-task') 
    }
    const {
      name,
      instructions,
      maxBlocks,
      hint,
      worlds,
      karelBlockly,
      tags
    } = customizerStartState

    // customizerMode toggles if uesr can lock/unlock fn blocks
    karelBlockly.settings.customizerMode = true

    return  {
      activeTab: 'basic',
      activeWorldIndex: 0,
      name,
      instructions,
      maxBlocks,
      hint,
      worlds,
      karelBlockly,
      tags
    }
  },
  computed: {
    activeWorld() { return this.worlds[this.activeWorldIndex] }
  },
  watch: {
    '$data': {
      deep: true,
      handler() { this.update() },
      immediate: true
    },
    'activeWorld.preWorld.walls': {
      handler( curr ) {
        if (!_.isEqual(this.activeWorld.postWorld.walls, curr)) {
          this.activeWorld.postWorld.walls = copy(curr)
        }
      },
      deep: true,
    },
    'activeWorld.postWorld.walls': {
      handler( curr ) {
        if (!_.isEqual(this.activeWorld.preWorld.walls, curr)) {
          this.activeWorld.preWorld.walls = copy(curr)
        }
      },
      deep: true,
    },
    'karelBlockly.settings': {
      handler(settings) {
        this.tags.systemTags = this.getSystemTags(settings)
      },
      immediate: true,
      deep: true,
    },
    maxBlocks() {
      this.tags.systemTags = this.getSystemTags(this.karelBlockly.settings)
    },
    'worlds.length'() {
      this.tags.systemTags = this.getSystemTags(this.karelBlockly.settings)
    }
  },
  methods: {
    t(target) { return this.$store.getters.translation(target) },
    addWorld() {
      const copyLastWorld = copy(this.worlds[this.worlds.length - 1])
      this.worlds.push(copyLastWorld)
      this.activeWorldIndex = this.worlds.length - 1
    },
    removeWorld(i) {
      this.activeWorldIndex = 0
      this.worlds.splice(i,1)
    },
    update() {
      const { name, instructions, maxBlocks, hint, worlds, tags } = this
      // karelBlockly pulled separately, customizerMode false for save
      const karelBlockly = copy(this.karelBlockly)
      karelBlockly.settings.customizerMode = false
      const customizerStateData = copy({ name, instructions, maxBlocks, hint, worlds, karelBlockly, tags })
      this.$store.dispatch('updateCustomizerState', customizerStateData )
    },
    getSystemTags(settings) {
      if (!settings) return []
      let systemTags = []
      // destrusture all blocks from settings.blocks
      const { karel_move, karel_turn, karel_place, karel_pickup, karel_repeat, karel_if, karel_while, karel_define } = settings.blocks
      if (karel_repeat.active) systemTags.push("has-repeat")
      if (karel_if.active) systemTags.push("has-if")
      if (karel_while.active) systemTags.push("has-while")
      if (karel_define.active) systemTags.push("has-function")
      if ( karel_move.active && karel_turn.active && karel_place.active  && karel_pickup.active &&
        !karel_repeat.active && !karel_if.active && !karel_while.active && !karel_define.active ) {
        systemTags.push("basic-toolbox")
      }
      const someBlockLimited = Object.values(settings.blocks).some(block => block.active && block.limit !== -1)

      const totalBlocksLimited = this.maxBlocks
      if (this.worlds.length > 1) systemTags.push("multi-world")

      if (someBlockLimited || totalBlocksLimited) {
        systemTags.push("limit-blocks")
      }
      if (Object.values(settings.blocks).every(block => block.active)) {
        systemTags.push("full-toolbox")
      }
      if (!settings.showToolbox) systemTags.push("parsons-problem")
      
      return systemTags
    },
    handleRowOrColChange (param, delta) {
      const newN = this.activeWorld.preWorld[param] + delta

      const allWalls =  [ ...this.activeWorld.preWorld.walls, ...this.activeWorld.postWorld.walls ]
      const allStones = [ ...this.activeWorld.preWorld.stones, ...this.activeWorld.postWorld.stones ]
      
      // determine if karel is within new bounds
      const karelParam = (param === 'nCols') ? 'karelCol' : 'karelRow'
      const karelN = Math.max(this.activeWorld.preWorld[karelParam], this.activeWorld.postWorld[karelParam])
      const isKarelInBounds = (karelN < newN)
      
      // determine if any stones out of bounds
      const stoneParam = (param === 'nCols') ? 'c' : 'r'
      const isAnyStoneOutOfBounds = allStones.some( s => s[stoneParam] >= newN && s.n )
      const areAllStonesInBounds = !isAnyStoneOutOfBounds
      
      // determing if any walls are out of bounds or on border
      const wallParam = (param === 'nCols') ? 'c' : 'r'
      const isAnyWallOutOfBounds = allWalls.some(w => w[wallParam] >= newN)
      // We don't need to check north world edge, as impossible to create.  Only test east edge.
      let isAnyWallOnWorldEastEdge
      if (param === 'nCols') { // so only test if nCols === param, and newN is the new num of columns
        isAnyWallOnWorldEastEdge = allWalls.some(w => (w.c === newN - 1 && w.d ==='East'))
      }
      const wallsValid = !isAnyWallOutOfBounds && !isAnyWallOnWorldEastEdge
      
      if (!areAllStonesInBounds) invalidResizeStonesSwal()
      else if (!isKarelInBounds) invalidResizeKarelSwal()
      else if (!wallsValid) invalidResizeWallsSwal()
      else {
        this.activeWorld.preWorld[param] = newN
        this.activeWorld.postWorld[param] = newN
      }
    },
    toggleBlock(blockName) {
      const block = this.karelBlockly.settings.blocks[blockName]
      block.active = !block.active
    },
    setBlockLimit(blockName, limit) {
      this.karelBlockly.settings.blocks[blockName].limit = limit
    },
    updateBlocklySetting(param, val) {
      this.karelBlockly.settings[param] = val
    }
  }
}
</script>

<style scoped>
  .no-select {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }    
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  textarea, input {
    font-family: inherit;
    color: inherit;
    font-size: 0.95rem;
  }
  .start-world-area,
  .end-world-area {
    width: 30%;
    height: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  .edit-start-world,
  .edit-post-world {
    max-height: 500px;
  }
  h4 { margin: 0; padding: 0;}
  .karel-renderer-wrapper {
    flex: 1 0 0;
  }
  .karel-blockly-wrapper {
    width: 40%;
    height: 100%;
  }
  #tabs
  {
    flex-shrink: 0;
    padding: 10px;
    height: 32%;
    min-height: 240px;
    display: flex;
    flex-direction: column;
  }
  #tab-body
  {
    position: relative;
    padding: 4px;
    border: 2px solid grey;
    border-top: none;
    border-radius: 0 0 4px 4px;
    flex-basis: 0;
    flex-grow: 1;
    overflow: scroll;
  }
  #tab-body-scroller
  {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: scroll;
  }
  #tab-body-scroller > div
  {
    height: 100%;
  }
  #worlds-and-workspace
  {
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  #tab-bar { display: flex; }
  .tab
  {
    border-radius: 6px 6px 0 0;
    border: 2px solid grey;
    padding: 6px;
    cursor: pointer;
    display: inline-block;
    background: lightgray;
  }
  .tab.active
  {
    background: white;
    border-bottom: none;
  }
  .spaceholder {
    border: none;
    border-bottom: 2px solid grey;
    flex-grow: 1;
  }
  #basic-settings {
    display: flex;
  }
  #basic-settings-left-side,
  #basic-settings-right-side {
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: 6px 20px 20px 20px;
    flex: 1 0 0;

  }
  #multi-world button {
    margin: 4px;
  }
  .instructions-wrapper,
  .hint-wrapper {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
  }
  textarea#task-instructions,
  textarea#task-hint {
    width: 280px;
    flex: 1 0 0;
    margin-top: 4px;
    outline: none;
    resize: none;
    border: none;
    border-radius: 6px;
    background: lightblue;
  }
  
  /* hide scrollbar */
  *
  {
      -ms-overflow-style: none; /* for Internet Explorer, Edge */
      scrollbar-width: none; /* for Firefox */
  }
  
  *::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
  }
</style>