import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { v4 as uuid } from 'uuid'
import tasks from './tasks'
import maps from './maps'
import defaultNewTaskState from './defaultNewTaskState'
import defaultNewMapState from './defaultNewMapState'

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
    completed: [ ],
    expertIds: [ ...Object.keys(tasks), ...Object.keys(maps) ],
    customizerState: null
  },
  getters: {
    tasks: state => () => Object.keys(state.tasks),
    maps: state => () => Object.keys(state.maps),
    customizerState: state => () => state.customizerState,
    filteredTasks: (state, getters) => ({ subStr, favorites }) => {
      return Object.entries(state.tasks)
        .filter(([ , task]) => task.name.toLowerCase().includes(subStr.toLowerCase()))
        .filter(([id]) => favorites ? getters.isFavorite(id) : true)
        .map(([id]) => id)
    },
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
    isExpert: state => id => state.expertIds.includes(id),
    isFavorite: state => id => state.favorites.includes(id),
    taskIsComplete: state => id => state.completed.includes(id),
    mapIsComplete: (_state, getters) => id => {
      const mapData = getters.map(id)
      const mapTasks = Object.values(mapData.graph.nodes).map(nodeData => nodeData.taskId)
      return mapTasks.every(taskId => getters.taskIsComplete(taskId))
    }
  },
  mutations: {
    newMap: (state, id) => state.maps[id] = defaultNewMapState,
    newTask: (state, id) => state.tasks[id] = defaultNewTaskState,
    updateCustomizerState: (state, data) => { 
      console.log('inside mutation setting custState', data)
      state.customizerState = data
    },
    saveMap:  (state, { id, data } ) => state.maps[id] = data,
    saveTask: (state, { id, data }) => state.tasks[id] = data,
    delete: (state, id) => {
      if (state.maps[id]) {
        delete state.maps[id]
        state.maps = { ...state.maps }
      } else if (state.tasks[id]) {
        delete state.tasks[id]
        state.tasks = { ...state.tasks }
      } else {
        console.warn(`attempting to delete id not found in maps or tasks, ${id}`)
      }
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

    save: ({ commit,getters }, swapId)  => {
      console.log('customizer state before save', getters.customizerState())
      const savePayload = {
        id: uuid(),
        data: getters.customizerState()
      }
      const type = getters.type(swapId) // id of the type we are replacing
      if (type === 'map') {
        console.log('saving map')
        console.log('savePayload:', savePayload)
        commit('saveMap', savePayload)
      }
      else commit('saveTask', savePayload)

      commit('delete', swapId)
    },

    updateCustomizerState: ({ commit }, data) => commit('updateCustomizerState', data),
    delete: ({ commit }, id) => commit('delete', id),

    toggleFavorite: ({ commit }, id) => commit('toggleFavorite', id),

    taskComplete: ({ commit }, id) => commit('taskComplete', id)

  },
  plugins: [vuexLocal.plugin]
})
