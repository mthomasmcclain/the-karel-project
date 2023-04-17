// Registry for modules used in source
import 'npm/unscoped/vuex/4.1.0'
import 'npm/unscoped/sweetalert2/11.7.3'
import 'npm/unscoped/vuex-persist/3.1.3'
import 'npm/unscoped/uuid/9.0.0'
import 'npm/unscoped/vue-router/4.1.6'
import 'npm/unscoped/blockly/5.20210325.1'
import 'npm/unscoped/lodash/4.17.21'
import 'npm/unscoped/elementtree/0.1.7'

import { createApp } from 'npm/unscoped/vue/3.2.39'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import matchNavigatorLanguage from './helpers/matchNavigatorLanguage.js'
import './main.css'

import './helpers/vue3DragEvents.js'

//  TODO: this app simply ignores the Core initialization pipeline
//        consider if that is just fine.
export const initialize = () => {
    createApp(App).use(store).use(router).mount('body')

    const initialLoad = async () => {
        store.dispatch('setLoading', true)
        store.dispatch('language', matchNavigatorLanguage(['en', 'pt']))
        await store.dispatch('loadContent')
        await store.dispatch('loadTranslations')
        store.dispatch('setLoading', false)
    }

    initialLoad()
}