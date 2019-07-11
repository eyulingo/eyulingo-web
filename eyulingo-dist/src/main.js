import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './styles.scss'
import './plugins/element.js'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
