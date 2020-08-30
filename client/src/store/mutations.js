import Vue from 'vue';
import {trimName} from '../assets/scripts/utilities';
import { json } from 'body-parser';

export default {

    //TODO: set teams setpostions set presentationdata are all the dame
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
    },
    // setYears(state, payload) {
    //     console.log('setyears');
    //     //console.log(payload.reverse());
    //     state.years = payload.reverse();
    //     state.selectedYear = payload[0];
    // },
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
    // updateLabels(state, payload) {
    //     if (payload) {
    //         //payload.labels
    //         //payload.compareLabels
    //         //payload.newLabels

    //         payload.labels.forEach(label => {
    //             payload
    //         })
    //         payload.compareLabels;
    //     }
       
    // },
    /**
     * 
     * @param {vue.state} state 
     * @param {object} payload {baseArray: array, compareArray: array, newValuesArray: array, stateKey: string}
     */
//     reorderArray(state, payload) {
//         // almost mimic the last 2
//         // reorder an array and use first array to populate new array or use a third array
//         //The 2 compare arrays must be the same expected order
//         console.log('PAYLOAD: ', payload);
//         const reorderedArray = payload.baseArray.map(item => {
//             const index = payload.compareArray.indexOf(item);
//             let pushValue;
//             if (index >= 0) {
//                 if (payload.newValuesArray) {
//                     pushValue = payload.newValuesArray[index];
//                 } else {
//                     pushValue = payload.compareArray[index];
//                 }
//             }
//             return pushValue;
//         });
//         console.log('fuck??')
//         console.log('reorders', reorderedArray);
//         console.log(payload.stateKey);
//         Vue.set(state, state.passAttempts.labels, reorderedArray)
//     }
    setPresentationData(state, payload) {
        console.log(payload);
        if (payload) {
            Vue.set(state, payload.stateKey, payload.data);
        }
    }
}
