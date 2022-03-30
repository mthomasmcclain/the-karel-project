<template>
  <div class="container no-select">
    <div id="worlds-and-workspace">
      
      <div class="start-world-area">
        <h4>Start World:</h4>
        <KarelWorldRendererAndEditor :world="preWorld" @change="preWorld = $event" />
      </div>
      
      <div class="end-world-area">
        <h4>Goal World:</h4>
        <KarelWorldRendererAndEditor :world="postWorld" @change="postWorld= $event" />
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
        <span v-for="tabName in [ 'Basic', 'Toolbox', 'Tags' ]"
          :key="`tab-${tabName}`"
          @click="activeTab = tabName"
          :class="{ active: activeTab === tabName, tab: true }"
        >
          {{ tabName }}
        </span>
        <span class="spaceholder"></span>
      </div>
      <div id="tab-body">
        <div id="tab-body-scroller">
          <div v-show="activeTab === 'Toolbox'">
            <KarelBlocklySettingsEditor
              :settings="karelBlockly.settings"
              @toggleBlock="toggleBlock"
              @setBlockLimit="({ name, amount }) => setBlockLimit(name, amount)"
              @updateSetting="({ name, value }) => updateBlocklySetting(name, value)"
            />
          </div>
          
          <div id='basic-settings' v-show="activeTab === 'Basic'">
            
            <div id="basic-settings-left-side">
              <div class="task-name-wrapper">
                <span>Task Name: </span>
                <input
                  id="task-name"
                  placeholder="Task Name goes here..."
                  v-model="name"
                />
              </div>
              <div class="instructions-wrapper">
                <div>Instructions:</div>
                <textarea
                  id="task-instructions"
                  placeholder="Instructions go here..."
                  v-model="instructions"
                />
              </div>              
            </div>
            
            <div id="basic-settings-right-side">
              <div>
                Rows:
                <button @click="handleRowOrColChange('nRows', -1)">-</button>
                <button @click="handleRowOrColChange('nRows', 1)">+</button>
                Cols:
                <button @click="handleRowOrColChange('nCols', -1)">-</button>
                <button @click="handleRowOrColChange('nCols', 1)">+</button>
              </div>

              <div class="hint-wrapper">
                <div>Hint: (optional) </div>
                <textarea
                  id="task-hint"
                  placeholder="Hint goes here..."
                  v-model="hint"
                />
              </div>
              
            </div>
          </div>
          <!-- END OF BASIC SETTINGS TAB -->
          
          <div v-show="activeTab === 'Tags'">
            <KarelTagSelector :tags="tags" @change="tags = $event" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import KarelWorldRendererAndEditor from './KarelWorldRendererAndEditor'
import KarelBlockly from '@/components/KarelBlockly'
import KarelTagSelector from './KarelTagSelector'
import KarelBlocklySettingsEditor from './KarelBlocklySettingsEditor' 
import { invalidResizeWallsSwal, invalidResizeKarelSwal, invalidResizeStonesSwal } from '@/helpers/projectSwallows'


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
    const {
      name,
      instructions,
      hint,
      preWorld,
      postWorld,
      karelBlockly,
      tags
    } = copy(this.$store.getters.task(this.id))
    return  {
      activeTab: 'Basic',
      name, instructions, hint, preWorld, postWorld, karelBlockly, tags
    }
  },
  watch: {
    '$data': {
      deep: true,
      handler() { this.update() }
    },
    'preWorld.walls': {
      handler( curr ) {
        if (!_.isEqual(this.postWorld.walls, curr)) {
          this.postWorld.walls = copy(curr)
        }
      },
      deep: true,
    },
    'postWorld.walls': {
      handler( curr ) {
        if (!_.isEqual(this.preWorld.walls, curr)) {
          this.preWorld.walls = copy(curr)
        }
      },
      deep: true,
    },
    'karelBlockly.settings': {
      handler(settings) {
        this.tags.systemTags = this.getSystemTags(settings)
      },
      deep: true,
    },
  },
  methods: {
    update() {
      const { name, instructions, hint, preWorld, postWorld, karelBlockly, tags } = this
      const customizerStateData = copy({ name, instructions, hint, preWorld, postWorld, karelBlockly, tags })
      this.$store.dispatch('updateCustomizerState', customizerStateData )
    },
    getSystemTags(settings) {
      if (!settings) return []
      let systemTags = []
      // destrusture all blocks from settings.blocks
      const { karel_move, karel_turn, karel_place, karel_pickup, karel_repeat, karel_if, karel_while, karel_define } = settings.blocks
      if (karel_repeat.active) systemTags.push("Has 'Repeat'")
      if (karel_if.active) systemTags.push("Has 'If'")
      if (karel_while.active) systemTags.push("Has 'While'")
      if (karel_define.active) systemTags.push("Has Function")
      if ( karel_move.active && karel_turn.active && karel_place.active  && karel_pickup.active &&
        !karel_repeat.active && !karel_if.active && !karel_while.active && !karel_define.active ) {
        systemTags.push("Basic Toolbox")
      }
      const someBlockLimited = Object.values(settings.blocks).some(block => block.active && block.limit !== -1)
      const totalBlocksLimited = settings.maxBlocks !== -1
      if (someBlockLimited || totalBlocksLimited) {
        systemTags.push("Limit Blocks")
      }
      if (Object.values(settings.blocks).every(block => block.active)) {
        systemTags.push("Full Toolbox")
      }
      if (!settings.showToolbox) systemTags.push("Parson's Problem")
      
      return systemTags
    },
    handleRowOrColChange (param, delta) {
      const newN = this.preWorld[param] + delta

      const allWalls =  [ ...this.preWorld.walls, ...this.postWorld.walls ]
      const allStones = [ ...this.preWorld.stones, ...this.postWorld.stones ]
      
      // determine if karel is within new bounds
      const karelParam = (param === 'nCols') ? 'karelCol' : 'karelRow'
      const karelN = Math.max(this.preWorld[karelParam], this.postWorld[karelParam])
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
        this.preWorld[param] = newN
        this.postWorld[param] = newN
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