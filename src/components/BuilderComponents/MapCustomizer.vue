<template>
  <div id="wrapper">
    <div id="sidebar">
      <button class="karel-button how-to-button" @click="launchHowTo">How to Use</button>

      <div class="filter-search-wrapper">
          <h3>Task Filters</h3>
          <input placeholder="Search" v-model="nameFilter">

          <div>
            <input class="search" id="fav" type="checkbox" v-model="favoritesFilter">
            <label class="fav-label" for="fav">
              <span>Favorite</span>
              <svg fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            </label>
          </div>

          <div>
            <input id="user" v-model="userTasksOnlyFilter" type="checkbox">
            <label for="user">Your Creations Only</label>
          </div>
        
      </div>
      <!-- End Filters Section of SideBar -->

      <div class="task-choices-wrapper">
        <h3>Task List</h3>
        <div
          v-for="task in $store.getters.filteredTasks({ subStr: nameFilter, favorites: favoritesFilter, userTasksOnly: userTasksOnlyFilter })"
          :key="`task-select-${task}`"
          class="task-choice"
          draggable="true"
          @dragstart="event => event.dataTransfer.setData('text/plain', task)"
        >
          <TranslateId :id="$store.getters.name(task)" />
        </div>
      </div>

    </div>
    <!-- End Sidebar -->
    
    <div id="build-area">
      
      <div id="build-area-navbar">
        <img id="kl-logo">
        <div class="map-name-wrapper">
          <span class="rename-map-icon" @click="launchRenameMapSwal">✎</span>
          <h3 class="title">{{ name || 'Name Your Karel Map' }}</h3>
        </div>

        <!-- Empty div so no css changes needed... haha -->
        <div></div>
		
      </div>
      
      <div id="graph-area">
        <MapGraph
          :editMode="true"
          :graph="graph"
          @change="graph = $event"
          :selected="selected"
          @selectId="selected = $event"
        />
      </div>

    </div>
  </div>
</template>

<script>
import MapGraph from '../MapPlayer/MapGraph/index.vue'
import TranslateId from '../TranslateId.vue'
import { renameMapSwal, howToUseMapCustomizerSwal } from '../../helpers/projectSwallows.js'
import defaultNewMapState from '../../store/defaultNewMapState.js'
import { validate as isUuid } from 'uuid'

const copy = x => JSON.parse(JSON.stringify(x))

export default {
  components: { MapGraph, TranslateId },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async created() {
    // TODO:  look for translations
    const translationsForIdInLanguage = false
    if (translationsForIdInLanguage) {
      // TODO inject translations for instructions, hint, name, and methods
    } else { 
      // fallback, get and inject initial strings for uuid translation breadcrumbs
      const source_string_map = (await Agent.query('targets_for_parent', [this.id]))
        .reduce((acc,{id, source_string}) => {
          return { ...acc, [id]: source_string }
        }, {})
      const fields = ['name']
      fields
        .filter(field => isUuid(this[field]) && !!source_string_map[this[field]])
        .forEach(field => this[field] = source_string_map[this[field]])
    }
  },
  data() {
    const mapAtId = this.$store.getters.content(this.id)
    const mapToStartCustomizingFrom = mapAtId ? copy(mapAtId) : copy(defaultNewMapState)

    const { graph, name } = mapToStartCustomizingFrom
    return {
      graph,
      name,
      nameFilter: '',
      favoritesFilter: false,
      userTasksOnlyFilter: false,
      selected: null
    }
  },
  watch: {
    graph: {
      deep: true,
      handler() { this.edit() }
    }
  },
  methods: {
    t(slug) { return this.$store.getters.t(slug) },
    launchHowTo() {
      howToUseMapCustomizerSwal(this.t)
    },
    async launchRenameMapSwal() {
      const res = await renameMapSwal(this.t, this.name)
      if (res.value) {
        this.name = res.value
        this.edit()
      }
    },
    edit() {
      const { graph, name } = this
      this.$store.dispatch('updateCustomizerState', copy({ graph, name }) )
    },
    removeFilters() {
        this.nameFilter = ''
        this.favoritesFilter = false
      },
  }
}

</script>

<style scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  width: 220px;
  background: whitesmoke;
  overflow: hidden;
}
.filter-search-wrapper {
  padding: 6px 0;
  margin: 6px 0;
  border-bottom: 1px solid lightgrey;
}
.filter-search-wrapper h3 {
  margin: 2px 0;
}
.task-choices-wrapper {
    overflow: auto;
}
.task-choices-wrapper h3 {
  margin: 0 0 8px 0;
}
.task-choices-wrapper .task-choice {
  background: white;
  border: 1px solid darkgray;
  margin: 4px 6px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.task-choices-wrapper .task-choice:hover {
  background: rgb(246, 246, 246);

}
.fav-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;

}
.fav-label svg {
  height: 20px;
  margin-left: 6px;
}

.how-to-button {
  background: #7066e0;
}

#wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}
#build-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
#build-area-navbar {
  display: flex;
  height: 52px;
  padding: 6px;
  background: whitesmoke;
  justify-content: space-between;
  align-items: center;
}
#build-area-navbar #pila-logo {
  height: 20px;
}
#build-area-navbar h3 { margin: 0 }
#build-area-navbar svg{
  height: 20px;
  margin-bottom: 5px;
}
#build-area-navbar .map-name-wrapper { display: flex; }
#build-area-navbar .rename-map-icon {
  margin-right: 6px;
  cursor: pointer;
}
#build-area-navbar .rename-map-icon:hover {
  color: blue;
}
#build-area-navbar .nav-icons-wrapper {
  display: flex;
  min-width: 200px; /* with flex-end keeps title from moving too much */
  justify-content: flex-end;
}
#build-area-navbar .nav-icons-wrapper > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 70px;
}
#build-area-navbar .nav-icons-wrapper > div.clickable {
  cursor: pointer;
}
#graph-area {
  position: relative;
  flex-grow: 1;
}
.search-result {
  padding: 8px;
}
</style>