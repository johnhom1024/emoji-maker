import Vue from 'vue'
import App from './App.vue'
import uView from 'uview-ui';

Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false

new App().$mount()
