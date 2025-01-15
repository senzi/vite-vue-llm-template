import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-json'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
