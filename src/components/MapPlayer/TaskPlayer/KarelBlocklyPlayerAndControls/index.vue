<template>
  <div class="container">
    <div v-if="playing">
      <button class="karel-button" @click="$emit('pause')">{{ t('pause') }}</button>
    </div>
    <div v-else-if="currentStepData && currentStepData.error">
      <button class="karel-button" @click="reset">{{ t('reset') }}</button>
    </div>
    <div v-else-if="playingTerminated">
      <button class="karel-button" @click="reset">{{ t('reset') }}</button>
    </div>
    <div v-else>
      <button class="karel-button" @click="$emit('play')">{{ t('play') }}</button>
      <button class="karel-button" v-if="paused" @click="reset">{{ t('reset') }}</button>
    </div>

    <div class="play-speed-wrapper">
      <span><strong>{{ t('play-speed') }}</strong></span>
      <input
        type="range"
        min="1" max="26" step="1" :value="stepSpeed"
        @change="$emit('setStepSpeed', parseInt($event.target.value))"
      />
      <div class="speed-labels-row">
        <span>({{ t('slow') }})</span>
        <span>({{ t('fast') }})</span>
      </div>    
    </div>

  </div>
</template>

<script>
  import KarelBlocklyWorld from "./KarelBlocklyWorld/index.js"
  export default {
    props: [ 'playing', 'stepSpeed', 'preWorld', 'workspace', 'toolbox' ],
    data() {
      return {
        currentStepData: null
      }
    },
    watch: {
      playing() {
        if (this.playing) {
          if (this.karelBlocklyWorld) this.step()
          else {
            const { preWorld, toolbox, workspace } = this
            this.karelBlocklyWorld = KarelBlocklyWorld(preWorld, { toolbox, workspace })
            this.step()
          }
        }
        else if (this.nextStep) clearTimeout(this.nextStep)
      },
      preWorld()  { this.reset() },
      workspace() { this.reset() },
    },
    computed: {
      playingTerminated() {
        if (this.currentStepData && this.currentStepData.isDone) return true
        return false
      },
      paused() {
        return this.currentStepData && !this.playingTerminated && !this.playing
      }
    },
    methods: {
      t(target) {
        return this.$store.getters.translation(target)
      },
      reset() {
        this.karelBlocklyWorld = null
        this.currentStepData = null
        this.$emit('step', null)
        this.$emit('pause')
      },
      step() {
        this
          .karelBlocklyWorld
          .step(this.currentStepData ? this.currentStepData.step + 1 : 0)
          .then( stepData => {
            this.currentStepData = stepData
            this.$emit('step', stepData)
            if (stepData.isDone || stepData.error) this.$emit('pause')
            else this.nextStep = setTimeout(() => this.step(), 1000/this.stepSpeed)
          })
          .catch(error => {
            console.warn(error)
          })
      }
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.play-speed-wrapper {
    display: flex;
    color: #777;
    height: 60px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid lightgrey;
}
.play-speed-wrapper .speed-labels-row {
    display: flex;
    width: 100%;
    color: #888;
    font-size: 0.8rem;
    justify-content: space-between;
}
.play-speed-wrapper input {
    appearance: none;
    background: none;
    border: 2px solid gainsboro;
}

</style>