<template>
	<div class="karel-type-cell">
		<DisplayTime
			v-if="timeOnTask"
			:rawTime="timeOnTask"
		/>
		<div>{{ hintDisplay }}</div>

	</div>
</template>

<script>
import DisplayTime from './DisplayTime.vue'
export default {
	name: 'karel-type-cell',
	components: { DisplayTime },
	props: {
		timeOnTask: Number,
		taskData: Object,
		userState: Object
	},
	computed: {
     	selectedOptions() {
	        return (
	          Object
	            .entries(this.userState.selected)
	            .filter(([index, isSelected]) => isSelected)
	            .map(([index]) => parseInt(index))
	        )
     	},
		isCorrect() {
	        return true
     	},
     	hasHint() {
     		return !!this.taskData.hint
     	},
     	hintUsed() {
     		return this.hasHint ? this.taskData.hintUsed : null
     	},
     	hintDisplay() {
     		if (this.hasHint) return this.hintUsed ? 'x' : '?'
     		else return '-'
     	}


	}
}
</script>

<style scoped>
	.karel-type-cell
	{
		padding: 4px;
	}
</style>