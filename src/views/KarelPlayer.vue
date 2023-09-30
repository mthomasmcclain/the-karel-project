<template>
  <div class="karel-player">

    <div class="student-display" v-if="!activeMap">
      <div class="student-header">
        <img src="../assets/karelSide.png" />
        <h2>Your Karel Maps</h2>
      </div>

      <div class="student-task-area">
        <div class="tab-selector">
          <div
            v-for="tab in tabs"
            :key="`tab-${tab}`"
            @click="activeTab = tab"
            :class="{
              tab: true,
              active: tab === activeTab
            }"

          >{{ tab }}</div>
        </div>
        <div v-for="id in filteredMaps" :key="id"
          class="map-display-line"
        >
          <div class="map-selector" @click="activeMap = id">
            <svg class="play-button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style="height: 24px;"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4v16m14-8L6 20m14-8L6 4"/>
            </svg>
            <MapCorrectSvgIcon class="correct-svg" :correct="$store.getters.mapIsComplete(id)" />
            <span class="map-name">{{ $store.getters.name(id) }}</span>
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

      <div v-if="activeTab === 'Custom'" class="add-map-button" @click="addMap" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
        <span>Add Map</span>
      </div>
    </div>
    
    <MapPlayer v-else
      @exit="activeMap = null"
      :id="activeMap"
    />

  </div>
</template>

<script>
import MapPlayer from '../components/MapPlayer/index.vue'
import PilaLogoVueSvg from '../assets/PilaLogoVueSvg.vue'
import MapCorrectSvgIcon from "../components/MapCorrectSvgIcon.vue"
import { confirmDeleteSwal, importMapSwal, mapNotFoundSwal } from '../helpers/projectSwallows.js'

export default {
  name: 'KarelPlayer',
  components: { MapPlayer, MapCorrectSvgIcon, PilaLogoVueSvg },
  data() {
    return {
      activeMap: null,
      tabs: [ 'Beginner', 'Intermediate', 'Advanced', 'Custom'],
      activeTab: 'Beginner',
    }
  },
  computed: {
    filteredMaps() {
      return this.$store.getters.mapIdsByDifficulty(this.activeTab)
    }
  },
  methods: {
    async addMap() {
      this.$store.dispatch('setLoading', true)
      const { value, isDismissed } = await importMapSwal()
      if (isDismissed) {
        this.$store.dispatch('setLoading', false)
      } else {
        this.$store.dispatch('loadMapAndEmbedded', value)
          .catch(() => mapNotFoundSwal() )
          .finally(() => this.$store.dispatch('setLoading', false))
      }
    },
    async confirmDelete(id) {
      const { isConfirmed } = await confirmDeleteSwal(this.$store.getters.name(id))
      if (isConfirmed) this.$store.dispatch('delete', id)
    }
  }
}
</script>

<style scoped>
.karel-player {
  width: 100%;
  height: 100%;
  user-select: none;
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
  margin: 18px 32px;
}
.student-task-area {
  margin: 20px auto;
  min-width: 500px;
}
.student-task-area .tab-selector {
  height: 40px;
  display: flex;
  font-size: 1.2rem;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px dotted;
  margin-bottom: 10px;
}
.student-task-area .tab {
  color: grey;
  cursor: pointer;
  flex-grow: 1;
  margin: 0 2px;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.student-task-area .tab:hover {
  background: whitesmoke;
}
.student-task-area .tab.active {
  color: green;
  background: whitesmoke;
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
  stroke: green;
}
.student-task-area .map-display-line .map-selector .correct-svg {
  height: 60px;
}

.student-task-area .map-display-line .trash-icon {
 width: 16px;
 margin-left: 6px;
 fill: #bcbcbc;
 cursor: pointer;
}
.student-task-area .map-display-line .pila-logo {
  height: 16px;
  margin-left: 6px;
}
.student-task-area .map-display-line .trash-icon:hover {
  fill: red;
}
.add-map-button {
  margin: auto;
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