//引入路由组件
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

// 路由配置信息
export default [
    {
        path: "/center",
        // 重定向,当进入/center时,直接定向到/center/myorder
        redirect: '/center/myorder',
        component: ()=>import('@/pages/Center'),
        name: 'center',
        meta: { show: true },
        children: [
            {
                path: "myorder",
                component: ()=>import('@/pages/Center/myOrder'),
                name: 'myorder',
            },
            {
                path: "grouporder",
                component: ()=>import('@/pages/Center/groupOrder'),
                name: 'grouporder',
            },
        ]
    },
    {
        path: "/paySuccess",
        component: ()=>import('@/pages/PaySuccess'),
        name: 'paySuccess',
        meta: { show: true }
    },
    {
        path: "/pay",
        component: ()=>import('@/pages/Pay'),
        name: 'pay',
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: ()=>import('@/pages/Trade'),
        name: 'trade',
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页,必须从购物车来
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/shopCart",
        component: ()=>import('@/pages/ShopCart'),
        name: 'shopCart',
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        component: ()=>import('@/pages/AddCartSuccess'),
        name: 'addcartsuccess',
        meta: { show: true }
    },
    {
        path: "/detail/:skuId?",
        component: ()=>import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: "/home",
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        name: 'search',
        //路由组件能不能传递props数据?
        //布尔值写法:只能params
        // props:true,
        //对象写法:额外的路由组件传递一些props
        // props: { a: 1, b: 2 }
        // 函数写法:可以吧params参数和query参数传递给路由组件
        // props: ($route) => {
        //     return { keyword: $route.params.keyword, k: $route.query.k }
        // }
    },
    {
        path: "/login",
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: ()=>import('@/pages/Register'),
        meta: { show: true }
    },
    //重定向:在项目运行的时候,当访问/时,立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    }
]