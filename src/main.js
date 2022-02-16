import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { BootstrapVue } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import VueGoogleCharts from 'vue-google-charts'
import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'

Vue.use(Donut);
 
Vue.use(VueGoogleCharts)

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false
Vue.use(BootstrapVue)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
