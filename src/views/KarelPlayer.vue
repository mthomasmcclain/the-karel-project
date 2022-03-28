<template>
  <div class="karel-player" style="width: 100%; height: 100%;">

    <div v-if="!activeMap">
      <h3>Select Map Here</h3>
      <div :key="mapId"
        v-for="mapId in $store.getters.maps()"
        @click="activeMap = mapId"
        :style="$store.getters.mapIsComplete(mapId) ? 'color: green;' : ''"
      >
        {{ $store.getters.map(mapId).name }}
      </div>

      <button @click="addNew">Add New Map</button>
    </div>
    
    <MapPlayer v-else
      @exitMap="activeMap = null"
      :id="activeMap"
    />

  </div>
</template>

<script>
import MapPlayer from '@/components/MapPlayer'
export default {
  name: 'KarelPlayer',
  components: { MapPlayer },
  data() {
    return {
      activeMap: null
    }
  },
  methods: {
    addNew() {
      prompt('placeholder for validate and add new map id')
    }
  }
}
</script>