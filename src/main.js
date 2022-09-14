import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图组件--全局组件
import Carousel from '@/components/Carousel'
// 分页器组件--全局组件
import Pagination from '@/components/Pagination'
// 引入Vue-lazyload插件(懒加载)
import VueLazyload from 'vue-lazyload'
import ky from '@/assets/13keyin.gif'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: ky
})

// 尝试引入自定义插件
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins)

// 引入表单校验插件
import "@/plugins/validate"

// 引入element-UI组件
import { Button, Select, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//第一个参数:全局组件的名字 第二个参数:哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

//引入路由
import router from '@/router'
Vue.config.productionTip = false

//引入vuex
import store from '@/store'

// 引入swiper样式
import "swiper/css/swiper.css"

// 引入mockServe.js
import "@/mock/mockServe"

// 统一接收api文件夹里面的所有的请求函数(统一引入)
import * as API from '@/api'

new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //注册仓库:组件实例对象身上会多一个属性:$store属性
  store,
}).$mount('#app')
