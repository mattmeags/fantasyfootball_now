<template>
    <div v-if="childDataLoaded">
      <!--{{team}}-->
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
    <testchart v-bind:labels="rushingAttemptsData.labels" v-bind:values="rushingAttemptsData.series"></testchart>
    <testchart v-bind:labels="receivingTargetsData.labels" v-bind:values="receivingTargetsData.series"></testchart>
    </div>
</template>

<script>
import axios from 'axios';
import testchart from '@/components/data/testchart.vue';

const paths = require('../assets/scripts/paths');


export default {
    name: 'team',
    components: {
        testchart
    },
    data: () => ({
        team: {},
        rushingAttemptsData: {},
        receivingTargetsData: {},
        childDataLoaded: false
    }),
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
                this.rushingAttemptsData = this.PositionData('rb', 'name', 'rushingAttempts');
                this.receivingTargetsData = this.PositionData('receiving', 'name', 'rushingAttempts');
                this.childDataLoaded = true;
            } catch(error) {
                console.log(error);
            }
        },
        /**TODO fix comment
        * TODO posibily make constructor
        * @function getPlayerName
        * @params {string} position
        */
        PositionData: function(position, label, series) {
            let positionKey;
            let chartData = {
                labels: [],
                series: []
            };

            if (position === 'rb' || position === 'wr' || position === 'te') {
                //set rushRec
                positionKey = 'rushRec';
            }
            if (position === 'receiving') {
                positionKey = 'rushRec';
                this.team[positionKey].filter((player) => {
                    if (player.recTargets === "") {
                        return false;
                    }
                    if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                        return false;
                    }
                    chartData.labels.push(player.playerName);
                    chartData.series.push(player.recTargets);
                });
                return chartData;
            }

            this.team[positionKey].filter((player) => {
                if (player.position.toLowerCase() == position) {
                    chartData.labels.push(player.playerName);
                    chartData.series.push(player.rushingAttempts);
                }
            });

            return chartData;

        }
    },

    /********** HOOKS **********/
    beforeRouteUpdate(to, from, next) {
        console.log(to);
        console.log(from);
        this.loadTeamData(to.params.team)
        next();
    },
    created: function() {
        this.loadTeamData(this.$route.params.team)
        console.log('route object: ', this.$route);
    }
    
}
</script>