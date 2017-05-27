import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Cart from '@/components/Cart'
import Near from '@/components/Near'
import Bought from '@/components/Bought'
import Login from '@/components/Login'
import OrderDetail from '@/components/OrderDetail'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Near',
      name: 'Near',
      component: Near
    },
    {
      path: '/Bought',
      name: 'Bought',
      component: Bought
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    }
  ]
})

router.beforeEach((to,from ,next)=>{
  //let sessionid = localStorage.getItem('sessionid')
  //document.cookie="JSESSIONID="+sessionid
  next()
})



export default router