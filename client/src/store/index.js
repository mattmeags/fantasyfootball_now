import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import paths from '../../src/assets/scripts/paths';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: [],
    positions: [],
    test: 'hello world',
    teamData: {},

  },
  mutations: {
    setTeams(state, payload) {
      Vue.set(state, 'teams', payload);
    },
    setPositions(state, payload) {
      Vue.set(state, 'positions', payload);
    },
    // configRushingSplit(state, payload) {
    //   let chartData = {
    //     labels: [],
    //     series: []
    //   };
    //   console.log(this.team);
    //   payload.rushRec.forEach((player) => {
    //       if (player.position.toLowerCase() == position) {
    //           chartData.labels.push(player.playerName);
    //           chartData.series.push(player[seriesKey]);
    //       }
    //   });
    //   console.log(chartData);
    //   return chartData;
    // }
    setTeamData(state, payload) {
      console.log(payload);
      Vue.set(state, 'teamData', payload);
    }
  },
  getters: {
    returnReceivingFilter: state => state.receivingFilter,
  },
  actions: {
    getNavigationItems(context) {
      fetch(paths.loadAllTeamsUrl)
      .then(response => response.json())
      .then((result) => {
        console.log(result);
        context.commit('setTeams', result);
      });
      fetch(paths.loadPositinsUrl)
      .then(response => response.json())
      .then(result => {
        context.commit('setPositions', result);
          //this.positions = result;
      });
    },
    getTeamData(context, teamMascot) {
      axios.post(paths.loadSingleTeamUrl, {
        teamId: teamMascot
      }).then(result => {
        console.log(result);
        context.commit('setTeamData', result.data);
      });
    }
  }
});
