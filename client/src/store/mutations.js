import Vue from 'vue';
import {trimName} from '../assets/scripts/utilities';
import { json } from 'body-parser';

export default {

    //TODO: set teams setpostions set presentationdata are all the dame
    setPresentationState(state, payload) {
        if (payload) {
            Vue.set(state, payload.stateKey, payload.data);
        }
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
    resetTeamLoaded(state, payload) {
        state.teamDataLoaded = payload;
    },
    resetPositionLoaded(state, payload) {
        state.positionDataLoaded = payload;
    },
    setSelectedYear(state, payload) {
        state.selectedYear = payload;
    },
    setLeagueData(state, payload) {

        for (let pay in payload) {
            if (pay in payload && payload[pay]) {
                Vue.set(state, pay, payload[pay]);
            }
        }
    },
    setColorOrder(state, payload) {
        if (payload) {
            payload.forEach(item => {
                const newOrder = item.teams.map(team => {
                    const index = state.fullTeamsNames.indexOf(team);
                    if (index >= 0) {
                        console.log(state.fullLeagueColors[index]);
                        return state.fullLeagueColors[index];
                    }
                });

                Vue.set(state, item.stateKey, newOrder);
            });
        }
    },
}
