import Vue from 'vue';
import Vuex from 'vuex';
import EvaIcons from 'vue-eva-icons';
import Chart from 'chart.js';
import App from './App.vue';
import router from './router';
import store from './store/index';
// import Row from '@/components/global/layout/Row';
import Tile from '@/components/global/layout/Tile';
import Dashboard from '@/components/global/layout/Dashboard';
// import StackedCharts from '@/components/global/layout/StackedCharts';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faBars, faSearch, faUsers, faFootballHelmet, faTachometerFast } 
// from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

// use plugins
Vue.use(Vuex);
Vue.use(EvaIcons);

// library.add(faBars);
// library.add(faSearch);
// library.add(faUsers);
// library.add(faFootballHelmet);
// library.add(faTachometerFast);
// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

Vue.component('Tile', Tile);
Vue.component('Dashboard', Dashboard);


new Vue({
  data: { loading: false },
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');




