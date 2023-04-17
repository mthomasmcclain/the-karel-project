<template>
  <div class="navbar">
    <div
      :class="{selector: true, selected: mode === 'tasks' }"
      @click="$emit('setMode', 'tasks')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="task-icon" viewBox="0 0 576 512">
        <path d="M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z"/>
      </svg>
      <div>{{ t('karel-tasks') }}</div>
    </div>
    <div
      :class="{selector: true, selected: mode === 'maps' }"
      @click="$emit('setMode', 'maps')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="map-icon" viewBox="0 0 576 512">
        <path d="M560.02 32c-1.96 0-3.98.37-5.96 1.16L384.01 96H384L212 35.28A64.252 64.252 0 00191.76 32c-6.69 0-13.37 1.05-19.81 3.14L20.12 87.95A32.006 32.006 0 000 117.66v346.32C0 473.17 7.53 480 15.99 480c1.96 0 3.97-.37 5.96-1.16L192 416l172 60.71a63.98 63.98 0 0040.05.15l151.83-52.81A31.996 31.996 0 00576 394.34V48.02c0-9.19-7.53-16.02-15.98-16.02zM224 90.42l128 45.19v285.97l-128-45.19V90.42zM48 418.05V129.07l128-44.53v286.2l-.64.23L48 418.05zm480-35.13l-128 44.53V141.26l.64-.24L528 93.95v288.97z"/>
      </svg>
      <div>{{ t('karel-maps') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: [ 'mode' ],
  methods: {
    t(target) { return this.$store.getters.translation(target) }
  }
}
</script>

<style scoped>
.navbar {
  background: whitesmoke;
  width: 100%;
  display: flex;
  align-items: center;
}
.selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6px 12px;
  font-size: 0.9em;
  cursor: pointer;
  width: 60px;
  text-align: center;
}
 svg.task-icon, .navbar svg.map-icon {
  height: 20px;
  margin-bottom: 5px;
}
.selector.selected {
  color: green;
  fill: green;
}
</style>