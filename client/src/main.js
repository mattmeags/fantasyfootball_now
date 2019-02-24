import Vue from 'vue';
import EvaIcons from 'vue-eva-icons';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

//use plugins
Vue.use(EvaIcons);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');
