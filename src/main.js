import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios';
import router from './router'
import vuetify from './plugins/vuetify'
import VCA from '@vue/composition-api'
import JsonEditorVue from 'json-editor-vue'


import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)



Vue.use(VCA)
Vue.use(JsonEditorVue, {
  verbose: false,
  mode: "text",
  statusBar: false,
  mainMenuBar: false,
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
