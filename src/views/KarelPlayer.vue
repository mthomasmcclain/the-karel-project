<template>
  <div class="karel-player">
    <h2>Karel Player</h2>
    <MapPlayer />
  </div>
</template>

<script>
import MapPlayer from '@/components/MapPlayer'
export default {
  name: 'KarelPlayer',
  components: { MapPlayer },
}
</script>