//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)

// 引入路由组件库
import routes from './routes'

// 引入store
import store from '@/store'

// 重写push || replace
// 先把VueRouter原型对象的push||replace保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 第一个参数:告诉原来的push||replace方法,往哪里跳转(传递哪些参数)
// 第二个参数:成功的回调
// 第三个参数:失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call || apply 的区别: 
        // 1.相同点:都可以调用函数,都可以篡改函数上下文一次
        // 2.不同点:call与apply传递参数:call传递参数用","隔开, apply方法执行,传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局守卫:前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
    // to:可以获取到你要跳转到哪个路由信息
    // from: 可以获取到从哪个路由来的信息
    // next: 放行函数
    // next()  直接放行
    // next('/login') 放行到指定路由
    // next(false) 原路打回
    next()
    // 获取token(仅用户登录了才会有token,未登录不会有token)
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        // 用户已经登录
        // 用户已经登录了还想去login,不放行
        if (to.path == '/login') {
            next('/home')  //停留在首页
        } else {
            // 登录了但是去的不是login
            if (name) {
                next()
            } else {
                // 没有用户信息,派发action,让仓库存储信息再跳转
                try {
                    // 获取用户信息在首页展示
                    await store.dispatch("getUserInfo");
                } catch (error) {
                    // 用户token过期了,获取不到用户信息
                    // 1:清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录,不能去 交易相关/支付相关[pay,paysuccess]/个人中心
        // 在未登录的前提下去上述的页面.将跳转登录页面
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未登录时想去而未去成的信息,通过query参数存储于路由当中
            next('/login?redirect=' + toPath)
        } else {
            next()
        }

    }
})

export default router
