import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import './main.css'

import './helpers/vue3DragEvents.js'

createApp(App).use(store).use(router).mount('#app')

const initialLoad = async () => {
    store.dispatch('setLoading', true)
    await store.dispatch('loadContent')
    store.dispatch('setLoading', false)
}

initialLoad()