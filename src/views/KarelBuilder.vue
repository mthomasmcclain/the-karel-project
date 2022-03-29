<template>
  <div class="karel-builder">

    <Modal
      v-if="modalContent"
      :editing="modalEditing"
      :id="modalContent"
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
import { v4 as uuid } from 'uuid'
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
      this.$store.dispatch(this.mode === 'maps' ? 'newMap' : 'newTask', newId)
      this.modalContent = newId
      this.modalEditing = true
    },
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