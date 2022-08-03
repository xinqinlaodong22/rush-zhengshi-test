import { createApp } from 'vue'
import { createPinia } from 'pinia'

// reset style
import '@/assets/css/reset.css'
// base style
import '@/assets/css/base.css'

import plugin from '@/plugins/elementPlugin'
// import plugin from './plugins/index.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin)

router.isReady().then(() => app.mount('#app'))
