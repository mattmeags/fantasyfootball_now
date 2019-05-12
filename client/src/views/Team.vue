<template>
    <div v-if="childDataLoaded">
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
    <DonutSplit v-bind:labels="rushingAttemptsData.labels" v-bind:values="rushingAttemptsData.series" v-on:playerSelect="loadPlayer"></DonutSplit>
  
    <div>
    <CompareBar v-bind:labels="receivingTargetsLabel" v-bind:values="receivingTargetsData.series" v-on:playerSelect="loadPlayer"></CompareBar>
    <ChartFilter v-bind:filterValues="{receivingFilterValues}" v-on:filterChange="updateRecChartWithFilter"></ChartFilter>
    </div>
    {{tdData.series}}
    <div>
        <!--TODO check baltimore when loaded for QB rushes-->
        <StackedBar v-bind:labels="tdData.labels" v-bind:values="tdData.series" v-on:playerSelect="loadPlayer"></StackedBar>
        <ChartFilter v-bind:filterValues="{receivingFilterValues}" v-on:filterChange="updateTDChartWithFilter"></ChartFilter>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import DonutSplit from '@/components/data/DonutSplit.vue';
import CompareBar from '@/components/data/CompareBar.vue';
import StackedBar from '@/components/data/StackedBar.vue';
import Banner from '@/components/layout/Banner.vue';
import ChartFilter from '@/components/data/ChartFilter.vue';

const paths = require('../assets/scripts/paths');


export default {
    //TODO get filters working correctly
    name: 'team',
    components: {
        DonutSplit,
        CompareBar,
        StackedBar,
        Banner, 
        ChartFilter
    },
    data: () => ({
        team: {},
        rushingAttemptsData: {},
        receivingTargetsData: {},
        tdData : {},
        childDataLoaded: false,
        receivingFilterValues:['wr', 'te', 'rb']
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
                this.rushingAttemptsData = this.dataByPosition('rb');
                this.receivingTargetsData = this.dataBySkill('receiving', 'all');
                this.tdData = this.dataBySkill('td', 'all');
                console.log('tddata ', this.tdData);
                this.childDataLoaded = true;
            } catch(error) {
                console.log(error);
            }
        },
        /**TODO fix comment
        * TODO posibily make constructor
        * @function dataByPosition
        * @params {string} position
        * @desc creates chartDataObject based on position a skill
        * TODO so far this works pie, see if it works for anything else;
        */
        dataByPosition: function(position) {
            let positionKey, seriesKey;
            let chartData = {
                labels: [],
                series: []
            };

            if (position === 'rb' || position === 'wr' || position === 'te') {
                //set rushRec
                positionKey = 'rushRec';
            }
            console.log(position);
            if (position === 'rb') {
                seriesKey = 'rushingAttempts'
            }

            //Pushes rushing data
            //checks for position

             this.team[positionKey].forEach((player) => {
                if (player.position.toLowerCase() == position) {
                    chartData.labels.push(player.playerName);
                    chartData.series.push(player[seriesKey]);
                }
            });

            return chartData;

        },
        dataBySkill: function(skill, filter) {
            let positionKey;
            let chartData = {
                labels: [],
                series: []
            };
            //Add receivers to labels
            // Add Targets and receptions to series
            if (skill === 'receiving') {
                positionKey = 'rushRec';
                chartData.series = [{data: []}, {data: []}];
                this.team[positionKey].filter((player) => {
                    //do any position if all or look for player by filer (slice 2 to handle 'te/wr' for ex)
                    if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
                        if (player.recTargets === "") {
                            return false;
                        }
                        if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                            return false;
                        }
                        chartData.labels.push(player.playerName);
                        chartData.series[0].data.push(player.recTargets);
                        chartData.series[1].data.push(player.receptions);
                    }
                        
                });
                return chartData;
                
            } else if (skill === 'td') {
                positionKey = 'rushRec';
                //chartData.labels = ['Receving Touchdown', 'Rushing Touchdown'];
                console.log(chartData.series);
                let rushTDCompareObject = {name: 'Rushing Touchdown', data: []};
                let recTDCompareObject = {name: 'Receiving Touchdown', data: []};
                this.team.rushRec.filter((player) => {
                    if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
                        if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                                return false;
                        }

                        if (player.recTD > 0 || player.rushTD > 0) {
                            chartData.labels.push(player.playerName);
                            //console.log(player.recTD);
                            recTDCompareObject.data.push(player.recTD);
                            rushTDCompareObject.data.push(player.rushTD);
                        }
                    }
                });
                chartData.series.push(rushTDCompareObject);
                chartData.series.push(recTDCompareObject);
                console.log('chartData here');
                console.log(chartData.series);
                return chartData
            }
        },

        //Comes from v-on:filterChange
        updateRecChartWithFilter: function(selected) {
            this.receivingTargetsData = this.dataBySkill('receiving', selected);
        },
        updateTDChartWithFilter: function(selected) {
            this.tdData = this.dataBySkill('td', selected);
        },
        loadPlayer: function(player) {
            console.log(player);
            // this.$http.post('/loadPlayer', data, {
            //         Player: player
            // });
            this.$router.push('/player');
        }
    },

    /********** HOOKS **********/
    beforeRouteUpdate(to, from, next) {
        console.log(to);
        console.log(from);
        this.loadTeamData(to.params.team);
        next();
    },
    created: function() {
        this.loadTeamData(this.$route.params.team);
        console.log('route object: ', this.$route);
    }
    
}
</script>