<template>
	<div
		:class="{
			'task-cell': true,
			'correct': correct === true,
			'incorrect': correct === false,
			active,
			'unknown-correctness': correct !== false && correct !== true
	  	}"
	>
		<div v-if="this.loading">loading</div>
		<component
			v-else
			:is="cellType"
			:timeOnTask="timeOnTask"
			:taskData="taskData"
			:userState="userState"
			@click.shift="showDefaultCell = !showDefaultCell"
		/>

	</div>
</template>

<script>
import DefaultCellType from './DefaultCellType.vue'
import RatingCell from './RatingCell.vue'
import MultipleChoiceCell from './MultipleChoiceCell.vue'
import KarelCell from './KarelCell.vue'
import FreeResponseCell from './FreeResponseCell.vue'

export default {
	name: 'task-cell',
	components: {
		MultipleChoiceCell,
		RatingCell,
		KarelCell,
		FreeResponseCell,
		DefaultCellType
	},
	props: [ 'task', 'scope', 'timeOnTask', 'correct', 'active' ],
	async created() {
		this.taskData = await Agent.state(this.task)
		this.taskMetadata = await Agent.metadata(this.task)

		Agent.watch(this.scope, ({ state }) => {
			this.userState = state
			this.loading = false
		})

	},
	data() {
		return {
			loading: true,
			taskData: null,
			taskMetadata: null,
			userState: null,
			showDefaultCell: false
		}
	},
	computed: {
		taskType() { return this.taskMetadata ? this.taskMetadata.active_type : null },
		cellType() {
			if (this.showDefaultCell) return DefaultCellType

			const componentMap = {
				'application/json;type=karel-task&version=1.0.1' : KarelCell,
				'application/json;type=multiple-choice' : MultipleChoiceCell,
				'application/json;type=rating' : RatingCell,
				'application/json;type=free-response' : FreeResponseCell
			}
			return componentMap[this.taskType] || DefaultCellType
		}
	}
}
</script>


<style scoped>
	.correct
	{
		background: chartreuse;
	}
	.incorrect
	{
		background: tomato;
	}
	.unknown-correctness
	{
		background: #EEEEEE;
	}
	.task-cell
	{
		width: 100%;
		height: 100%;
		min-width: 128px;
		min-height:24px;
		border-radius: 4px;
	}

	.task-cell {
		border: 2px solid transparent;
	}
	.task-cell.active {
		border: 2px solid orange;
	}
</style>
