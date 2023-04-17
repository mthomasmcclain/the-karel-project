<template>
  <div
    class="task-card"
    draggable="true"
    @dragstart="event => event.dataTransfer.setData('text/plain', id)"
  >

    <div class="title">{{ t(content.name) }}</div>

    <div class="author">
      <PILALogo
        v-if="$store.getters.isExpert(id)"
        class="pila-svg"
      />
      <UserIcon v-else class="user-svg" color="salmon" />
    </div>

    <div v-if="contentType === 'task'" class="preview-area">
      <div class="preview-col-wrapper">
        <div class="col-title"> {{ t('start' )}}: </div>
        <karel-world-renderer :world="preWorld" />
      </div>
      <div class="preview-col-wrapper">
        <div class="col-title"> {{ t('goal' )}}: </div>
        <karel-world-renderer :world="postWorld" />
      </div>
    </div>
    <div v-else class="preview-area">
      <GraphPreview :graph="content.graph" />
    </div>

    <div class="tags" v-if="contentType === 'task'">
      <div class="tag"
        v-for="(tag,i) in tags"
        :key="`tag-${i}`"
      >
        {{ t(tag) }}
      </div>
    </div>
    <div class="tags" v-else>
       <button class="get-code-btn" @click="getCode"> {{ t('get-code' )}}</button>
    </div>

    <div class="icons">
      <div class="icon-wrapper" @click="$emit('preview', id)">
        <svg fill="grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      </div>
      <div class="icon-wrapper" @click="handleEditRequest(id)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      </div>
      <div class="icon-wrapper" @click="$store.dispatch('toggleFavorite', id)">
        <svg v-if="favorite" fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg v-else fill="grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import GraphPreview from './GraphPreview.vue'
import KarelWorldRenderer from '../KarelWorldRenderer.vue'
import PILALogo from '../../assets/PilaLogoVueSvg.vue'
import UserIcon from '../../assets/UserIconVueSvg.vue'
import { copyContentSwal, copyConfirmSwal, getCodeSwal } from '../../helpers/projectSwallows.js'

export default {
  components: {
    KarelWorldRenderer,
    GraphPreview,
    PILALogo,
    UserIcon
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    favorite() {
      return this.$store.getters.isFavorite(this.id)
    },
    contentType() {
      return this.$store.getters.type(this.id)
    },
    content() {
      return this.$store.getters.content(this.id)
    },
    preWorld() { return this.content.worlds[0].preWorld },
    postWorld() { return this.content.worlds[0].postWorld },
    tags() {
      if (!this.content.tags) return []
      else return [ ...this.content.tags.customTags, ...this.content.tags.systemTags ]
    }
  },
  methods: {
    t(target) { return this.$store.getters.translation(target) },
    getCode() {
      getCodeSwal(this.id)
    },
    async handleEditRequest(id) {
      const isExpert = this.$store.getters.isExpert(id)
      if (!isExpert) this.$emit('edit', id)
      else {
        const { isConfirmed } = await copyContentSwal()
        if (!isConfirmed) return

        await copyConfirmSwal()
        this.$emit('copy', id)
      } 
    }
  }
}
</script>

<style>
.task-card {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 27px 122px 61px;
  grid-gap: 5px;
  grid-template-areas:
    "title   title   title   title   title   title   title   title   title   author  author  author"
    "preview preview preview preview preview preview preview preview preview preview preview preview"
    "tags    tags    tags    tags    tags    tags    tags    tags    icons   icons   icons   icons";
}

.task-card > div {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.title {
  grid-area: title;
  font-size: 1.25em;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.author {
  grid-area: author;
  text-align: right;
  color: grey;
}
.pila-svg {
  height: 20px;
}
.user-svg {
  height: 27px;
}

.preview-area {
  grid-area: preview;
  pointer-events: none;
  display: flex;
  justify-content: space-around;
}
.preview-col-wrapper {
  flex: 1 0 0;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
}
.preview-col-wrapper .col-title {
  font-size: 0.75em;
  color: #444;
}

.tags {
  grid-area: tags;
  font-size: 0.8em;
  display: flex;
  flex-wrap: wrap-reverse;
  align-content: end;
}
.tags .get-code-btn {
    color: #fff;
    background-color: #827fc8;
    border-color: transparent;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .35rem;
}

.tag {
  display: inline-block;
  border-radius: 10px;
  margin: 2px;
  padding: 1px 6px;
  background: green;
  color: white;
  height: 15px;
}

.icons {
  grid-area: icons;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.icon-wrapper,
.inactive-icon-wrapper
{
  width: 32px;
  height: 32px;
  border-radius: 20px;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.inactive-icon-wrapper {
  border: none;
  cursor: auto;
}
.icon-wrapper:hover {
  background: #ffdada;
}

.icon-wrapper > svg {
  width: 75%;
  height: 75%;
}
</style>