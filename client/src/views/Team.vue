<template>
    <div class="container" v-if="childDataLoaded">
    <Banner v-bind:name="$route.params.team" v-bind:location="team.location"></Banner>
      <!--{{team}}-->
    {{team.passing}}
     api team: 
     rushRec {
         number,
         playerNumber,
         position,
         gamesPlayed,
         gamesStared
         rushingAttempts
         rushingYards,
         rushTD,
         longestRushAttempt,
         yardsPerAttempt,
        yardsPerGame
        'rushAttemptsPerGame',
    'recTargets',
    'receptions',
    'recYards',
    'yardsPerRec',
    'recTD',
    'longestRec',
    'recPerGame',
    'recYardsPerGame',
    'completionPercentage',
    'totalTouches',
    'yardsPerTouch',
    'yardsFromScrimage',
    'totalTD'
     }
     passing {
         same
     }
        <div class="row">
            <div class="tile w-4">
                <TileHeader title="Rushing Split"></TileHeader>
                <DonutSplit v-bind:labels="rushingAttemptsData.labels" v-bind:values="rushingAttemptsData.series" v-on:playerSelect="loadPlayer"></DonutSplit>
            </div>
        
            <div class="tile w-4">
                <TileHeader title="Targerts & Receptions"></TileHeader>
                <CompareBar v-bind:labels="receivingTargetsLabel" v-bind:values="receivingTargetsData.series" v-on:playerSelect="loadPlayer"></CompareBar>
                <ChartFilter v-bind:filterValues="{receivingFilterValues}" v-on:filterChange="updateRecChartWithFilter"></ChartFilter>
            </div>
            
            <div class="tile w-4">
                <TileHeader title="Touchdown Count"></TileHeader>
                <!--TODO check baltimore when loaded for QB rushes-->
                <StackedBar v-bind:labels="tdData.labels" v-bind:values="tdData.series" v-on:playerSelect="loadPlayer"></StackedBar>
                <ChartFilter v-bind:filterValues="{receivingFilterValues}" v-on:filterChange="updateTDChartWithFilter"></ChartFilter>
            </div>
        </div>
        <div class="row">
            <div class="tile w-6">
                <TileHeader title="Receiving Yards"></TileHeader>
                <Bar v-bind:labels="recYardsData.labels" v-bind:values="recYardsData.series"></Bar>
            </div>
            <div class="tile w-6">
                <TileHeader title="Rushing Yeards"></TileHeader>
                <Bar v-bind:labels="rushYardsData.labels" v-bind:values="rushYardsData.series"></Bar>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DonutSplit from '@/components/data/DonutSplit.vue';
import CompareBar from '@/components/data/CompareBar.vue';
import StackedBar from '@/components/data/StackedBar.vue';
import Bar from '@/components/data/Bar.vue';
import Banner from '@/components/layout/Banner.vue';
import ChartFilter from '@/components/data/ChartFilter.vue';
import StandardDataObject from '../../src/assets/scripts/dataObjects.js';
import TileHeader from '@/components/layout/TileHeader.vue';

const paths = require('../assets/scripts/paths');


