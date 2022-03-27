import { createStore } from 'vuex'
import tasks from './tasks'
import maps from './maps'
import { v4 as uuid } from 'uuid'

export default createStore({
  state: {
    karelTasks: { ...tasks },
    karelMaps: { ...maps }
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
    }
  },
  mutations: {
    addMap: (state,payload) => state.karelMaps[uuid()] = payload,
    addTask: (state, payload) => state.karelTasks[uuid()] = payload,
  },
  actions: {
  },
  modules: {
  }
})
