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
    const { auth: { user, provider }, mode } = await Agent.environment()

    if (provider === 'anonymous') {
        Agent.login()
    }
    else {

        const url = new URL(window.location.href)
        const { pathname } = url

        const id = pathname.slice(1)

        if (isUUID(id) && Agent.embedded) {
            const metadata = await Agent.metadata(id)
            const data = await Agent.state(id)
            let app

            if (mode === 'card' || mode === 'card-image') {
                const showTitle = ( mode !== 'card-image')
                const favorite = false
                const contentType = metadata.active_type.startsWith('application/json;type=karel-map') ? 'map' : 'task'
                const content = data
                const isExpert = false
                const embedded = true
                document.body.style.overflow = 'hidden'
                app = createApp(ContentCard, { id, favorite, contentType, content, isExpert, embedded, showTitle })
            }
            else if (metadata.active_type === 'application/json;type=dashboard-config') {
                app = createApp(Dashboard, { id })
            }
            else {
                //  TODO: use type...
                const player = vuePersistentComponent( data.graph ? MapPlayer : TaskPlayer )
                const store = createStore(storeDef)
                app = createApp(player, { id }).use(store)
                store.dispatch('setLoading', true)
                await loadTranslations()
                store.dispatch('setLoading', false)

                async function loadTranslations() {
                    try {
                        store.dispatch('language', matchNavigatorLanguage(['en', 'th', 'pt', 'fr']))
                        await store.dispatch('loadTranslationsForSlugMap') // tasks/maps are dynamic
                    } catch (error) {
                    }
                }

            }
            app.mount('#app')
        }
        else {
            const store = createStore(await vuePersistentStore(storeDef))
            createApp(App)
                .use(store)
                .use(router)
                .mount('#app')
            store.dispatch('setLoading', true)
            await store.dispatch('loadContent')
            await store.dispatch('language', matchNavigatorLanguage(['en', 'th', 'pt', 'fr']))
            await store.dispatch('loadTranslationsForSlugMap') // tasks/maps are dynamic
            store.dispatch('setLoading', false)
        }
    }
}

initialLoad()