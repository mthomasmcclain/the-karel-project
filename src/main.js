import { browserAgent } from '@knowlearning/agents'
import { vuePersistentStore, vuePersistentComponent, vueScopeComponent } from '@knowlearning/agents/vue.js'
import { validate as isUUID } from 'uuid'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router/index.js'
import storeDef from './store/index.js'
import MapPlayer from './components/MapPlayer/index.vue'
import TaskPlayer from './components/TaskPlayer/index.vue'
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
            const metadata = await Agent.metadata(id)
            const data = await Agent.state(id)
            console.log(metadata, data)
            let app
            if (metadata.active_type === 'application/json;type=dashboard-config') {
                app = createApp(vueScopeComponent, { id })
            }
            else {
                //  TODO: use type...
                const player = vuePersistentComponent( data.graph ? MapPlayer : TaskPlayer )
                app = createApp(player, { id })
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
            store.dispatch('setLoading', false)
        }
    }
}

initialLoad()