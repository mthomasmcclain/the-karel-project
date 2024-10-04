<script setup>
import { computed } from 'vue';

const props = defineProps({
  rooms: {
    type: Array,
    default: () => []
  },
  doors: {
    type: Array,
    default: () => []
  },
  activeRoom: {
    type: Object,
    default: () => ({ row: 0, col: 0 })
  },
  active: {
    type: Boolean,
    default: false
  }
});

const rowMin = computed(() => {
  return Math.min(...props.rooms.map(room => room.row));
});
const colMin = computed(() => {
  return Math.min(...props.rooms.map(room => room.col));
});

const rowCount = computed(() => {
  return Math.max(...props.rooms.map(room => room.row)) - rowMin.value + 1;
});
const colCount = computed(() => {
  return Math.max(...props.rooms.map(room => room.col)) - colMin.value + 1;
});

const backgroundColor = computed(() => {
  return props.active ? 'lightgrey' : 'darkgrey';
})

</script>

<template>
  <div
    v-if="rooms.length > 1"
    class="room-grid"
    :style="{
      gridTemplateRows: `repeat(${rowCount}, 32px)`,
      gridTemplateColumns: `repeat(${colCount}, 32px)`
    }"
  >
    <div
      v-for="room in rooms"
      :key="`room-${room.row}-${room.col}`"
      @click="() => {if (active) $emit('roomChange', room)}"
      class="room"
      :style="{
        gridRow: room.row - rowMin + 1,
        gridColumn: room.col + colMin + 1,
        backgroundColor: activeRoom.row === room.row && activeRoom.col === room.col ? 'lightblue' : backgroundColor,
        borderLeft: doors.every(door => !(door.room.row === room.row && door.room.col === room.col && door.c === 0 && door.d.toLowerCase() === 'east')) ? '1px solid black' : '1px solid white',
        borderRight: doors.every(door => !(door.room.row === room.row && door.room.col === room.col && door.c !== 0 && door.d.toLowerCase() === 'east')) ? '1px solid black' : '1px solid white',
        borderTop: doors.every(door => !(door.room.row === room.row && door.room.col === room.col && door.r === 0 && door.d.toLowerCase() === 'north')) ? '1px solid black' : '1px solid white',
        borderBottom: doors.every(door => !(door.room.row === room.row && door.room.col === room.col && door.r !== 0 && door.d.toLowerCase() === 'north')) ? '1px solid black' : '1px solid white',
        cursor: active ? 'pointer' : 'default'
      }"
    >
      {{ room.row }},{{ room.col }}
    </div>
  </div>
</template>

<style scoped>
.room-grid {
  display: grid;
  gap: 0;
}

.room {
  width: 32px;
  height: 32px;

  font-size: 10px;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
