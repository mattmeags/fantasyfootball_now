import Vue from 'vue';
import {trimName} from '../assets/scripts/utilities';

export default {
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
            player.name = trimName(player.name);
        });
        Vue.set(state, 'positionData', payload.position.dataTable);
        Vue.set(state, 'positionDataHeader', payload.header);

        state.positionLeaderData = [];
        Object.keys(payload.position).forEach(positionLead => {
            if (positionLead !== 'dataTable') {
                state.positionLeaderData.push(payload.position[positionLead]);
            }
        });
        state.positionDataLoaded = true;
    },
    setGlobalTitle(state, payload) {
    if (payload) {
        state.globalHeader = payload;
    }
    },
    resetTeamLoaded(state, payload) {
        state.teamDataLoaded = payload;
    },
    resetPositionLoaded(state, payload) {
        state.positionDataLoaded = payload;
    }
}