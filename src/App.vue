<template>
  <router-view v-if="!$store.state.loading" />
  <div v-else>
    Looooooaaaddding....
    <button @click="$store.dispatch('setLoading', false)">Stop Loading</button>"
    </div>
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
