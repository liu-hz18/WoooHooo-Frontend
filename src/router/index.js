import Vue from 'vue'
import VueRouter from "vue-router"

import HelloWorld from "../components/HelloWorld.vue"
import Home from "../components/Home.vue"
import UserCenter from "../components/UserCenter.vue"
import SearchResult from "../components/SearchResult.vue"
import Register from '../components/Register.vue'
import NotFound from "../components/NotFound.vue"

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
      path: '/i-center',
      name: "Center",
      component: UserCenter
    },
    {
      path: '/search',
      name: "SearchResult",
      component: SearchResult
    },
    {
      path: '/register',
      name: "Register",
      component: Register
    },
    {
      path: "*",
      meta: {
        pagename: "404 Not Found"
      },
      component: NotFound
    }
  ]
  
const router = new VueRouter({
    mode: 'history',
    routes: routes,
})

export default router
