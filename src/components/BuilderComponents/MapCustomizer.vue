<template>
  <div id="wrapper">
    <div>
      <input v-model="nameFilter" />
      <input type="checkbox" v-model="favoritesFilter" />
      <button @click="removeFilters">Remove Filters</button>
      <div
        v-for="task in $store.getters.filteredTasks({ subStr: nameFilter, favorites: favoritesFilter })"
        :key="`task-select-${task}`"
        draggable="true"
        @dragstart="event => event.dataTransfer.setData('text/plain', task)"
      >
        {{ $store.getters.task(task).name }}
      </div>

    </div>
    
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
import MapGraph from '@/components/MapPlayer/MapGraph'
import { renameMapSwal } from '@/helpers/projectSwallows'
const copy = x => JSON.parse(JSON.stringify(x))

export default {
  components: { MapGraph },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const mapData = this.$store.getters.map(this.id)
    const { graph, name } = copy(mapData)
    return {
      graph,
      name,
      nameFilter: '',
      favoritesFilter: false,
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
    async launchRenameMapSwal() {
      const res = await renameMapSwal(this.name)
      if (res.value) {
        this.name = res.value
        this.edit()
      }
    },
    edit() {
      const data = {
        graph: this.graph,
        name: this.name
      }
      this.$store.dispatch('updateCustomizerState', copy(data) )
    },
    removeFilters() {
        this.nameFilter = ''
        this.favoritesFilter = false
      },
  }
}

</script>

<style scoped>
/* STYLES FOR SHOW-HIDE SEARCH SECTION */
.search-section-to-hide-show,
.show-button,
.hide-button:target
{
  display: none;
}

.hide-button:target + .show-button,
.hide-button:target ~ .search-section-to-hide-show
{
  display: block;
}
.search-toggle-wrapper
{
  padding: 6px;
  margin: 6px;
  border-top:    2px solid darkgrey;
  border-bottom: 2px solid darkgrey;
}
/* END STYLES FOR SHOW-HIDE SEARCH SECTION */

#wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}
#sidebar {
  overflow-y: scroll;
  flex: 0 0 347px;
}
.active-task-sidebar h4 { margin: 12px 0; }
.active-task-sidebar p { margin: 0; font-size: 0.8rem; }
.active-task-sidebar input { margin: 4px 0 16px 0; }
.active-task-sidebar .wrap-card { padding: 6px; }
#build-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
#build-area-navbar {
  display: flex;
  height: 52px;
  padding: 6px;
  background: #e5e5e5;
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