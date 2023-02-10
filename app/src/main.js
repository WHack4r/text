import Vue from 'vue'
import App from './App.vue'
// ElementUI引入
import {Button,MessageBox} from 'element-ui'
// ElementUI的注册
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 三级联动组件---全局组件(在入口文件注册一次之后，在任何组件当中都可以使用)
import TypeNav from '@/components/TypeNav'
// 轮播图组件---全局组件
import Carousel from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字 第二参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);

// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';

// 引入MockServer.js---mock数据
import '@/mock/mockServe';

// 引入swiper样式
import "swiper/css/swiper.css"

// 统一接口api文件里面的全部请求函数
// 统一引入
import * as API from '@/api'

Vue.config.productionTip = false

// 引入插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/R-C.gif'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading: atm
})

// 引入表单校验插件
import "@/plugins/validate" ;

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由:(简写形式)，这里书写roter的时候，组件身上都有$route.$router属性
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性 
  store
}).$mount('#app')
