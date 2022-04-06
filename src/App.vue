<template>
  <div v-if="$store.state.loading">Loading content...</div>
  <router-view v-else />
</template>

<style>
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;

  font-family: 'Nunito', sans-serif;
  color: #5d5d5d;
  fill: #5d5d5d;
}

</style>
