<template>
	<component :is="ActualMapPlayer"
		v-if="loaded"
		:id="id"
		@exit="exit"
	/>
</template>

<script>
import MapPlayer from '../components/MapPlayer/index.vue'
import { vuePersistentComponent } from '@knowlearning/agents/vue.js'

export default {
	data() {
		return {
			loaded: false
		}
	},
	computed: {
		id() {
			console.log('route id', this.$route.params.id)
			return this.$route.params.id
		},
		ActualMapPlayer() {
			return vuePersistentComponent(MapPlayer, `map-run-state-${this.id}`)
		}
	},
	async created() {
		const { active_type } = await Agent.metadata(this.id)
		if (active_type === 'application/json;type=dashboard-config') {
			alert('dashboard!')
			return
		}
		else {
			await this.$store.dispatch('loadMapAndEmbedded', this.id)
		}
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
