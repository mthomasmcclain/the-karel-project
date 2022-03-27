import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import tasks from './tasks'
import maps from './maps'
import { v4 as uuid } from 'uuid'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'the-karel-project'
})

export default createStore({
  state: {
    karelTasks: { ...tasks },
    karelMaps: { ...maps },
    favorites: [ ],
    completed: [ ]
  },
  getters: {
    tasks: state => () => Object.keys(state.karelTasks),
    maps: state => () => Object.keys(state.karelMaps),

    task: state => id => state.karelTasks[id],
    map: state => id => state.karelMaps[id],
    type: ( _state , {task, map} ) => id => {
      if (task(id)) return 'task'
      else if (map(id)) return 'map'
      else return null
    },
    isFavorite: state => id => state.favorites.includes(id),
    taskIsComplete: state => id => state.completed.includes(id),
    mapIsComplete: (_state, getters) => id => {
      const mapData = getters.map(id)
      const mapTasks = Object.values(mapData.graph.nodes).map(nodeData => nodeData.content)
      return mapTasks.every(taskId => getters.taskIsComplete(taskId))
    }

  },
  mutations: {
    addMap: (state,payload) => state.karelMaps[uuid()] = payload,
    addTask: (state, payload) => state.karelTasks[uuid()] = payload,
    toggleFavorite: (state, id) => {
      const index = state.favorites.indexOf(id)
      if (index === -1) state.favorites.push(id)
      else state.favorites.splice(index, 1)
    },
    taskComplete: (state, id) => {
      const index = state.completed.indexOf(id)
      if (index === -1) state.completed.push(id)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
