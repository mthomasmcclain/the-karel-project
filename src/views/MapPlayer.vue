<template>
	<MapPlayer
	  :id="id"
	  @exit="exit"
	/>
</template>

<script>
import MapPlayer from '../components/MapPlayer/index.vue'

export default {
	components: {
		MapPlayer
	},
	data() {
		return {
			id: this.$route.params.id
		}
	},
	methods: {
		exit() {
			if (Agent.embedded) Agent.close()
			else this.$router.push('/')
		}
	}
}
</script>
