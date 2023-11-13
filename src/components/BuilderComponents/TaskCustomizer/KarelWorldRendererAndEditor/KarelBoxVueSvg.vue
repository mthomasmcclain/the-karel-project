<template>
  <svg viewBox="0 0 10 10">
    <rect
      x=".25"
      y=".25"
      width="9.5"
      height="9.5"
      stroke-width="0.5"
      stroke="grey"
      rx="1"
      ry="1"
      fill="white"
    />
    <KarelVueSvg :opacity="opacity" />
  </svg>
</template>

<script>
import KarelVueSvg from '../../../../assets/KarelVueSvg.vue';
export default {
  components: { KarelVueSvg },
  name: 'karel-button',
  props: {
    opacity: {
      required: false,
      type: Number,
      default: 1,
    }
  }
}
</script>