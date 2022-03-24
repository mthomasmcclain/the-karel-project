<template>
  <TaskPlayer :key="`task-player-${counter}`"
    @taskCorrect="handleCorrect"
    :name="name"
    :preWorld="preWorld"
    :postWorld="postWorld"
    :instructions="instructions"
    :hint="hint"
    :hideToolbox="hideToolbox"
    :maxBlocks="maxBlocks"
    :initialWorkspace="karelBlockly.workspace"
    :initialToolbox="karelBlockly.toolbox"
    :initialSettings="karelBlockly.settings"
   />
</template>

<script>
import TaskPlayer from '@/components/TaskPlayer'
import demoTask1 from '@/helpers/demoTask1'
import demoTask2 from '@/helpers/demoTask2'

export default {
  components: { TaskPlayer },
  data: () => ({
    ...demoTask2,
    counter: 0
  }),
  methods: {
    handleCorrect() {
      Object.keys(demoTask1).forEach(key => this.$data[key]=demoTask1[key])
      this.counter ++
    }
  }
}
</script>