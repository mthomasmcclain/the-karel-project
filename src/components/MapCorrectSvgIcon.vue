<template>

  <svg
    class="map-correct-svg-icon"
    viewBox="0 0 120 100"
    :class="{ grayscale : !correct }"
  >
    <SvgPositioner
      :h="54" :xPos="60" :yPos="40"
      :rotation="-90"
      anchor="center center"
    >
      <Karel />
    </SvgPositioner>

    <SvgPositioner v-show="correct" :h="45" :xPos="74" :yPos="30" anchor="left top">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="green" stroke="green" stroke-width="3" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
      </svg>
    </SvgPositioner>

  </svg>

</template>

<script>
import SvgPositioner from './SvgPositioner.vue'
import Karel from '../assets/KarelVueSvg.vue'

export default {
  name: 'map-correct-svg-icon',
  components: { SvgPositioner, Karel },
  props: {
    correct: {
      type: Boolean,
      default: false,
    },
   }
}
</script>


<style scoped>

.map-correct-svg-icon.grayscale {
  filter: grayscale(100%);
  opacity: 0.4;
}
</style>