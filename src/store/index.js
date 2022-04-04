import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { v4 as uuid } from 'uuid'
import taskIds from './taskIds'
import mapIds from './mapIds'


// TEEEESTING
// import { db } from '@/firebase/config'
// import { doc, setDoc } from "firebase/firestore"

// const writeMapsToFirestore = async () => {
//   try {
//     Object.entries(maps).forEach( async entry => {
//       // each entry looks like this [ id, mapObject ] ...
//       const id = entry[0]
//       const mapData = JSON.stringify(entry[1])
//       const documentLocationAndId = doc(db, "maps", id)
//       await setDoc(documentLocationAndId, { src: mapData })
//     })
//   } catch (e) {
//     console.log('Error in writeAll', e)
//   }
// }
// writeMapsToFirestore()

// import { db } from '@/firebase/config'
// import { collection, getDocs } from 'firebase/firestore'

// const getCollection = async (colName) => {
//   try {
//     const colRef = collection(db, colName)
//     const docs = await getDocs(colRef, colName)
//     docs.forEach(doc => {
//       const parsedData = JSON.parse(doc.data().src)
//       console.log(doc.id, parsedData)
//     })
//   } catch (e) {
//     console.error("Error getting colRef", e);
//   }
// // }
// getCollection('tasks')

import { db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const getItems = async (docIds, colName, callback) => {
  try {
    const docsObj = {}
    const docRefs = docIds.map(id => doc(db, colName, id) )
    const docPromises = docRefs.map(ref => getDoc(ref))
    const docs = await Promise.all(docPromises)
    docs.forEach(doc => docsObj[doc.id] = doc.data() )
    callback( docsObj )
  } catch (e) {
    console.warn('Error in getItems', e)
  }
}

getItems(taskIds, 'tasks', r => { console.log(r) } )

// ENDNNNND TESSTING


const copy = x => JSON.parse(JSON.stringify(x))

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'the-karel-project-1.5',
  reducer: state => ({
    favorites: state.favorites,
    completed: state.completed,
  }),
})

export default createStore({
  state: {
    taskIds: [ ...taskIds ],
    mapIds: [ ...mapIds ],
    favorites: [ ],
    completed: [ ],
    loadedContent: {},
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
      if (getters.type(id) === 'map') return getters.map(id).name
      else if (getters.type(id) === 'task') return getters.task(id).name
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
    updateCustomizerState: (state, data) => state.customizerState = data,
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

    save: ({ commit,getters }, swapId)  => {
      const newId = uuid()
      const savePayload = {
        id: newId,
        data: getters.customizerState()
      }
      if (swapId === 'newTask') {
        commit('saveTask', savePayload)
      } else if (swapId === 'newMap') {
        commit('saveMap', savePayload)
      } else if (getters.type(swapId) === 'task') {
        commit('saveTask', savePayload)
        commit('delete', swapId)
      } else if (getters.type(swapId) === 'map') {
        commit('saveMap', savePayload)
        commit('delete', swapId)
      }
      return newId
    },

    copy: ({ commit, getters }, id) => {
      const type = getters.type(id)
      let data, mutation
      if (type === 'task') {
        data = getters.task(id)
        mutation = 'saveTask'
      } else if (type === 'map') {
        data = getters.map(id)
        mutation = 'saveMap'
      } else {
        console.warn('copy failed, unknown type of id: ', id)
      }
      data = copy(data)
      data.name = "Copy of " + data.name
      const newId = uuid()
      const savePayload = { data, id: newId }
      commit(mutation, savePayload)
      return newId
    },

    updateCustomizerState: ({ commit }, data) => commit('updateCustomizerState', data),

    delete: ({ commit }, id) => commit('delete', id),

    toggleFavorite: ({ commit }, id) => commit('toggleFavorite', id),

    taskComplete: ({ commit }, id) => commit('taskComplete', id)

  },
  plugins: [vuexLocal.plugin]
})
