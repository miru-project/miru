import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import miru from './plugin/miru'
const app = createApp(App)

app.use(createPinia())
app.use(miru)
app.use(router)
app.mount('#app')
