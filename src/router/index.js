import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Cart from '@/components/Cart'
import Near from '@/components/Near'
import Bought from '@/components/Bought'
import Login from '@/components/Login'
import Scan from '@/components/Scan'
import OrderDetail from '@/components/OrderDetail'
import MyOrder from '@/components/MyOrder'
import TiedCard from '@/components/TiedCard'
import Regist from '@/components/Regist'
import ForgetPassword from '@/components/ForgetPassword'


Vue.use(Router)

let router = new Router({
  routes: [
    //主页
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { requiresAuth: true }
    },
    {
      path: '/Regist',
      name: 'Regist',
      component: Regist,
      meta: { requiresAuth: false }
    },
    {
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: { requiresAuth: false }
    },
    //购物车
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
      meta: { requiresAuth: true }
    },
    //附近书店
    {
      path: '/Near',
      name: 'Near',
      component: Near,
      meta: { requiresAuth: true }
    },
    //已购图书
    {
      path: '/Bought',
      name: 'Bought',
      component: Bought,
      meta: { requiresAuth: true }
    },
    // 登录
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }, 
    // 扫码购书
    {
      path: '/Scan',
      name: 'Scan',
      component: Scan,
      meta: { requiresAuth: true }
    },
    // 我的订单
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    }, 
    // 订单详情
    {
      path: '/OrderDetail/:orderNum',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: { requiresAuth: true }
    }, 
    // 绑卡页面
    {
      path: '/TiedCard',
      name: 'TiedCard',
      component: TiedCard
    }, 
    {
      path: '/Index',
      name: 'Index',
      component: Index
    }
  ]
})

router.beforeEach((to, from ,next)=>{
if (to.matched.some(record => record.meta.requiresAuth)) {
    let sessionId = localStorage.getItem("sessionid")
    if (!sessionId) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})



export default router