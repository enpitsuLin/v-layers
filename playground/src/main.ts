import { createApp } from 'vue'
import {
  createRouter,
  createWebHistory,
} from 'vue-router/auto'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
})
app.use(router)

app.mount('#app')
