import axios from 'axios';
import { paths } from '../assets/scripts/utilities';

export default {
    getNavigationItems(context) {
        fetch(paths.loadAllTeamsUrl)
        .then(response => response.json())
        .then((result) => {
            context.commit('setPresentationState', {stateKey: 'teams',data: result});
        });
        fetch(paths.loadPositinsUrl)
        .then(response => response.json())
        .then(result => {
            context.commit('setPresentationState', {stateKey: 'positions',data: result});
            // context.commit('setPositions', result);
        });
    },
    getTeamData(context, teamMascot) {
        context.commit('setPresentationState', {stateKey: 'teamDataLoaded', data: false});
        axios.post(paths.loadSingleTeamUrl, {
            teamId: teamMascot,
        }).then(result => {
            context.commit('setTeamData', result.data);
            context.commit('setPresentationState', {stateKey: 'globalHeader', data: result.data.teamName});
        });
    },
    filterCharts(context, payload) {
        const path = paths.createUrl(payload.api);
        axios.post(path, { 
            team: payload.teamMascot,
            seriesName: payload.seriesName,
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
            context.commit('setPositionData', result.data);
            console.log('result: ', result);
            //context.commit('setGlobalTitle', result.data.teamName);
            //context.commit('setPresentationState', {stateKey: 'globalHeader', data: result.data.teamName});
        });
    },
    updateYear(context, payload) {
        if (this.state.selectedYear !== payload.year) {
            axios.post(paths.updateYear, {
                year: payload.year,
            }).then(result => {
                if (result.data.success) {
                    context.commit('setSelectedYear', payload.year);
                    if (payload.route === 'team') {
                        context.dispatch('getTeamData', payload.params.team);
                    } else if (payload.route === 'position') {
                        context.dispatch('getPositionData', payload.params.position);
                    }
                }
            });
        }
    },
    getLeagueData(context) {
        fetch(paths.home)
        .then(response => response.json())
        .then((result) => {
            context.commit('setLeagueData', result);
            context.commit('setPresentationState', { stateKey: 'activePassData', data: result.passYards });
            context.commit('setPresentationState', { stateKey: 'activeRushData', data: result.rushYards });
        });
    },
};
