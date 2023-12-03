<template>
  <div v-if="dashboardConfig === null">...</div>

  <div v-else>
    <table>
      <thead>
        <tr>
          <th>
            user
          </th>
          <th></th><!--placeholder for active -->
          <th v-for="id in orderedTasks">
            <vueScopeComponent :id="id" :path="['name']" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="assignee in assignees">
          <td @click="logAssigneeState(assignee)">
            {{ names[assignee] || `Anon_${assignee.slice(0,4)}` }}
          </td>
          <td>
            <div :class="{
              'active-status': true,
              'active': userIsActive(assignee)
            }"></div>
          </td>
          <td
            v-for="task in orderedTasks"
            class="item-cell"
          >
            <TaskCell
              v-if="assigneeMapScopeStates[assignee]?.taskTimes?.[task] && dashboardConfig[mapId]?.embedded[task]?.states[assignee]"
              :key="dashboardConfig[mapId].embedded[task].states[assignee]"
              :task="task"
              :active="userIsActive(assignee) && taskIdForNode(assigneeMapScopeStates[assignee]?.selected) === task"
              :scope="dashboardConfig[mapId].embedded[task].states[assignee]"
              :timeOnTask="assigneeMapScopeStates[assignee]?.taskTimes[task]"
              :correct="assigneeMapScopeStates[assignee]?.taskSuccess?.[task]"
            />
            <div v-else class="cell-placeholder"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { vueScopeComponent } from '@knowlearning/agents/vue.js'
  import TaskCell from './cell-types/index.vue'

  export default {
    props: {
      id: String
    },
    components: {
      TaskCell,
      vueScopeComponent
    },
    data() {
      return {
        dashboardConfig: null,
        mapId: null,
        lastAssigneeInteractionTimes: {},
        assigneeMapScopeStates: {},
        users: [],
        tasks: [],
        names: {},
        now: Date.now()
      }
    },
    async created() {
      const nowLoop = () => {
        this.now = Date.now()
        this.nowLoopTimeout = setTimeout(nowLoop, 1000)
      }
      nowLoop()

      const dashboardConfig = await Agent.state(this.id)
      Agent.watch(this.id, async ({ state }) => {
        this.mapId = Object.keys(state)[0] //  TODO: validation
        this.map = await Agent.state(this.mapId)
        this.dashboardConfig = state
      })

      Agent
        .query('mutated-in-context', [this.assignmentId])
        .then(results => {
          results
            .filter(({ context }) => context[0] === this.assignmentId && context[1] === this.assignment.content)
            .forEach(({ context, owner, target }) => {
              let embeddedReference = dashboardConfig
              context
                .slice(1) // start after reference to assignment
                .forEach((contentId, index) => {
                  if (!embeddedReference[contentId]) embeddedReference[contentId] = { states: {}, embedded: {} }
                  if (index < context.length - 2) embeddedReference = embeddedReference[contentId].embedded
                })
              const content = context[context.length-1]
              embeddedReference[content].states[owner] = target
            })
        })

    },
    beforeUnmount() {
      clearTimeout(this.nowLoopTimeout)
    },
    watch: {
      assigneeMapScopes(a, b) {
        // Watch map scope for each user to get last interaction time.
        // This works since the map implements a heartbeat.
        Object
          .entries(this.assigneeMapScopes || {})
          .forEach(async ([assignee, scope]) => {
            if (this.lastAssigneeInteractionTimes[assignee] === undefined) {
              this.lastAssigneeInteractionTimes[assignee] = null
              const { updated } = await Agent.metadata(scope)
              this.lastAssigneeInteractionTimes[assignee] = updated
              let ignoreFirst = true
              Agent
                .environment(assignee)
                .then( env =>  this.names[assignee] = env?.auth?.info?.name )
              Agent
                .watch(scope, ({ state }) => {
                  if (ignoreFirst) ignoreFirst = false
                  else this.lastAssigneeInteractionTimes[assignee] = Date.now()

                  this.assigneeMapScopeStates[assignee] = state
                })
            }
          })
      }
    },
    computed: {
      orderedTasks() {
        return this.map ? Object.values(this.map.graph.nodes).map(({ taskId }) => taskId) : []
      },
      assignees() {
        return this.dashboardConfig ? Object.keys(this.assigneeMapScopes) : []
      },
      assigneeMapScopes() {
        return this.dashboardConfig ? this.dashboardConfig[this.mapId].states : {}
      }

    },
    methods: {
      userIsActive(user) {
        return this.now - this.lastAssigneeInteractionTimes[user] < 5000
      },
      taskIdForNode(nodeId) {
        return this.map.graph.nodes[nodeId]?.taskId
      },
      logAssigneeState(assignee) {
        console.log('ASSIGNEE STATE', this.assigneeMapScopeStates[assignee])
      }
    }
  }

</script>

<style scoped>

.assignment-tables {
  display: flex;
  justify-content: space-around;
  align-items: top;
}

.active-status {
  width: 12px;
  height: 12px;
  border-radius: 10px;
  margin: 0 10px;
  background: lightgrey;
}
.item-cell {
  border: 2px solid transparent;
}
.item-cell.active {
  border: 2px solid orange;
}
.cell-placeholder
{
  width: 100%;
  min-width: 128px;
  min-height: 24px;
  height: 100%;
  text-align: center;
  background: #EEEEEE;
  border-radius: 4px;
  overflow: hidden;
  padding: 4px;
}

table
{
  margin: auto;
}
</style>

