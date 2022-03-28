<template>
  <div class="karel-galler">

    <Modal
      v-if="modalContent"
      :editing="modalEditing"
      @close="closeModal"
      @delete="$store.commit('delete', modalContent); modalContent = null;"
    >
      <component
        :is="componentInModal"
        :id="modalContent"
        
        :previewMode="true"
        @changedSaveData="save"
        
      />
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
import { v4 as uuid } from 'uuid'
import Modal from '@/helpers/VueModal'
import Navbar from '@/components/BuilderComponents/Navbar'
import ContentCard from '@/components/BuilderComponents/ContentCard'
// import generateKarelTaskCustomizerStateFromRunState from '@/components/BuilderComponents/generateKarelTaskCustomizerStateFromRunState'
// import getDefaultTaskCustomizerState from '@/components/BuilderComponents/getDefaultTaskCustomizerState'
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
  data() {
    return {
      mode: 'tasks',
      modalContent: null,
      modalEditing: false,
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
    save(data) {
      this.$store.commit('save', {
        id: this.modalContent,
        type: this.mode,
        data,
      })
    },
    launchCustomizer(id) {
      this.modalEditing = true
      this.modalContent = id
    },
    launchPreviewModal(id) {
      this.modalContent = id
      this.modalEditing = false
    },
    customizeNewContent() {
      const newId = uuid()
      this.$store.commit(this.mode === 'maps' ? 'newMap' : 'newTask', newId)
      this.modalContent = newId
      this.modalEditing = true
    },
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
//       } 

    // },

    closeModal() {
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