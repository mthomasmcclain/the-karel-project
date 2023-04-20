import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { v4 as uuid } from 'uuid'
import expertTaskIds from './expertTaskIds.js'
import expertMapIds from './expertMapIds.js'
import mapIdToDifficulty from './mapIdToDifficulty.js'
import { extractTranslationsForBlocklyWorkspaceUserMethods } from '../helpers/translateBlocklyWorkspaceUserMethods.js'
import translationSlugMap from './translationSlugMap.js'

const copy = x => JSON.parse(JSON.stringify(x))
const TASK_TYPE = 'application/json;type=karel-task;v=1.0.0'
const MAP_TYPE = 'application/json;type=karel-map;v=1.0.0'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'the-karel-project-2.10',
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
  plugins: [
    vuexLocal.plugin
  ],
  state: {
    loading: true,
    language: null,
    loadedContent: {},
    mapIds: [ ...expertMapIds ],
    taskIds: [ ...expertTaskIds ],
    favorites: [ ],
    completed: [ ],
    expertIds: [ ...expertMapIds, ...expertTaskIds ],
    mapIdToDifficulty,
    customizerState: null,
    translations: {},
    translationGroups: {}, // { [id] : Array of target ids }
  },
  getters: {
    loading: state => () => state.loading,
    loadedContent: state => () => state.loadedContent,
    translation: state => target => {
      // incoming 'target' can be slug (for app stuff) or raw id (for item stuff)
      const isSlug = translationSlugMap[target]
      const id = isSlug ? translationSlugMap[target]: target

      // HAAAACK to render sourceLangague for target if translation not found
      // What I SHOULD do is grab the sourceLanguage map in the loadTranslations action
      //  ... and mirror that into a store, and reference it if the requested one not found.
      // ... proably also surface a console.warn that requested lang not found, falling back
      // INSTEAD we'll just rely on the fact that we only are in EN or PT for now

      // Prev code (no default to sourceLanguage)
      // const lang = state.language
      // const found = state.translations[id] && state.translations[id][lang] && state.translations[id][lang].value
      // return found ? state.translations[id][lang].value : `${lang} translation not found for ${id}`

      let lang = state.language
      let found = state.translations[id] && state.translations[id][lang] && state.translations[id][lang].value
      if (found) return state.translations[id][lang].value
      lang = (lang === 'pt') ? 'en' : 'pt'
      found = state.translations[id] && state.translations[id][lang] && state.translations[id][lang].value
      if (found) return state.translations[id][lang].value
      return `translation for ${id} not found`

    },
    translationGroups: state => () => state.translationGroups,
    translationGroup: state => id => state.translationGroups[id],
    language: state => () => state.language,
    mapIds: state => () => state.mapIds,
    mapIdsByDifficulty: state => difficulty => {
      const validChoices = [ 'beginner', 'intermediate', 'advanced' ]
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
      return state.mapIds.reduce((acc, mapId) => {
        const mapContent = state.loadedContent[mapId]
        if (!mapContent) return acc
        const nodes = mapContent.graph.nodes
        const newTaskIds = Object.values(nodes)
          .map(nodeVal => nodeVal.taskId)
          .filter(id => !acc.includes(id))
        return [ ...acc, ...newTaskIds ]
      }, [])
    },
    customizerState: state => () => state.customizerState,
    filteredTasks: (state, getters) => ({ subStr, favorites, userTasksOnly }) => {
      return state.taskIds
        .filter(id => state.loadedContent[id].name.toLowerCase().includes(subStr.toLowerCase()))
        .filter(id => favorites ? getters.isFavorite(id) : true)
        .filter(id => userTasksOnly ? !getters.isExpert(id) : true)
    },
    content: state => id => state.loadedContent[id],
    name: ( _, getters) => id => {
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
    addTranslationGroup: (state, { groupId, members }) => state.translationGroups[groupId] = members,
    language: (state, value) => state.language = value,
    setLoading: (state, bool) => state.loading = bool,
    addToMapIds: (state, id) => !state.mapIds.includes(id) && state.mapIds.push(id), 
    saveToLocalContent: (state, { data, id, type }) => {
      // action pushes optimistic save to Core
      state.loadedContent[id] = data
      state.loadedContent = { ...state.loadedContent }
      if (type === 'map' && !state.mapIds.includes(id)) state.mapIds.push(id)
      if (type === 'task' && !state.taskIds.includes(id)) state.taskIds.push(id)
    },
    updateCustomizerState: (state, data) => state.customizerState = data,
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

    loadContent: async ({ getters, dispatch }) => {
      // fires twice if needed, because embedded tasks wont surface until map embedding themloads
      const allMapIds = getters.mapIds()
      let allTaskIds = [ ...getters.taskIds() ]
      getters.embeddedTaskIds().forEach(id => {
        if (!allTaskIds.includes(id)) allTaskIds.push(id)
      })    
      const allIds = [ ...allMapIds, ...allTaskIds]
      const neededIds = allIds.filter(id => !Object.keys(getters.loadedContent()).includes(id))
      if (!neededIds.length) return
      try {
        const docs = await Promise.all(
          neededIds.map(id => Core.download(id).then(r => r.json()))
        )
        docs.forEach((doc, i) => {
          const id = neededIds[i]
          // TODO ??? why no type here? fetch type and resurface so loadign foreign will work
          // i THINK it works now only because for our OWN we push and fetch from localStorage
          dispatch('saveToLocalContent', { id, data: doc })
        })
        return dispatch('loadContent')
      } catch (e) {
        console.warn('Error in getItems', e)
      }
    },

    loadTranslations: async ({ getters, commit }) => {
      // assumes embedded task content loaded
      const allIds = Array.from(
        new Set([
          ...getters.taskIds(),
          ...getters.mapIds(),
          ...getters.embeddedTaskIds()
        ])
      )
      const translationTargetsForItems = await Promise.all(
        allIds.map(
          id => Core.send({
            type: 'state',
            user: 'assertionsv31',
            domain: 'internal',
            scope: `links-${id}`
          })
        )
      )
      translationTargetsForItems.forEach(({state}, i) => {
        if (state) {
          const groupId = allIds[i]
          const members = Object.keys(state).filter(id => state[id].value)
          commit('addTranslationGroup', { groupId, members })
        }
      })

      // translation targets from items (the group is the task or map id)
      const translationTargets = Object.values(getters.translationGroups())
        .reduce((acc,item) => [ ...acc, ...item], [])

      // add translationTargets for app level stuff
      Object.values(translationSlugMap).forEach( id => translationTargets.push(id) )

      const fetchedTranslations = await Promise.all(
        translationTargets.map(
          id => Core.send({
            type: 'state',
            user: 'assertionsv31',
            domain: 'internal',
            scope: `translations-${id}`
          })
        )
      )
      fetchedTranslations.forEach((fetchedTranslation, i) => {
        const targetId = translationTargets[i]
        commit('addTranslation', { id: targetId, value: fetchedTranslation.state })
      })
    },
    
    save: async ({ dispatch, commit, getters }, { swapId, type })  => {
      const newId = uuid()
      const payload = { type, id: newId, data: copy(getters.customizerState()) }
      if (type === 'task') {
        dispatch('saveTaskAndTranslations', payload)
      } else if (type === 'map') {
        dispatch('saveMapAndTranslations', payload)
      } else {
        console.warn('save of unknown type: ', type)
      }
      if (swapId) commit('delete', swapId)
      return newId
    },
    saveTaskAndTranslations: async ({ getters, commit, dispatch }, { type, id, data }) => {
      try {
        // 0. grab strings for use after change (method names got from workspace extract)
        const { name, instructions, hint } = data

        // 1. update task fields within data to uuids in place
        data.name = uuid()
        data.instructions = uuid()
        if (data.hint) data.hint = uuid()
        const { workspace, userMethods } = extractTranslationsForBlocklyWorkspaceUserMethods(data.karelBlockly.workspace)
        data.karelBlockly.workspace = workspace

        // 2. save local
        dispatch('saveToLocalContent', { id, type, data })

        // 3. save remote
        const md = { name: data.name, id, type: TASK_TYPE }
        const content = JSON.stringify(data)
        await Core.upload(md, content)

        const lang = getters.language()
        // 4. optimistically update translations in local store
        commit('addTranslation', { id: data.name , value: { [lang] : { value: name } } })
        commit('addTranslation', { id: data.instructions, value: { [lang]: { value: instructions } } })
        if (data.hint) commit('addTranslation', { id: data.hint, value: { [lang]: { value: hint } } })
        Object.entries(userMethods).forEach(([targetId, methodString]) => {
          commit('addTranslation', { id: targetId, value: { [lang] : { value: methodString }} })
        })
        let members = [ ...Object.keys(userMethods), data.name, data.instructions ]
        if (data.hint) members.push(data.hint)
        commit('addTranslationGroup', { groupId: id, members } )

        //  5. update translations for agent (populated to store on reload)
        const { state: assertions } = await Core.send({ type: 'state', scope: 'assertionsv31', mutable: true })
        const makeAssertion = (path, value) => assertions[uuid()] = { path, value, ts: Date.now() }

        makeAssertion(`translations/${data.name}/${lang}`, name)
        makeAssertion(`translations/${data.instructions}/${lang}`, instructions)
        if (data.hint) makeAssertion(`translations/${data.hint}/${lang}`, hint)

        makeAssertion(`sourceLanguage/${data.name}/lang`, lang)
        makeAssertion(`sourceLanguage/${data.instructions}/lang`, lang)
        if (data.hint) makeAssertion(`sourceLanguage/${data.hint}/lang`, lang)

        makeAssertion(`links/${id}/${data.name}`, true)
        makeAssertion(`links/${id}/${data.instructions}`, true)
        if (data.hint) makeAssertion(`links/${id}/${data.hint}`, true)

        Object.entries(userMethods).forEach(([translationId, methodName]) => {
          makeAssertion(`translations/${translationId}/${lang}`, methodName)
          makeAssertion(`sourceLanguage/${translationId}/lang`, lang)
          makeAssertion(`links/${id}/${translationId}`, true)
        })
      } catch (e) {
        console.warn('Error in saveTaskAndTranslations', e)
      }
    },
    saveMapAndTranslations: async ({ dispatch, commit, getters }, { id, type, data }) => {
      try {
        // 0. grab name for use after uuid replace
        const { name } = data

        // 1. update name fields within data to uuids in place
        data.name = uuid()

        // 2. save local
        dispatch('saveToLocalContent', { id, type, data })

        // 3. save remote
        const md = { name: data.name, id, type: MAP_TYPE }
        const content = JSON.stringify(data)
        await Core.upload(md, content)

        const lang = getters.language()
        // 4. optimistically update translations in local store
        commit('addTranslation', { id: data.name, value: { [lang]: { value: name } } })
        commit('addTranslationGroup', {
          groupId: id,
          members: [ data.name ]
        })

        //  5. update translations for agent (populated to store on reload)
        const { state: assertions } = await Core.send({ type: 'state', scope: 'assertionsv31', mutable: true })
        const makeAssertion = (path, value) => assertions[uuid()] = { path, value, ts: Date.now() }

        makeAssertion(`translations/${data.name}/${lang}`, name)
        makeAssertion(`sourceLanguage/${data.name}/lang`, lang)
        makeAssertion(`links/${id}/${data.name}`, true)

      } catch (e) {
        console.warn('Error in saveMapAndTranslations', e)
      }
    },
    saveToLocalContent: ({ commit }, payload) => commit('saveToLocalContent', payload),
    copy: ({ getters, dispatch }, id) => {
      const data = copy(getters.content(id))
      data.name = "Copy of " + data.name
      const newId = uuid()
      const type = getters.type(id)
      dispatch('save', { type })
      return newId
    },
    loadMapAndEmbedded: async ({ dispatch, commit }, id) => {
      // verify it loads and is a map
      if (!id) return Promise.reject(new Error('Cannot load map with falsey id.'))

      try {
        const { metadata } = await Core.send({ type: 'metadata', id })
        if (!metadata.type === MAP_TYPE) throw new Error('Id not of valid map type.')

        commit('addToMapIds', id)
        await dispatch('loadContent')
        await dispatch('loadTranslations')
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

})
