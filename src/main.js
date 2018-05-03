import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/style.scss'
import '../static/css/app.scss'
import '../static/css/hover.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.min.css'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import VueClipboard from 'vue-clipboard2'
import Vuep from 'vuep-plus'
import 'vuep-plus/dist/vuep.css'
import 'brace'
import 'brace/mode/html'
import 'brace/theme/github'
import 'brace/theme/monokai'
import 'brace/ext/emmet'
require(['emmet/emmet'], function (data) { // this is huge. so require it async is better
  window.emmet = data.emmet
})
import('./routes').then(routes => {
  const routeArray = routes.default
  Vue.use(Vuep)
  Vue.use(ElementUI)
  Vue.use(VueRouter)
  Vue.use(VueHighlightJS)
  Vue.use(VueClipboard)
  // Vue.use(VueHighlightJS)
  const router = new VueRouter({
    routes: routeArray
  })
  let vm = new Vue({
    router,
    el: '#app',
    render: h => h(App)
  })
  Vue.use({
    vm
  })
})
