import axios from 'axios';
import { paths } from '../assets/scripts/utilities';

export default {
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
        context.commit('resetTeamLoaded', false);
        axios.post(paths.loadSingleTeamUrl, {
            teamId: teamMascot,
        }).then(result => {
            console.log(result);
            context.commit('setTeamData', result.data);
            context.commit('setGlobalTitle', result.data.teamName);
        });
    },
    filterCharts(context, payload) {
        const path = paths.createUrl(payload.api);
        axios.post(path, {
            team: payload.teamMascot,
            seriesValues: payload.seriesValues,
            filter: payload.filter,
            updateState: payload.updateState,
        }).then(result => {
            context.commit('setTeamData', result.data);
        });
    },
    getPositionData(context, payload) {
        context.commit('resetPositionLoaded', false);
        axios.post(paths.loadPositionsPageUrl, {
            position: payload,
        }).then(result => {
            console.log('result: ', result);
            context.commit('setPositionData', result.data);
            context.commit('setGlobalTitle', result.data.teamName);
        });
    },
};
