<template>
  <div class="karel-galler">

    <Modal
      v-if="modalContent"
      :title="modalTitle"
      :editing="modalEditing"
      @close="closeModal"
    >
      <component :is="componentInModal" :id="modalContent" />
    </Modal>

    <Navbar
      :mode="mode"
      @setMode="mode = $event"
      @newContent="customizeNewContent"
    />

    <div class="karel-galler-body">
      <div class="card-wrapper">
        <ContentCard
          v-for="id in content" class="content-card"
          :key="`card-for-${id}`"
          :id="id"
          @previewAction="launchPreviewModal(id)"
          @editAction="launchCustomizer(id)"
        />
      </div>
    </div>
  </div>
  
</template>

<script>
import Modal from '@/helpers/VueModal'
import Navbar from '@/components/BuilderComponents/Navbar'
import ContentCard from '@/components/BuilderComponents/ContentCard'
// import generateKarelTaskCustomizerStateFromRunState from '@/components/BuilderComponents/generateKarelTaskCustomizerStateFromRunState'
// import getDefaultTaskCustomizerState from '@/components/BuilderComponents/getDefaultTaskCustomizerState'
// import getDefaultMapCustomizerState from '@/components/BuilderComponents/getDefaultMapCustomizerState'

// import { noBlankNameSwal, confirmCloseWithoutSaveSwal } from '@/helpers/projectSwallows'
import TaskCustomizer from '@/components/BuilderComponents/TaskCustomizer'
import TaskPlayer from '@/components/TaskPlayer'
import MapCustomizer from '@/components/BuilderComponents/MapCustomizer'
import MapPlayer from '@/components/MapPlayer'

export default {
  name: 'task-and-map-browers-and-editor',
  components: {
    Navbar,
    Modal,
    ContentCard,
    TaskCustomizer,
    TaskPlayer,
    MapCustomizer,
    MapPlayer
  },

  async created() {
    //  TODO: load content from combo of default and local storage
  },
  data() {
    return {
      mode: 'tasks',

      modalTitle: null,
      modalContent: null,
      modalEditing: false,
      
      editBaseContent: null
    }
  },
  computed: {
    componentInModal() {
      const modalContentType = this.modalContent ? this.$store.getters.type(this.modalContent): null
      if (this.modalEditing) {
        if (modalContentType === 'task') return TaskCustomizer
        else return MapCustomizer
      } else {
        if (modalContentType === 'task') return TaskPlayer
        else return MapPlayer
      }
    },
    content() {
      return this.mode === 'maps' ? this.$store.getters.maps() : this.$store.getters.tasks()
    },
  },
  methods: {
    // async launchCustomizer(id) {

    //   this.editBaseContent = id
    //   const source  = this.loadedContent[id].source
    //   const { state } = JSON.parse(source)

    //   this.modalTitle = `Customizing "${ this.loadedContent[id].name }"`
    //   if (this.mode === 'tasks') {
    //     this.modalContent = KAREL_TASK_CUSTOMIZER
    //     this.modalState = generateKarelTaskCustomizerStateFromRunState(state)
    //   }
    //   else if (this.mode === 'maps') {
    //     // generate Map Customizer State from Content Run State and Defaults
    //     this.modalContent = KAREL_MAP_CUSTOMIZER
    //     this.modalState = {
    //       ...getDefaultMapCustomizerState(),
    //       ...state,
    //       graph: { ...state.graph, uneditable: false },
    //       favorites: [ ...this.favorites]
    //     }
    //   }
    // },
    launchPreviewModal(id) {
      this.modalTitle = `Previewing`
      this.modalContent = id
      this.modalEditing = false
    },

    // async customizeNewContent() {
    //   const taskMode = this.mode === 'tasks'
    //   this.modalTitle = `Creating a New Karel ${taskMode ? 'Task' : 'Map'}`
    //   this.modalContent = taskMode ? KAREL_TASK_CUSTOMIZER : KAREL_MAP_CUSTOMIZER
    //   this.modalState = taskMode ? getDefaultTaskCustomizerState() : { ...getDefaultMapCustomizerState(), favorites: [...this.favorites] }
    // },
    // async saveCustomizedContent() {
    //   const { name } = this.modalState

    //   if (name === '') {
    //     noBlankNameSwal()
    //     return
    //   }

      // destructure modalContent and set content differently in maps vs tasks
//       let content
//       if (this.modalContent === KAREL_TASK_CUSTOMIZER) {
//         const { instructions, hint, tags, preWorld, postWorld, blocklyXml } = this.modalState
//         content = {
//           name,  
//           state: {
//             name, instructions, hint, tags, preWorld, postWorld,
//             karelBlockly: JSON.parse(JSON.stringify({
//               ...blocklyXml,
//               settings: {
//                 ...blocklyXml.settings,
//                 customizerMode: false,
//               }
//             })),
//             currentStepData: null,
//             onceUponATimeWasCorreclyCompleted: false,
//             playing: false,
//             stepSpeed: 3,
//           }
          
//         }
//       } else if (this.modalContent === KAREL_MAP_CUSTOMIZER) {
//         const { graph, timeLimit, tags } = this.modalState
//         content = {
//           name,
//           state: {
//             name, timeLimit, tags,
//             startTime: null,
//             endTime: null,
//             graph: { ...graph, uneditable: true, selected: null }
//           }
          
//         }
//       }

    // },

    closeModal() {
      this.modalTitle = null
      this.modalContent = null
      this.modalEditing = null
    }
  }
}
</script>

<style>
@import url("https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css");

.karel-builder {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  font-family: 'Nunito', sans-serif;
  color: #5d5d5d;
  fill: #5d5d5d;
}

.karel-builder-body {
  flex-grow: 1;  
  display: flex;
}
.sidebar {
  border-right: 2px solid #ddd;
  background: #f5f5f5;
  padding: 20px;
}

.card-wrapper .content-card {
  display: inline-grid;
  margin: 14px;
}

#modal-wrapper
{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.modal-header h3 {
  margin: 0 0 6px 0;
  color: #5d5d5d;
}
.modal-main {
  flex-grow: 1;
  position: relative;
}
.modal-buttons
{
  text-align: right;
}
.modal-buttons button {
  margin: 0 8px;
}
</style>