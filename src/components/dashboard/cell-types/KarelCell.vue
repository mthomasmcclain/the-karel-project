<template>
	<div class="karel-type-cell">
		<span></span> <!-- placeholder -->
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
     		return this.hasHint ? this.userState.hintUsed : null
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
		display: flex;
		padding: 4px;
		justify-content: space-between;
		text-align: center;
	}
</style>