<template>
  <div>

    <div v-if="!activeMap">
      Select Map Here
      <div :key="map"
        v-for="map in $store.getters.maps()"
        @click="activeMap = map"
      >{{ map }}</div>
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