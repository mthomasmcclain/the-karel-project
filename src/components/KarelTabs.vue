<script setup>
const props = defineProps({
  tabs: Object,
  runningTab: Number,
  errorTabId: Number
});

const activeTab = defineModel();

const tabClicked = (i) => {
  if (activeTab.value !== i) {
    activeTab.value = i;
  }
}
</script>

<template>
  <div class="tab-container">
    <div
      v-for="tab of tabs"
      :key="tab.id"
      :class="{
        tab: true,
        'active-tab': activeTab === tab.id,
        'running-tab': runningTab === tab.id,
        'error-tab': errorTabId === tab.id
      }"
      @click="tabClicked(tab.id)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<style scoped>
.tab-container {
  width: 100%;

  display: flex;
  flex-direction: row;
}

.tab {
  width: 100%;
  text-align: center;

  border: 1px solid grey;
  color: grey;

  cursor: pointer;
  user-select: none;
}

.active-tab {
  border-bottom: 0px solid grey;
  color: black;
}

.running-tab {
  background-color: deepskyblue;
}

.error-tab {
  background-color: red;
}
</style>
