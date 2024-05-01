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
        
        @exit="closeModal"
        :previewMode="true"
      />
    </Modal>

    <Navbar
      :mode="mode"
      @setMode="mode = $event"
    />

  <!-- UNPLUGGED MAP EDITOR ... ONLY SHOW BODY IF MODE TASKS... SHOULD ENSURE ALL BENEATH -->
    <div class="karel-builder-body" v-if="mode === 'tasks'">
      <div class="add-card content-card" @click="customizeNewContent">
        <div class="add-card-inner">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
          <span>{{ mode === 'tasks' ? t('new-task') : t('new-map') }}</span>
        </div>
      </div>
      <ContentCard
        v-for="id in content" class="content-card"
        :key="`card-for-${id}`"
        :id="id"
        :favorite="$store.getters.isFavorite(id)"
        :contentType="$store.getters.type(id)"
        :content="$store.getters.content(id)"
        :isExpert="$store.getters.isExpert(id)"
        @preview="launchPreviewModal($event)"
        @edit="launchCustomizer($event)"
        @copy="copyAndLaunchCustomizer($event)"
      />
    </div>

    <div v-else class="direct-to-sequence-builder">

      <h3>{{ t('karel-sequence-builder-has-moved') }}</h3>
      <p>
        {{ t('you-can-build-and-play-seqences-of-karel-items-by-dragging-them-onto-pil-as-multi-content-sequence-builder-application') }}
      </p>

      <img
        class="gif-how-to"
        src="/drag-and-drop-sequence-example.gif"
      >

      <a
        class="pila-link"
        target="_blank"
        href="https://create.pilaproject.org"
      >
         {{ t('launch-pila-create-application') }}
      </a>

    </div>
  </div>
  
</template>

<script>
import Modal from '../helpers/VueModal.vue'
import Navbar from '../components/BuilderComponents/Navbar.vue'
import ContentCard from '../components/BuilderComponents/ContentCard.vue'
import { confirmDeleteSwal, confirmCloseWithoutSaveSwal } from '../helpers/projectSwallows.js'
import TaskCustomizer from '../components/BuilderComponents/TaskCustomizer/index.vue'
import TaskPlayer from '../components/TaskPlayer/index.vue'
import MapCustomizer from '../components/BuilderComponents/MapCustomizer.vue'
import MapPlayer from '../components/MapPlayer/index.vue'

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
    const urlParams = new URLSearchParams(window.location.search);
    return {
      mode: urlParams.get('mode') === 'maps' ? 'maps' : 'tasks',
      modalContent: null,
      editing: false,
    }
  },
  computed: {
    componentInModal() {
      const taskType = this.$store.getters.type(this.modalContent)
      if (this.editing && (taskType === 'map' || this.modalContent === 'newMap')) {
        return MapCustomizer
      } else if (this.editing && (taskType ==='task' || this.modalContent === 'newTask')) {
        return TaskCustomizer
      } else if (taskType === 'map') {
        return MapPlayer
      } else if (taskType === 'task') {
        return TaskPlayer
      } else {
        console.warn('cannot compute component for modal from modalContent:', this.modalContent)
        return undefined
      }
    },
    content() {
      return this.mode === 'maps' ? this.$store.getters.mapIds() : this.$store.getters.taskIds()
    },
  },
  methods: {
    t(slug) { return this.$store.getters.t(slug) },
    save() {
      const swapId = this.modalContent
      const type = (this.mode === 'tasks') ? 'task' : 'map'
      this.$store.dispatch('save', { swapId, type })
      this.closeModal()
    },
    async copyAndLaunchCustomizer(id) {
      const newId = await this.$store.dispatch('copy', id)
      this.launchCustomizer(newId)
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
      const { isConfirmed } = await confirmDeleteSwal(this.t)
      if (isConfirmed) {
        this.$store.dispatch('delete', this.modalContent)
        this.closeModal()
      }
    },
    async confirmCloseModal() {
      if (!this.editing) this.closeModal()
      else {
        const { isConfirmed } = await confirmCloseWithoutSaveSwal(this.t)
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
  transition: fill 200ms;
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
  flex-wrap: wrap;
  align-content: flex-start;
}
.sidebar {
  border-right: 2px solid #ddd;
  background: #f5f5f5;
  padding: 20px;
}
.direct-to-sequence-builder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  font-size: 1.1rem;
}
.direct-to-sequence-builder h3 { margin: 0; }
.direct-to-sequence-builder > * {
  width: 500px;
  text-align: center;
  margin: 16px 0;
}
.direct-to-sequence-builder .pila-link {
  text-decoration: none;

}
.pila-link {
  display: inline-block;
  width: unset;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.pila-link:hover {
  background-color: #0056b3;
}
.pila-link a {
  text-decoration: none;
  color: inherit;
}
.content-card
{
  border: 2px solid white;
  background: white;
  cursor: grab;
}
.content-card:hover
{
  border: 2px solid #BBBBBB;
  background: white;
}
</style>