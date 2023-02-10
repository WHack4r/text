// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router'

// 引入store
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

import routes from './routes'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call||apply区别：相同点，都可以调用函数一次，都可以篡改函数的上下问一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
// 重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

// 配置路由
let router = new VueRouter({
    // routes:routes (非简写)
    routes,
    scrollBehavior(to, from, savePosition) {
        return { y: 0 }
    }
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
    // to: 可以获取到跳转到那个路由的信息
    // from: 可以获取到你从哪个路由来的信息
    // next: 放行函数   next()放行    next(path)放行到指定指令路由          next(false)
    // next();
    // 用户登录了，才会有token，未登录一定不会有token
    // console.log()
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 用户已经登录了
    if(token){ 
        if(to.path=="/login"){
            next('/home');
        }else{
            // 已经登录了，去的不是login【home|search|detail|shopcart】
            // 如果用户名已有,就放行
            if(name){
                next();
            }else{
            // 没有用户信息,就派发action让仓库存储用户信息
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // 这里token过期获取不到用户的信息，需要清除token
                    await store.dispatch("userLogout");
                    next('/login');
                }
            }
        }
    }else{
        // 未登录:不能去交易相关、支付相关【pay|paysuccess】
        // 未登录去上面这些路由-----登录
        // 去的不是上面的这些路由（home|search|shopCart）需要放行
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登录的时候原本应该去的url，存储于地址栏中【路哟】
            next('/login?redirect='+toPath);
        }
        next();
    }
});


export default router;