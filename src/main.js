import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

// app.use(createPinia())
app.use(router)
app.use(pinia);
app.use(ToastPlugin)
app.mount('#app')