import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    receivingFilter: 'all',
  },
  mutations: {
    updateReceivingFilter(state, value) {
      this.state.receivingFilter = value;
    },
  },
  getters: {
    returnReceivingFilter: state => state.receivingFilter,
  },
});
