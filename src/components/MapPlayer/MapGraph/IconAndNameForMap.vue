<template>

  <svg
    class="icon-and-name"
    viewBox="0 0 120 100"
    style="width: 100px; height: 100px;"
    :style="locked ? 'filter: grayscale(100%);' : ''"
  >
    <circle :class="{ highlighted }" cx="50%" cy="40" r="40" :fill="activeColor" />
    <text
      x="50%" y="95%"
      fill="#5d5d5d"
      text-anchor="middle"
      alignment-baseline="center"
    >
      {{ label }}
    </text>

    <SvgPositioner
      :h="54" :xPos="60" :yPos="40"
      :rotation="-90"
      anchor="center center"
    >
      <Karel />
    </SvgPositioner>

    <SvgPositioner v-show="correct" :h="45" :xPos="75" :yPos="40" anchor="left top">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="green" stroke="green" stroke-width="3" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
      </svg>
    </SvgPositioner>

  </svg>

</template>

<script>
import SvgPositioner from '../../SvgPositioner.vue'
import Karel from '../../../assets/KarelVueSvg.vue'

export default {
  name: 'icon-and-name',
  components: { SvgPositioner, Karel },
  props: {
    locked: {
      type: Boolean,
      required: false,
      default: false,
    },
    highlighted: {
      type: Boolean,
      default: false
    },
    correct: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: 'No Label'
    },
    activeColor: {
      type: String,
      default: '#f9e6e3',
    },
  }
}
</script>


<style scoped>
circle.highlighted
{
  stroke: black;
  stroke-width: 4;
}
.icon-and-name
{
  overflow: visible;
}
.icon-and-name.grayscale {
  filter: grayscale(100%);
}
</style>