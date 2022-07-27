import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

 

const app = createApp(App);
app.use(ElementPlus);
app.use(router)
app.use(store)

app.mount('#app')


router.beforeEach((to, from, next) => {
    if (to.name !== 'TrainLogin' && store.state.username === '') next({ name: 'TrainLogin' })
    else next()
  })