<template>
	<div class="karel-type-cell">
		<DisplayTime
			v-if="timeOnTask"
			:rawTime="timeOnTask"
		/>
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