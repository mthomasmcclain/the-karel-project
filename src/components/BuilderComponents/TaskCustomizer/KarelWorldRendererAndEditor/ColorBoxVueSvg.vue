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
      :fill="color"
    />
  </svg>
</template>
  
<script>
export default {
  name: 'karel-button',
  props: {
    color: {
      required: false,
      type: String,
      default: "blue",
    }
  }
}
</script>