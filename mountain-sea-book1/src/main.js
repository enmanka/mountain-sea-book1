import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router' // 导入路由实例

const app = createApp(App)

app.use(ElementPlus) // 将 element 组件全局注册
app.use(router) // 注册路由实例

app.mount('#app')
