import { createStore } from 'vuex'
import tasks from './tasks'
import maps from './maps'

export default createStore({
  state: {
    karelTasks: { ...tasks },
    karelMaps: { ...maps }
  },
  mutations: {
  
  },
  actions: {
  },
  modules: {
  }
})
