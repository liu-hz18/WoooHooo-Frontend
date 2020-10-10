import Vue from 'vue'
import VueRouter from "vue-router"

import HelloWorld from "../components/HelloWorld.vue"
import Home from "../components/Home.vue"
import SearchResult from "../components/SearchResult.vue"
import Login from '../components/Login.vue'

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: '/home',
      name: "Home",
      component: Home
    },
    {
      path: '/result',
      name: "SearchResult",
      component: SearchResult
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
  ]
  
const router = new VueRouter({
    mode: 'history',
    routes: routes,
})

export default router
