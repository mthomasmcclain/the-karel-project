<template>
	<component :is="ActualMapPlayer"
		v-if="loaded"
		:id="id"
		@exit="exit"
	/>
</template>

<script>
import MapPlayer from '../components/MapPlayer/index.vue'
import { vuePersistentComponent, vueScopeComponent } from '@knowlearning/agents/vue.js'

export default {
	data() {
		return {
			loaded: false,
			dashboardMode: false
		}
	},
	computed: {
		id() {
			return this.$route.params.id
		},
		ActualMapPlayer() {
			if (this.dashboardMode) return vueScopeComponent
			return vuePersistentComponent(MapPlayer, `map-run-state-${this.id}`)
		}
	},
	async created() {
		this.loaded = false
		this.dashboardMode = false
		const { active_type } = await Agent.metadata(this.id)
		if (active_type === 'application/json;type=dashboard-config') {
			this.dashboardMode = true
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
