import Agent from '@knowlearning/agents/browser.js'
import { vuePersistentStore, vuePersistentComponent, vueScopeComponent } from '@knowlearning/agents/vue.js'
import { validate as isUUID } from 'uuid'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import matchNavigatorLanguage from './matchNavigatorLanguage.js'
import router from './router/index.js'
import storeDef from './store/index.js'
import MapPlayer from './components/MapPlayer/index.vue'
import TaskPlayer from './components/TaskPlayer/index.vue'
import Dashboard from './components/dashboard/index.vue'
import ContentCard from './components/BuilderComponents/ContentCard.vue'
import './main.css'

import './helpers/vue3DragEvents'

window.Agent = Agent

const initialLoad = async () => {

        const url = new URL(window.location.href)
        const { pathname } = url
        const id = pathname.slice(1)

        const store = createStore(storeDef)
        const app = createApp(TaskPlayer, { id }).use(store)
        store.dispatch('setLoading', true)
        await loadTranslations()
        store.dispatch('setLoading', false)

        async function loadTranslations() {
            try {
                store.dispatch('language', matchNavigatorLanguage(['en', 'th', 'pt']))
                await store.dispatch('loadTranslationsForSlugMap') // tasks/maps are dynamic
            } catch (error) {
            }
        }
        app.mount('#app')
}

initialLoad()