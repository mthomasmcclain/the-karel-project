<template>
  <div id="blockly-settings-editor">
    <!-- LEFT SIDE, INDIVIDUAL BLOCK SETTINGS -->
    <div class="left-side">
      <h4>{{ t('available-blocks') }}:</h4>
      <div class="individual-block-options"
        v-for="[name, { active, limit } ] in possibleKarelBlocks"
        :key="name"
        >
        <div @click="$emit('toggleBlock', name)">
          <span class="checkbox">{{ active ? '☑' : '☐' }}</span>
          <span :class="!active ? 'inactive-name' : ''">
            {{ tBlockName(name) }}
          </span>
        </div>
        <div v-show="active">
          <span v-if="limit !== -1">
            <button @click="$emit('setBlockLimit', { name, amount: Math.max(limit - 1, 0) })">-</button>
            <span>{{ t('limit') }}</span>
            <button @click="$emit('setBlockLimit', { name, amount: limit + 1 })">+</button>
          </span>
          <span @click="$emit('setBlockLimit', { name, amount: limit === -1 ? 3 : -1 })">
            <span class="checkbox">{{ limit === -1 ? '☐' : '☑' }}</span>
            <span>{{ t('limit') }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE -- GENERAL SETTINGS -->
    <div class="right-side">
      <h4>{{ t('other-settings') }}:</h4>
      <div class="total-block-options">
        <div @click="$emit('updateMaxBlocks', maxBlocks ? null : 10 )">
          <span class="checkbox">{{ maxBlocks ? '☑' : '☐' }}</span>
          <span>{{ t('limit-total') }}</span>
        </div>
        <div v-if="maxBlocks">
          <button @click="$emit('updateMaxBlocks', Math.max(maxBlocks - 1, 1))">-</button>
          <span>{{ maxBlocks }}</span>
          <button @click="$emit('updateMaxBlocks', maxBlocks + 1 )">+</button>
        </div>
      </div>
      <div @click="$emit('updateSetting', { name: 'showToolbox', value: !settings.showToolbox })">
        <span class="checkbox">{{ settings.showToolbox ? '☐' : '☑' }}</span>
        <span>{{ t('hide-toolbox') }}</span>
      </div>
      <div @click="$emit('updateSetting', { name: 'disabled', value: !settings.disabled })">
        <span class="checkbox">{{ settings.disabled ? '☑' : '☐' }}</span>
        <span>{{ t('disable-workspace') }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    settings: {
      type: Object,
      required: true
    },
    maxBlocks: {
      required: true
    }
  },
  computed: {
    possibleKarelBlocks() { return Object.entries(this.settings.blocks) },
  },
  methods: {
    t(slug) { return this.$store.getters.t(slug) },
    tBlockName(block) {
      const blockToSlugMap = {
        karel_move: 'move-forward',
        karel_turn: 'turn-left',
        karel_place: 'place-stone',
        karel_pickup: 'pickup-stone',
        karel_if: 'if-block',
        karel_repeat: 'repeat-block',
        karel_while: 'while-block',
        karel_define: 'define-function',
      }
      return this.t(blockToSlugMap[block])
    }
  }
}
</script>

<style scoped>
#blockly-settings-editor {
  display: flex;
}
.left-side, .right-side {
  width: 250px;
  margin: 0 20px;
  padding: 10px;
  border-radius: 6px;
}
.left-side  { background: lightgrey; }
.right-side { background: lightsalmon; }
  
h4 { margin: 0 0 6px 0; }

.individual-block-options,
.total-block-options {
  display: flex;
  justify-content: space-between;
}
.individual-block-options button,
.total-block-options button {
  height: 16px;
}
.inactive-name { color: rgba(0,0,0,0.28) }
.checkbox { margin: 0 4px; }
</style>