import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { v4 as uuid } from 'uuid'
import expertTaskIds from './taskIds.js'
import expertMapIds from './mapIds.js'
import mapIdToDifficulty from './mapIdToDifficulty.js'

const copy = x => JSON.parse(JSON.stringify(x))

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'the-karel-project-2.5',
  reducer: state => ({
    favorites: state.favorites,
    completed: state.completed,
    expertIds: state.expertIds,
    loadedContent: state.loadedContent,
    mapIds: state.mapIds,
    taskIds: state.taskIds
  }),
})

export default createStore({
  state: {
    loading: true,
    language: null,
    loadedContent: {},
    mapIds: [ ...expertMapIds ],
    taskIds: [ ...expertTaskIds ],
    favorites: [ ],
    completed: [ ],
    expertIds: [ ],
    mapIdToDifficulty,
    customizerState: null,
    translations: {}
  },
  getters: {
    loading: state => () => state.loading,
    loadedContent: state => () => state.loadedContent,
    translation: state => target => {
      const lang = state.language
      const found = state.translations[target] && state.translations[target][lang] && state.translations[target][lang].value
      return found ? state.translations[target][lang].value : `${lang} translation not found for ${target}`
    },
    language: state => () => state.language,
    mapIds: state => () => state.mapIds,
    mapIdsByDifficulty: state => difficulty => {
      const validChoices = [ 'Beginner', 'Intermediate', 'Advanced' ]
      if (validChoices.includes(difficulty)) {
        return state.mapIds.filter(id => mapIdToDifficulty[id] === difficulty)
      } else {
        // for user built, return all map ids without difficulty label
        return state.mapIds.filter(id => !mapIdToDifficulty[id])
      } 
    },
    taskIds: state => () => state.taskIds,
    mapDifficulty: state => id => state.mapIdToDifficulty[id],
    embeddedTaskIds: state => () => {
      let output = []
      state.mapIds.forEach(mapId => {
        const mapContent = state.loadedContent[mapId]
        if (mapContent) {
          const nodes = mapContent.graph.nodes
          const taskIds = Object.values(nodes).map(nodeVal => nodeVal.taskId)
          output = [...output, ...taskIds]
        }
      })
      return output
    },
    customizerState: state => () => state.customizerState,
    filteredTasks: (state, getters) => ({ subStr, favorites, userTasksOnly }) => {
      return state.taskIds
        .filter(id => state.loadedContent[id].name.toLowerCase().includes(subStr.toLowerCase()))
        .filter(id => favorites ? getters.isFavorite(id) : true)
        .filter(id => userTasksOnly ? !getters.isExpert(id) : true)
    },
    content: state => id => state.loadedContent[id],
    name: ( _state, getters) => id => {
      return getters.content(id).name
    },
    type: state => id => {
      if (state.taskIds.includes(id)) return 'task'
      else if (state.mapIds.includes(id)) return 'map'
      else return null
    },
    isExpert: state => id => state.expertIds.includes(id),
    isFavorite: state => id => state.favorites.includes(id),
    taskIsComplete: state => id => state.completed.includes(id),
    mapIsComplete: (_state, getters) => id => {
      const mapData = getters.content(id)
      const mapTasks = Object.values(mapData.graph.nodes).map(nodeData => nodeData.taskId)
      return mapTasks.every(taskId => getters.taskIsComplete(taskId))
    }
  },

  mutations: {
    addTranslation: (state, { id, value }) => state.translations[id] = value,
    language: (state, value) => state.language = value,
    setLoading: (state, bool) => state.loading = bool,
    addToMapIds: (state, id) => !state.mapIds.includes(id) && state.mapIds.push(id), 
    saveToLocalContent: (state, { data, id, type }) => {
      // action has already pushed optimistic save to firestore
      state.loadedContent[id] = data
      state.loadedContent = { ...state.loadedContent }
      if (type === 'map' && !state.mapIds.includes(id)) state.mapIds.push(id)
      if (type === 'task' && !state.taskIds.includes(id)) state.taskIds.push(id)
    },
    updateCustomizerState: (state, data) => state.customizerState = data,
    addToExpertIds: (state, id) => {
      if (!state.expertIds.includes(id)) state.expertIds.push(id)
    },
    delete: (state, id) => {
      state.mapIds  = state.mapIds.filter(mapId => mapId !== id)
      state.taskIds = state.taskIds.filter(taskId => taskId !== id)
      delete state.loadedContent[id]
      state.loadedContent = { ...state.loadedContent }
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
    setLoading: ({ commit }, bool) => commit('setLoading', bool),

    loadContent: async ({ getters, commit, dispatch }) => {
      const allMapIds = getters.mapIds()
      let allTaskIds = [ ...getters.taskIds() ]
      getters.embeddedTaskIds().forEach(id => {
        if (!allTaskIds.includes(id)) allTaskIds.push(id)
      })
    
      const allIds = [ ...allMapIds, ...allTaskIds]

      // look for translation targets under all ids
      const translationTargetsForItems = await Promise.all(
        allIds.map(
          id => Core.send({
            type: 'state',
            user: 'assertionsv3',
            domain: 'internal',
            scope: `links-${id}`
          })
        )
      )
      const translationTargets = translationTargetsForItems.reduce((acc, itemArray) => {
        // filter needed because the group membership can be present but FALSE
        const arrayToAdd = Object.keys(itemArray.state).filter(id => itemArray.state[id])
        return [ ...acc, ...arrayToAdd ]
      }, [])

      const fetchedTranslations = await Promise.all(
        translationTargets.map(
          id => Core.send({
            type: 'state',
            user: 'assertionsv3',
            domain: 'internal',
            scope: `translations-${id}`
          })
        )
      )

      fetchedTranslations.forEach((fetchedTranslation, i) => {
        const targetId = translationTargets[i]
        commit('addTranslation', { id: targetId, value: fetchedTranslation.state })
      })

      // load the content itself
      const neededIds = allIds.filter(id => !Object.keys(getters.loadedContent()).includes(id))
      if (!neededIds.length) return
      
      try {
        const docs = await Promise.all(
          neededIds.map(id => Core.download(id).then(r => r.json()))
        )
        docs.forEach((doc, i) => {
          const id = neededIds[i]
          if (doc.isExpert) dispatch('addToExpertIds', id)
          dispatch('saveToLocalContent', { id, data: doc })
        })
        return dispatch('loadContent')
      } catch (e) {
        console.warn('Error in getItems', e)
      }
    },
    
    addToExpertIds: ({ commit }, id) => commit('addToExpertIds', id),
    save: async ({ commit, dispatch, getters }, { swapId, type })  => {
      const newId = uuid()
      const payload = { type, id: newId, data: copy(getters.customizerState()) }
      commit('saveToLocalContent', payload)
      dispatch('saveToRemoteContent', payload)
      if (swapId) commit('delete', swapId)
      return newId
    },
    saveToLocalContent: ({ commit }, payload) => commit('saveToLocalContent', payload),
    saveToRemoteContent: async ({ getters }, {id, data}) => {
      try {
        let type
        if (getters.type(id) === 'task') {
          type = 'application/json;type=karel-task;v=1.0.0'
        }
        else {
          type = 'application/json;type=karel-map;v=1.0.0'
        }

        const md = { name: data.name, id, type }

        // create translation page for content
        const { state: assertions } = await Core.send({ type: 'state', scope: 'assertions.v.3.0', mutable: true })

        const makeAssertion = (path, value) => assertions[uuid()] = { path, value, ts: Date.now() }

        const { name, instructions, hint } = data

        data.name = uuid()
        data.instructions = uuid()
        data.hint = uuid()

        const lang = getters.language()

        //  create translations assertions for the three fields above
        makeAssertion(`translations/${data.name}/${lang}`, name)
        makeAssertion(`translations/${data.instructions}/${lang}`, instructions)
        makeAssertion(`translations/${data.hint}/${lang}`, hint)

        makeAssertion(`sourceLanguage/${data.name}/lang`, lang)
        makeAssertion(`sourceLanguage/${data.instructions}/lang`, lang)
        makeAssertion(`sourceLanguage/${data.hint}/lang`, lang)

        makeAssertion(`links/${id}/${data.name}`, true)
        makeAssertion(`links/${id}/${data.instructions}`, true)
        makeAssertion(`links/${id}/${data.hint}`, true)

        // TODO: swap translatable parts of blockly workspace and toolbox with uuids (recognize with regex)
        const { workspace, toolbox } = data.karelBlockly
        console.log('TODO: swap translatable parts for uuids!!!!!!', id, workspace, toolbox)


        const content = JSON.stringify(data)
        await Core.upload(md, content)
      } catch (e) {
        console.warn('Error in writeAll', e)
      }
    },
    copy: ({ getters, commit, dispatch }, id) => {
      const data = copy(getters.content(id))
      data.name = "Copy of " + data.name
      const newId = uuid()
      const type = getters.type(id)
      commit('saveToLocalContent', { type, data, id: newId })
      dispatch('saveToRemoteContent', { data, id: newId })
      return newId
    },
    loadMapAndEmbedded: async ({ dispatch, commit }, id) => {
      // verify it loads and is a map
      if (!id) return Promise.reject(new Error('cannot load map with falsey id'))

      try {
        const content = await Core.download(id).then(r => r.json())
        if (!content.graph) throw new Error('Map not in schema!')
        commit('addToMapIds', id)
        await dispatch('loadContent')
      }
      catch (e) {
        return Promise.reject(new Error('map not found or result failed map schema test'))
      }
    },

    updateCustomizerState: ({ commit }, data) => commit('updateCustomizerState', data),

    delete: ({ commit }, id) => commit('delete', id),

    toggleFavorite: ({ commit }, id) => commit('toggleFavorite', id),

    taskComplete: ({ commit }, id) => commit('taskComplete', id),

    language: ({ commit }, value) => commit('language', value)

  },
  plugins: [vuexLocal.plugin]
})
