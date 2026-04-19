import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/global.scss'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// 配置持久化插件
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
