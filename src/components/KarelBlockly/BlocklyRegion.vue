<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  id: Number,
  styles: Object
});

const emit = defineEmits(['regionCreated', 'regionRemoved']);

const region = ref();

onMounted(() => {
  emit('regionCreated', region);
});

onUnmounted(() => {
  emit('regionRemoved');
});
</script>

<template>
  <div
    :id="`region-${id}`"
    class="container"
    :style="styles"
    :ref="`region`"
  ></div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
