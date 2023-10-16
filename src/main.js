import { browserAgent } from '@knowlearning/agents'
import { vuePersistentStore } from '@knowlearning/agents/vue.js'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router/index.js'
import storeDef from './store/index.js'
import './main.css'

import './helpers/vue3DragEvents'

window.Agent = browserAgent()

const initialLoad = async () => {
    const store = createStore(await vuePersistentStore(storeDef))
    createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
    store.dispatch('setLoading', true)
    await store.dispatch('loadContent')
    store.dispatch('setLoading', false)
}

initialLoad()