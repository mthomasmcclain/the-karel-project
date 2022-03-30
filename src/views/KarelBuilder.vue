<template>
  <div class="karel-builder">
    <Modal
      v-if="modalContent"
      :editing="editing"
      :id="modalContent"
      @save="save"
      @close="closeModal"
      @delete="$store.dispatch('delete', modalContent); modalContent = null;"
    >
      <component
        :is="componentInModal"
        :id="modalContent"

        :previewMode="true"
      />
    </Modal>

    <Navbar
      :mode="mode"
      @setMode="mode = $event"
    />

    <div class="new-task-or-map-button" @click="customizeNewContent">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>
      <span>New {{ mode === 'tasks' ? 'Task' : 'Map' }}</span>
    </div>

    <div class="karel-builder-body">
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
// import { noBlankNameSwal, confirmCloseWithoutSaveSwal } from '@/helpers/projectSwallows'
import TaskCustomizer from '@/components/BuilderComponents/TaskCustomizer'
import TaskPlayer from '@/components/TaskPlayer'
import MapCustomizer from '@/components/BuilderComponents/MapCustomizer'
import MapPlayer from '@/components/MapPlayer'

export default {
  name: 'karel-builder',
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
      editing: false,
    }
  },
  computed: {
    componentInModal() {
      const foundTaskType = this.$store.getters.type(this.modalContent)
      if (this.editing && (foundTaskType === 'map' || this.modalContent === 'newMap')) {
        return MapCustomizer
      } else if (this.editing && (foundTaskType ==='task' || this.modalContent === 'newTask')) {
        return TaskCustomizer
      } else if (foundTaskType === 'map') {
        return MapPlayer
      } else if (foundTaskType === 'task') {
        return TaskPlayer
      } else {
        console.warn('cannot compute component for modal from modalContent:', this.modalContent)
        return undefined
      }
    },
    content() {
      return this.mode === 'maps' ? this.$store.getters.maps() : this.$store.getters.tasks()
    },
  },
  methods: {
    save() {
      const idToSaveOver = this.modalContent
      this.$store.dispatch('save', idToSaveOver )
      this.closeModal()

    },
    launchCustomizer(id) {
      this.editing = true
      this.modalContent = id
    },
    launchPreviewModal(id) {
      this.modalContent = id
      this.editing = false
    },
    customizeNewContent() {
      // instead of a uuid (as we do as an edit base to eventuall save over), simply pass 'newMap' or 'newTask'
      this.modalContent = this.mode === 'maps' ? 'newMap' : 'newTask'
      this.editing = true
    },
    closeModal() {
      this.modalContent = null
      this.$store.dispatch('updateCustomizerState', null)
      this.editing = false
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
}
.karel-builder .new-task-or-map-button {
  margin: 14px 0 0 14px;
  padding: 4px 10px 4px 6px;
  border-radius: 16px;
  width: 110px;
  background: rgb(228, 228, 228);
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.karel-builder .new-task-or-map-button svg {
  width: 20px;
  height: 20px;
}
.karel-builder .new-task-or-map-button:hover {
  background: rgb(197, 219, 197);
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