import { createStore } from 'vuex'
import { v4 as uuid, validate as isUUID } from 'uuid'
import { karelBlocklyUserMethodsToUUID } from './karelBlocklyUserMethodsToUUID.js'
import translationSlugMap from './translationSlugMap.js'
import languageChoices from './languageChoices.js'
import expertTaskIds from './taskIds.js'
import expertMapIds from './mapIds.js'
import mapIdToDifficulty from './mapIdToDifficulty.js'

const copy = x => JSON.parse(JSON.stringify(x))

const TRANS_DOMAIN = 'translate-karel-alpha.netlify.app'
// DEV DOMAIN FOR TESTING
// const TRANS_DOMAIN = '19188b19-bdaa-4a15-86ee-9bd442a13422.localhost:6061'

export default {
  state: {
    language: null,
    loading: true,
    loadedContent: {},
    translations: {},
    mapIds: [ ...expertMapIds ],
    taskIds: [ ...expertTaskIds ],
    favorites: [ ],
    completed: [ ],
    expertIds: [ ],
    mapIdToDifficulty,
    customizerState: null,
  },
  getters: {
    t: state => slug => {
      const target = translationSlugMap[slug]
      const lang = state.language
      if (!target) return `no slug ${slug}`
      if (!state.translations?.[lang]) return `no translations for ${lang}`
      if (!state.translations[lang][target]) return `${lang} ${slug}`
      else return state.translations[lang][target]
    },
    loading: state => () => state.loading,
    language: state => () => state.language,
    loadedContent: state => () => state.loadedContent,
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
    setLoading: (state, bool) => state.loading = bool,
    language: (state, value) => state.language = value,
    addToMapIds: (state, id) => !state.mapIds.includes(id) && state.mapIds.push(id), 
    cycleLanguage(state) {
      const i = languageChoices.indexOf(state.language)
      state.language = (i === -1) ? 'en' : languageChoices[(i + 1) % languageChoices.length]
    },
    addToLocalContent: (state, { data, id, type }) => {
      // action has already pushed optimistic save to firestore
      state.loadedContent[id] = copy(data)
      //state.loadedContent = { ...state.loadedContent }
      if (type === 'map' && !state.mapIds.includes(id)) state.mapIds.push(id)
      if (type === 'task' && !state.taskIds.includes(id)) state.taskIds.push(id)
    },
    addTranslation(state, { target, value, language }) {
      if (!state.translations) state.translations = {}
      if (!state.translations[language]) state.translations[language] = {}
      state.translations[language][target] = value
    },
    updateCustomizerState: (state, data) => state.customizerState = copy(data),
    addToExpertIds: (state, id) => {
      if (!state.expertIds.includes(id)) state.expertIds.push(id)
    },
    delete: (state, id) => {
      state.mapIds  = state.mapIds.filter(mapId => mapId !== id)
      state.taskIds = state.taskIds.filter(taskId => taskId !== id)
      delete state.loadedContent[id]
      //state.loadedContent = { ...state.loadedContent }
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

    language: ({ commit }, value) => commit('language', value),

    async cycleLanguageAndRefetch({ commit, dispatch }) {
      await dispatch('loadTranslationsForSlugMap')
      commit('cycleLanguage')
    }, 

    loadContent: async ({ getters, dispatch }) => {
      const allMapIds = getters.mapIds()
      let allTaskIds = [ ...getters.taskIds() ]
      getters.embeddedTaskIds().forEach(id => {
        if (!allTaskIds.includes(id)) allTaskIds.push(id)
      })
    
      const allIds = [ ...allMapIds, ...allTaskIds]
      const neededIds = allIds.filter(id => !Object.keys(getters.loadedContent()).includes(id))
      if (!neededIds.length) return
      
      try {
        const docPromises = neededIds.map(async id => [id, await Agent.state(id)])
        const docs = await Promise.all(docPromises)
        docs
          .forEach(([id, data]) => {
            //  TODO: deal with dispatching expert id add...
            // dispatch('addToExpertIds', id)
            //  TODO: loadedContent should be in an ephemeral module
            dispatch('addToLocalContent', { id, data: copy(data) })
          })
        return dispatch('loadContent')
      } catch (e) {
        console.warn('Error in getItems', e)
      }

    },
    loadTranslationsForSlugMap: async ({ getters, commit }) => {
      const promiseArray = Object.values(translationSlugMap).map(getTranslation)
      const translationResults = await Promise.all(promiseArray)
      translationResults.forEach((res,i) => {
        if (res?[0]) commit('addTranslation', res[0])
        else console.warn(`no translation for ${Object.keys(translationSlugMap)[i]} in ${getters.language()}`)
      })

      async function getTranslation(id) {
        return Agent.query('translate', [ id, getters.language() ], TRANS_DOMAIN)
      }

    },
    addToExpertIds: ({ commit }, id) => commit('addToExpertIds', id),
    save: async ({ commit, dispatch, getters }, { swapId, type })  => {
      const newId = uuid()
      const data = copy(getters.customizerState())

      if (type === 'task') {
        let trans_breadcrumbs = {} // new uuid => string

        // replace task's instructions, name, and hint with uuid.
        // add to translatable-items obj to write all together at end

        const fields = [ 'instructions', 'name', 'hint' ]
        fields.forEach(field => {
          if (!!data[field]) {
            const crumbId = uuid()
            trans_breadcrumbs[crumbId] = data[field]
            data[field] = crumbId
          }
        })

        // replace workspace and toolbox user methods with uuids
        // add to translatable-items obj to write all together at end

        const {
          karelBlockly,
          targets
        } = await karelBlocklyUserMethodsToUUID(data.karelBlockly)
        data.karelBlockly = karelBlockly

        trans_breadcrumbs = { ...trans_breadcrumbs, ...targets }

        // write translateable-item for each target

        Object.entries(trans_breadcrumbs).forEach(([crumbId, source_string]) => {
          try {
            const active = {
              source_string,
              language: getters.language(),
              parent_item: newId
            }
            Agent.create({
              id: crumbId,
              active,
              active_type: 'application/json;type=translatable_targets&version=1.0.1'
            })
          } catch (e) {
            console.warn(`Error writing translation breadcrumbb, item: ${newId}, target: ${crumbId}`, e)
          }          
        })
      } // end of "if task"
      const payload = { type, data, id: newId }
      commit('addToLocalContent', payload)
      dispatch('saveToKnowFireCore', payload)
      if (swapId) commit('delete', swapId)
      return newId
    },
    addToLocalContent: ({ commit }, payload) => commit('addToLocalContent', payload),
    saveToKnowFireCore: async (_context, {id, data}) => {
      try {
        // using whether it has graph as toggle task or map
        const active_type = data.graph ? 'application/json;type=karel-map&version=1.0.1'
                                       : 'application/json;type=karel-task&version=1.0.1'
        await Agent.create({ id, active: data, active_type })
      } catch (e) {
        console.warn('Error in writeAll', e)
      }
    },
    copy: ({ getters, commit, dispatch }, id) => {
      const data = copy(getters.content(id))
      data.name = "Copy of " + data.name
      const newId = uuid()
      const type = getters.type(id)
      commit('addToLocalContent', { type, data, id: newId })
      dispatch('saveToKnowFireCore', { data, id: newId })
      return newId
    },
    loadMapAndEmbedded: async ({ dispatch, commit }, id) => {
      // verify it loads and is a map
      if (!isUUID(id)) return Promise.reject(new Error('Cannot load map'))

      const state = await Agent.state(id)
      if (!state.graph) {
        return Promise.reject(new Error('Cannot load map'))
      } else {
        commit('addToMapIds', id)
        await dispatch('loadContent')
      }
    },

    updateCustomizerState: ({ commit }, data) => commit('updateCustomizerState', data),

    delete: ({ commit }, id) => commit('delete', id),

    toggleFavorite: ({ commit }, id) => commit('toggleFavorite', id),

    taskComplete: ({ commit }, id) => commit('taskComplete', id)
  }
}
