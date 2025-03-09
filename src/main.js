import { createApp } from 'vue'
import './style.css'
import './assets/css/main.css'
import App from './App.vue'
import router from './router'
import 'vue-toast-notification/dist/theme-sugar.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
