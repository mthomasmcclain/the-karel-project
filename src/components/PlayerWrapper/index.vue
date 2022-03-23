<template>
  <SimplifiedTaskPlayer
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
import SimplifiedTaskPlayer from '@/components/SimplifiedTaskPlayer'
import demoTaskData from '@/helpers/demoTaskData'
  
export default {
  components: { SimplifiedTaskPlayer },
  data: () => ({ ...demoTaskData })
}
</script>