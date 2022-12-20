import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/home',
            component:Home
        },
    ]
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
    //to 将要访问的路径，from 从哪个路径而来，next() 放行，next('/login') 强制跳转到哪。

    //如果是访问登录页，直接放行。
    if (to.path === '/login') return next()

    //获取token。
    const token = sessionStorage.getItem('token')
    //如果token为空，表示没有登录，强制跳转到登录页。
    if (!token) return next('/login')

    //到了这表示有登录，直接放行即可。
    next()
})

export default router