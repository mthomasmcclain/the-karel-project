<template>
  <div class="karel-player">

    <div class="student-display" v-if="!activeMap">
      <div class="student-header">
        <img src="../assets/karelSide.png" />
        <h2>The Karel Project</h2>
      </div>

      <div class="student-task-area">
        <h3>Your Karel Maps:</h3>
        <div v-for="id in $store.getters.maps()" :key="id"
          :class="{
            'map-display-line': true,
            'isComplete': $store.getters.taskIsComplete(id)
          }"
        >
          <div class="map-selector" @click="activeMap = id">
            <KarelVueSvg />
            <span class="map-name">{{ getName(id) }}</span>
          </div>
          <svg v-if="!$store.getters.isExpert(id)"
            class="trash-icon"
            viewBox="4 4 16 16"
            xmlns="http://www.w3.org/2000/svg"
            @click="confirmDelete(id)"
          >
            <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z"/>
          </svg>
          <PilaLogoVueSvg class="pila-logo" v-else />

        </div>
      </div>

      <div class="add-map-button" @click="addMap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
        <span>Add Map</span>
      </div>
    </div>
    
    <MapPlayer v-else
      @exitMap="activeMap = null"
      :id="activeMap"
    />

  </div>
</template>

<script>
import MapPlayer from '@/components/MapPlayer'
import KarelVueSvg from '@/assets/KarelVueSvg'
import PilaLogoVueSvg from '@/assets/PilaLogoVueSvg'
import { confirmDeleteSwal } from '@/helpers/projectSwallows'

export default {
  name: 'KarelPlayer',
  components: { MapPlayer, KarelVueSvg, PilaLogoVueSvg },
  data() {
    return {
      activeMap: null
    }
  },
  methods: {
    addNew() {
      prompt('placeholder for validate and add new map id')
    },
    getName(id) {
      return this.$store.getters.map(id).name
    },
    async confirmDelete(id) {
      const { isConfirmed } = await confirmDeleteSwal(this.getName(id))
      if (isConfirmed) this.$store.dispatch('delete', id)
    }
  }
}
</script>

<style scoped>
.karel-player {
  width: 100%;
  height: 100%;
}

.student-display {
  display: flex;
  flex-direction: column;
}
.student-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: whitesmoke;
}
.student-header img {
  width: 70px;
}
.student-header * {
  margin: 18px 10px;
}
.student-task-area {
  margin-left: 20px;
}
.student-task-area h3 {
  margin: 12px 0;
}
.student-task-area .map-display-line {
  display: flex;
  align-items: center;
}
.student-task-area .map-display-line .map-selector {
  display: inline-flex;
  height: 40px;
  align-items: center;
  cursor: pointer;
  padding: 0 14px;
}
.student-task-area .map-display-line .map-selector:hover {
  background: whitesmoke;
  border-radius: 12px;
}
.student-task-area .map-display-line .map-selector svg {
  width: 20px;
  margin-right: 10px;
}

.student-task-area .map-display-line .trash-icon {
 width: 16px;
 margin-left: 6px;
 fill: #bcbcbc;
 cursor: pointer;
}
.student-task-area .map-display-line .pila-logo {
  height: 16px;
}
.student-task-area .map-display-line .trash-icon:hover {
  fill: red;
}
.add-map-button {
  margin: 14px 0 0 24px;
  padding: 4px 10px 4px 6px;
  border-radius: 16px;
  width: 110px;
  background: rgb(228, 228, 228);
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.add-map-button:hover {
  background: rgb(197, 219, 197);
}
.add-map-button svg {
  width: 20px;
  height: 20px;
}
</style>