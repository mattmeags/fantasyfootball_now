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
        console.log(payload);
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
    updateYear(context, payload) {
        if (this.state.selectedYear != payload.year) {
            axios.post(paths.updateYear, {
                year: payload.year,
            }).then(result => {
                if (result.data.success) {
                    context.commit('setSelectedYear', payload.year);
                    //location.reload();
                    if (payload.route === 'team') {
                        context.dispatch('getTeamData', payload.params.team);
                    } else if  (payload.route === 'position') {
                        context.dispatch('getPositionData', payload.params.position);
                    }
                }
                
            });
        }
    }
};
