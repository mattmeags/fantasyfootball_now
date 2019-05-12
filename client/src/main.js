import Vue from 'vue';
import Vuex from 'vuex';
import EvaIcons from 'vue-eva-icons';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import router from './router';
import store from './store/index';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSearch, faUsers, faFootballHelmet, faTachometerFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

// use plugins
Vue.use(Vuex);
Vue.use(EvaIcons);
Vue.use(VueApexCharts);

library.add(faBars);
library.add(faSearch);
library.add(faUsers);
library.add(faFootballHelmet);
library.add(faTachometerFast);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.component('apexchart', VueApexCharts);

new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
