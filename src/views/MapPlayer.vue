<template>
	<MapPlayer
		v-if="loaded"
		:id="id"
		@exit="exit"
	/>
</template>

<script>
import MapPlayer from '../components/MapPlayer/index.vue'
import { vuePersistentComponent } from '@knowlearning/agents/vue.js'

export default {
	components: {
		MapPlayer: vuePersistentComponent(MapPlayer, 'woopdiedoo')
	},
	data() {
		console.log('map player', this.$route.params)
		return {
			loaded: false,
			id: this.$route.params.id
		}
	},
	async created() {
		await this.$store.dispatch('loadMapAndEmbedded', this.id)
		this.loaded = true
	},
	methods: {
		exit() {
			if (Agent.embedded) Agent.close()
			else this.$router.push('/')
		}
	}
}
</script>
