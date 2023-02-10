
// 引入路由组件
// import Home from '@/pages/Home';
// import search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由
import Myorder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder'



/* 
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
    如果我们能把不同路由对应的组件分割成不同的代码块，
    然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/

// 路由配置信息
export default [
    {
        path: "/center",
        name: "Center",
        component: Center,
        meta: { show: true },
        children:[
            {
                path:'myorder',
                component:Myorder,
            },
            {
                path:'grouporder',
                component:GroupOrder,
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: "/paysuccess",
        name: "PaySuccess",
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: "/pay",
        name: "Pay",
        component: Pay,
        meta: { show: true },
        beforeEnter:(to,from,next) => {
            if(from.path == "/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/trade",
        name: "Trade",
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path == '/shopCart'){
                next()
            }else{
            // 其他的路由组件而来的，停留在当前页面
                next(false)
            }
            
        }
    },
    {
        path: "/shopCart",
        name: "ShopCart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/addCartSuccess",
        name: "addCartSuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/home",
        // 路由懒加载
        component: () => import("@/pages/Home"),
        meta: { show: true }
    }
    ,
    {
        name: "search",
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        //路由组件能不能传递props数据?
        // 布尔值写法:（只有params参数）
        // props:true,
        // 对象写法:额外给路由组件传递一些props
        // props:{a:1,b:2},
        // 函数写法（常用）: 可以params参数，query参数，通过props传递给路由组件
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    }
    ,
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    }
    ,
    {
        path: "/Register",
        component: Register,
        meta: { show: false }
    }
    ,
    {
        path: "/",
        redirect: "/home"
    }
]