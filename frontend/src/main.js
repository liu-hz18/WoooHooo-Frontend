import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './plugins/element.js'
import router from "./router/index.js"
import lineClamp from 'vue-line-clamp'

Vue.use(ElementUI)
Vue.use(lineClamp)

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
