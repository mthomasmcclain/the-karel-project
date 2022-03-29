import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import tasks from './tasks'
import maps from './maps'
import defaultNewTaskState from './defaultNewTaskState'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'the-karel-project',
  // reducer: state => ({
  //   favorites: state.favorites,
  //   completed: state.completed
  // }),
})

export default createStore({
  state: {
    tasks: { ...tasks },
    maps: { ...maps },
    favorites: [ ],
    completed: [ ]
  },
  getters: {
    tasks: state => () => Object.keys(state.tasks),
    maps: state => () => Object.keys(state.maps),
    task: state => id => state.tasks[id],
    map: state => id => state.maps[id],
    name: ( _state, getters) => id => {
      return getters.type(id) === 'map' ? getters.map(id).name : getters.task(id).name
    },
    type: ( _state , {task, map} ) => id => {
      if (task(id)) return 'task'
      else if (map(id)) return 'map'
      else return null
    },
    isFavorite: state => id => state.favorites.includes(id),
    taskIsComplete: state => id => state.completed.includes(id),
    mapIsComplete: (_state, getters) => id => {
      const mapData = getters.map(id)
      const mapTasks = Object.values(mapData.graph.nodes).map(nodeData => nodeData.taskId)
      return mapTasks.every(taskId => getters.taskIsComplete(taskId))
    }
  },
  mutations: {
    newMap: (state, id) => {
      state.maps[id] = {
        name: "New Karel Map",
        graph: { edges: {}, nodes: {} }
      }
    },
    newTask: (state, id) => {
      state.tasks[id] = JSON.parse(JSON.stringify(defaultNewTaskState))
    },
    saveMap:  (state, { id, data } ) => state.maps[id] = data,
    saveTask: (state, { id, data }) => state.tasks[id] = data,

    delete: (state, id) => {
      delete state.maps[id]
      delete state.tasks[id]
    },
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
    newMap:  ({ commit }, id) => commit('newMap',  id),
    newTask: ({ commit }, id) => commit('newTask', id),
    saveMap: ({ commit }, data)  => commit('saveMap',  data),
    saveTask: ({ commit }, data) => commit('saveTask', data),
    delete: ({ commit }, id) => commit('delete', id),
    toggleFavorite: ({ commit }, id) => commit('toggleFavorite', id),
    taskComplete: ({ commit }, id) => commit('taskComplete', id)

  },
  plugins: [vuexLocal.plugin]
})
