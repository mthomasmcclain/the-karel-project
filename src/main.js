import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'

import './helpers/vue3DragEvents'

createApp(App).use(store).use(router).mount('#app')
