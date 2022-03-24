<template>
  <div class="container">
    <div v-if="playing">
      <button @click="$emit('pause')">pause</button>
    </div>
    <div v-else-if="currentStepData && currentStepData.error">
      <button @click="reset">reset</button>
    </div>
    <div v-else-if="playingTerminated">
      <button @click="reset">reset</button>
    </div>
    <div v-else>
      <button @click="$emit('play')">play</button>
      <button v-if="paused" @click="reset">reset</button>
    </div>

    <div class="play-speed-wrapper">
      <span><strong>Play Speed</strong></span>
      <input
        type="range"
        min="1" max="26" step="1" :value="stepSpeed"
        @change="$emit('setStepSpeed', parseInt($event.target.value))"
      />
      <div class="speed-labels-row">
        <span>(slow)</span>
        <span>(fast)</span>
      </div>    
    </div>

  </div>
</template>

<script>
  import KarelBlocklyWorld from "./KarelBlocklyWorld"
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
  font-family: Nunito, Heletica, sans-serif;
}
button {
  background: green;
  color: white;
  min-width: 70px;
  height: 30px;
  margin: 0 6px;
  border-radius: 6px;
  border: none;
  font-size: 0.9em;
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