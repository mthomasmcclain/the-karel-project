import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import KarelPlayer from '../views/KarelPlayer.vue'
import KarelBuilder from '../views/KarelBuilder.vue'
import WorldFromJson from '../views/WorldFromJson.vue'
import UUIDPlayer from '../views/UUIDPlayer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/karel-player',
    name: 'KarelPlayer',
    component: KarelPlayer
  },
  {
    path: '/karel-builder',
    name: 'KarelBuilder',
    component: KarelBuilder
  },
  {
    path: '/world-from-json',
    name: 'WorldFromJson',
    component: WorldFromJson
  },
  {
    path: '/:id',
    name: 'Player',
    component: UUIDPlayer
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
