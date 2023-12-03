<template>
	<div class="karel-type-cell">
		<div class="cell-space"></div> <!-- placeholder -->
		<DisplayTime
			v-if="timeOnTask"
			:rawTime="timeOnTask"
		/>

		<div
			v-if="hasHint"
			:class="{
				'cell-space' : true,
				'hint-icon-wrapper' : true,
				'hint-used' hintUsed
			}"
		>
			<span>{{ hintDisplay }}</span>
		</div>
		<div v-else class="cell-space"></div>

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
	.cell-space {
		width: 20px;
	    height: 20px;
	}
	.hint-icon-wrapper {
		font-weight: 600;
	    background: white;
	    border-radius: 100px;
	    width: 20px;
	    height: 20px;
	}
	.hint-icon-wrapper.hint-used {
		color: limegreen;
	}
</style>