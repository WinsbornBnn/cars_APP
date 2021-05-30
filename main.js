import Vue from 'vue'
import App from './App'

import home from './pages/map/index.vue'
Vue.component('home', home)

import dw from './pages/order/index.vue'
Vue.component('dw', dw)

import order from './pages/order/all_list.vue'
Vue.component('order', order)

import fx from './pages/relea/index.vue'
Vue.component('fx', fx)

import sc from './pages/shop/index.vue'
Vue.component('sc', sc)

import center from './pages/center/index.vue'
Vue.component('center', center)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import util from '@/common/util.js'
Vue.prototype.$util = util
// console.log(Vue.prototype.$util.removeToken)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
