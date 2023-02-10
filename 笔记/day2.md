犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误
4：路由理解
KV：K--->URL  V---->相应的组件
配置路由：
     ------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写


$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta


1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
this: 当前组件实例（search）
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route属性
push: VueRouter类的一个实例

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function(location,resolve,reject ){
    if(resolve && reject){
        // call||apply区别：相同点，都可以调用函数一次，都可以篡改函数的上下问一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
// 重写replace方法
VueRouter.prototype.push = function(location,resolve,reject ){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}




2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件








3)axios二次封装
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的

3.3 为什么需要进行二次封装axios？
请求拦截器、响应拦截器：请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情

3.4在项目中经常API文件夹【axios】
接口当中：路径都带有/api    
baseURL："/api"






4)vuex:今晚务必vuex复习一下
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
Vuex基本使用:

     

5):POSTMAN测试接口
--刚刚经过postman工具测试，接口是没有问题的
--如果服务器返回的数据code字段200，代表服务器返回数据成功
--整个项目，接口前缀都有/api字样
   

6): 接口统一管理

项目很小：完全可以在组件的生命周期中发请求

项目大：axios.get('xxx')


7)跨域问题
什么跨域：协议、域名、端口号不同请求，称之为跨域

JSONP、CROS、代理(在vue.config.js中配置)


8）nprogress进度条的使用

start: 进度条开始
done：进度条结束
进度条颜色可以修改，当然需要修改人家的样式nprogress.css


9：vuex状态管理库
9.1）vuex是什么?
vuex是官方提供一个插件，状态管理库
切记，并不是全部项目都需要Vuex，如果项目很小，完全不需要Vuex，如果项目很大，组件很多、数据很多，数据的维护困难，Vuex

state --- 存储数据的地方
mutations --- 修改数据的手段
actions --- 响应组件中用户的动作
getters --- 对state数据加工
modules --- 封装暴露

9.2)vuex基本使用

9.3）vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多

模拟state存储数据
{
   home:{},
   search:{}
}



10)：完成TypeNav三级联动展示数据业务

[
    {
        id:1,
        name:电子书,
        child:[
            {id:2, name:"喜羊羊,child:[]}
        ]
    }
]











