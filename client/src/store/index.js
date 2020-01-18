//TODO: fix indenet here
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import paths from '../../src/assets/scripts/paths';
import utilities from '../assets/scripts/utilities';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: [],
    positions: [],
    test: 'hello world',
    rushingSplitData: {},
    receivingTargetsData: {},
    tdData: {},
    rushYardsData: {},
    recYardsData: {},
    totalRushYardsAgainstData: {},
    totalPassYardsAgainstData: {},
    offensePlaySplit: {},
    teamDataLoaded: false,
    teamName: '',
    positionData: [],
    positionDataHeader: [],
    positionLeaderData: []
  },
  mutations: {
    setTeams(state, payload) {
      Vue.set(state, 'teams', payload);
    },
    setPositions(state, payload) {
      Vue.set(state, 'positions', payload);
    },
    setTeamData(state, payload) {
      console.log(payload);
      Object.keys(payload).forEach(load => {
        if (load !== 'teamDataLoaded' && load !== 'teamName') {
          if (load in payload && payload[load]) {
            Vue.set(state, load, payload[load]);
          }
        }
      });

      Vue.set(state, 'teamDataLoaded', true);
      console.log(state);
      state.teamName = payload.teamName;
    },
    setPositionData(state, payload) {

      console.log(payload);
      payload.position.dataTable.forEach(player => {
        player.name = utilities.trimName(player.name);
      });
      Vue.set(state, 'positionData', payload.position.dataTable);
      Vue.set(state, 'positionDataHeader', payload.header);

      Object.keys(payload.position).forEach(positionLead => {
        if (positionLead !== 'dataTable') {
          state.positionLeaderData.push(payload.position[positionLead]);
        }
      });
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
    },
    filterCharts(context, payload) {
      const path = paths.createUrl(payload.api);
      axios.post(path, {
        team: payload.teamMascot,
        seriesValues: payload.seriesValues,
        filter: payload.filter,
        updateState: payload.updateState
      }).then(result => {
        context.commit('setTeamData', result.data);
      });
    },
    getPositionData(context, payload) {
      axios.post(paths.loadPositionsPageUrl, {
        position: payload
      }).then(result => {
        console.log('result: ', result);
        context.commit('setPositionData', result.data);
      });
    }
  }
});