export default {
    //TODO get filters working correctly
    name: 'team',
    components: {
        DonutSplit,
        CompareBar,
        StackedBar,
        Banner, 
        ChartFilter,
        Bar,
        TileHeader
    },
    data: () => ({
        team: {},
        rushingAttemptsData: {},
        receivingTargetsData: {},
        tdData : {},
        recYardsData: {},
        rushYardsData: {},
        childDataLoaded: false,
        receivingFilterValues:['wr', 'te', 'rb'],
        receivingCompareSeries: {
            seriesValue1: 'recTargets',
            seriesValue2: 'receptions'
        },
        tdStackedSeries: [
            {
                seriesName: 'rushTD',
                seriesObject: {name: 'Rushing Touchdown', data: []}
            },
            {
                seriesName: 'recTD',
                seriesObject: {name: 'Receiving Touchdown', data: []}
            }
        ]
    }),
    computed: {
        receivingTargetsLabel: function() {
            return this.receivingTargetsData.labels;
        }
    },
    methods: {
        /**
        * @function loadTeamData
        * @param {string} teamMascot
        * @desc uses mascot name from route to get to assign team data 
        */
        loadTeamData: async function(teamMascot) {
            let self = this;
            let response = await axios.post(paths.loadSingleTeamUrl, {
                teamId: teamMascot
            });
            try {
                self.team = response.data;
                console.log('response: ', response.data);
                this.rushingAttemptsData = this.getDonutSplit('rb','rushingAttempts');
                this.receivingTargetsData = this.getFilteredCompareData(this.receivingCompareSeries, 'all');
                this.tdData = this.getFilteredStackedData(this.tdStackedSeries, 'all');
                this.recYardsData = this.getFilteredColumnData('recYards', 'all');
                this.rushYardsData = this.getFilteredColumnData('rushYards', 'all');
                this.childDataLoaded = true;
            } catch(error) {
                console.log(error);
            }
        },
        /**TODO fix comment
        * TODO posibily make constructor
        * @function getDonutSplit
        * @params {string} position
        * @desc creates chartDataObject based on position a skill
        * TODO so far this works pie, see if it works for anything else;
        */
        getDonutSplit: function(position, seriesKey) {
            console.log('getdonutsplit');
            let chartData = {
                labels: [],
                series: []
            };
            console.log(this.team);
             this.team.rushRec.forEach((player) => {
                if (player.position.toLowerCase() == position) {
                    chartData.labels.push(player.playerName);
                    chartData.series.push(player[seriesKey]);
                }
            });
            console.log(chartData);
            return chartData;

        },
        getFilteredCompareData: function(seriesValues, filter) {
            let labels = [];
            let series = [];
            let series2 = [];

            let chartData = {
                labels: [],
                series: [{data: []}, {data: []}]
            };

            this.team.rushRec.forEach((player) => {
                if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
                    if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                            return false;
                    }

                    if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                        return false;
                    }
                    chartData.labels.push(player.playerName);
                    chartData.series[0].data.push(player[seriesValues.seriesValue1]);
                    chartData.series[1].data.push(player[seriesValues.seriesValue2]);
                }
            });

            return chartData;
        },
        getFilteredStackedData: function(seriesValues, filter) {
            // empty data
            seriesValues.forEach(element => {
                element.seriesObject.data = [];
            });

            let chartData = {
                labels: [],
                series: []
            }

            this.team.rushRec.forEach((player) => {
                if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
                    if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                            return false;
                    }
                    // if any of the values are greater than 0 push all values required
                    seriesValues.forEach(element => {
                        if (player[element.seriesName] > 0) {
                            chartData.labels.push(player.playerName);
                            seriesValues.forEach(element2 => {
                                element2.seriesObject.data.push(player[element2.seriesName]);
                            });
                            return;
                        }
                    });
                }
            });
            seriesValues.forEach(element => {
                chartData.series.push(element.seriesObject);
            });

            return chartData
        },
        getFilteredColumnData: function(seriesKey, filter) {
            let chartData = {
                labels: [],
                series: [{name: seriesKey, data: []}]
            }

            this.team.rushRec.forEach(player => {
                if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
                    if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                            return false;
                    }

                    if (player[seriesKey] > 0) {
                        chartData.labels.push(player.playerName);
                        chartData.series[0].data.push(player[seriesKey]);
                    }
                }
            });

            return chartData;
        },

        //Comes from v-on:filterChange
        updateRecChartWithFilter: function(selected) {
            this.receivingTargetsData = this.getFilteredCompareData(this.receivingCompareSeries, selected);
        },
        updateTDChartWithFilter: function(selected) {
            this.tdData = this.getFilteredStackedData(this.tdStackedSeries, selected);
        },
        loadPlayer: function (player) {
            console.log(player);
            // this.$http.post('/loadPlayer', data, {
            //         Player: player
            // });
            this.$router.push('/player');
        }
    },
    /* HOOKS */
    beforeRouteUpdate(to, from, next) {
        console.log(to);
        console.log(from);
        this.loadTeamData(to.params.team);
        next();
    },
    created() {
        this.loadTeamData(this.$route.params.team);
        console.log('route object: ', this.$route);
    }
};
</script>
