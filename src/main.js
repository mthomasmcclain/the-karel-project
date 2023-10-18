import { browserAgent } from '@knowlearning/agents'
import { vuePersistentStore, vuePersistentComponent } from '@knowlearning/agents/vue.js'
import { validate as isUUID } from 'uuid'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router/index.js'
import storeDef from './store/index.js'
import MapPlayer from './components/MapPlayer/index.vue'
import './main.css'

import './helpers/vue3DragEvents'

window.Agent = browserAgent()

const initialLoad = async () => {
    const { auth: { user, provider } } = await Agent.environment()

    if (provider === 'anonymous') {
        // TODO: render login page
        Agent.login()
    }
    else {
        const url = new URL(window.location.href)
        const { pathname } = url

        const id = pathname.slice(1)

        if (isUUID(id) && Agent.embedded) {
            console.log('got in here...', id)
            const player = vuePersistentComponent(MapPlayer)
            createApp(player, { id }).mount('#app')
        }
        else {
            const store = createStore(await vuePersistentStore(storeDef))
            createApp(App)
                .use(store)
                .use(router)
                .mount('#app')
            store.dispatch('setLoading', true)
            await store.dispatch('loadContent')
            store.dispatch('setLoading', false)
        }
    }
}

initialLoad()