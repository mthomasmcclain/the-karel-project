<template>
  <div class="karel-builder">
    <Modal
      v-if="modalContent"
      :editing="editing"
      :id="modalContent"
      @save="save"
      @close="confirmCloseModal"
      @delete="confirmDeleteContent"
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

    <div class="karel-builder-body">
      <div class="add-card content-card" @click="customizeNewContent">
        <div class="add-card-inner">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
          <span>New {{ mode === 'tasks' ? 'Task' : 'Map' }}</span>
        </div>
      </div>
      <ContentCard
        v-for="id in content" class="content-card"
        :key="`card-for-${id}`"
        :id="id"
        @previewAction="launchPreviewModal(id)"
        @editAction="launchCustomizer(id)"
      />
    </div>
  </div>
  
</template>

<script>
import Modal from '@/helpers/VueModal'
import Navbar from '@/components/BuilderComponents/Navbar'
import ContentCard from '@/components/BuilderComponents/ContentCard'
import { confirmDeleteSwal, confirmCloseWithoutSaveSwal } from '@/helpers/projectSwallows'
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
    async confirmDeleteContent() {
      const { isConfirmed } = await confirmDeleteSwal()
      if (isConfirmed) {
        this.$store.dispatch('delete', this.modalContent)
        this.closeModal()
      }
    },
    async confirmCloseModal() {
      if (!this.editing) this.closeModal()
      else {
        const { isConfirmed } = await confirmCloseWithoutSaveSwal()
        if (isConfirmed) this.closeModal()
      }
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
.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  fill: lightgrey;
}
.add-card:hover {
  fill: green;
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
  flex-wrap: wrap;
  align-content: flex-start;
}
.sidebar {
  border-right: 2px solid #ddd;
  background: #f5f5f5;
  padding: 20px;
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