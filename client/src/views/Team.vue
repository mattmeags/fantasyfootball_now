<template>
    <div v-if="teamDataLoaded">
        <Dashboard>
            <Row>
                <Tile tileClass="w-4">
                    <template v-slot:header>
                        <TileHeader title="Rush Yards Against"></TileHeader>
                    </template>

                    <template v-slot:data>
                          <Bar v-bind:labels="rushYardsAgainstData.labels" v-bind:values="rushYardsAgainstData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="rushYardsAgainstData.isHorizontal" v-bind:trimLabels="false"></Bar>
                    </template>
                </Tile>
               
                <Tile tileClass="w-4">
                    <template v-slot:header>
                         <TileHeader title="Receiving Yards Against"></TileHeader>
                    </template>

                    <template v-slot:data>
                         <Bar v-bind:labels="passYardsAgainstData.labels" v-bind:values="passYardsAgainstData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="passYardsAgainstData.isHorizontal" v-bind:trimLabels="false"></Bar>
                    </template>
                </Tile>

                <Tile tileClass="w-4">
                    <template v-slot:header>
                        <TileHeader title="Passing Plays vs Rushing Plays"></TileHeader>
                    </template>

                    <template v-slot:data>
                        <Bar v-bind:labels="offensePlaySplit.labels" v-bind:values="offensePlaySplit.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="offensePlaySplit.isHorizontal" v-bind:trimLabels="false"></Bar>
                    </template>
                </Tile>
            </Row>

            <Row rowClass="tall">

                <StackedCharts stackedClass="w-4">
                    <Tile tileClass="h-2">
                        <template v-slot:header>
                            <TileHeader title="Rushing Split"></TileHeader>
                        </template>
                        <template v-slot:data>
                            <DonutSplit v-bind:labels="rushingAttemptsData.labels" v-bind:values="rushingAttemptsData.series" v-on:playerSelect="loadPlayer" v-bind:colors="teamColors"></DonutSplit>
                        </template>
                    </Tile>
                
                    <Tile tileClass="h-2">
                        <template v-slot:header>
                            <TileHeader title="Touchdown Count"></TileHeader>
                        </template>
                        <template v-slot:data>
                            <StackedBar v-bind:labels="tdData.labels" v-bind:values="tdData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-on:playerSelect="loadPlayer"></StackedBar>
                        </template>
                        <template v-slot:filter>
                            <ChartFilter v-bind:filterValues="tdFilterValues" defaultOption="all"  v-on:filterChange="updateTDChartWithFilter"></ChartFilter>
                        </template>
                    </Tile>
                </StackedCharts>
                
                <Tile tileClass="h-1 w-8">
                    <!--TODO: you will need to look at this once you have header figured out-->
                    <div class="tile-chart-wrapper">
                        <TileHeader title="Receiving Yards"></TileHeader>
                        <Bar v-bind:labels="recYardsData.labels" v-bind:values="recYardsData.series" v-bind:trimLabels="true" v-bind:colors="teamColors"></Bar>
                        <ChartFilter v-bind:filterValues="receivingFilterValues" defaultOption="all" v-on:filterChange="updateRecYardsChartWithFilter"></ChartFilter>
                    </div>
                    <div class="tile-chart-wrapper">
                        <TileHeader title="Rushing Yards"></TileHeader>
                        <Bar v-bind:labels="rushYardsData.labels" v-bind:values="rushYardsData.series" v-bind:trimLabels="true" v-bind:colors="teamColors"></Bar>
                        <ChartFilter v-bind:filterValues="tdFilterValues" defaultOption="all" v-on:filterChange="updateRushYardsChartWithFilter"></ChartFilter>
                    </div>
                </Tile>
                
                
            </Row>
            <Row>
                <Tile tileClass="w-12">
                    <template v-slot:header>
                        <TileHeader title="Targerts & Receptions"></TileHeader>
                    </template>
                    <template v-slot:data>
                            <CompareBar v-bind:labels="receivingTargetsLabel" v-bind:values="receivingTargetsData.series" v-on:playerSelect="loadPlayer" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]"></CompareBar>
                    </template>
                    <template v-slot:filter>
                            <ChartFilter v-bind:filterValues="receivingFilterValues" defaultOption="all"  v-on:filterChange="updateRecChartWithFilter"></ChartFilter>
                    </template>
                </Tile>
            </Row>
        </Dashboard>
    </div>
    <Loading v-else></Loading>
    
</template>

<script>
// components
import DonutSplit from '@/components/data/DonutSplit.vue';
import CompareBar from '@/components/data/CompareBar.vue';
import StackedBar from '@/components/data/StackedBar.vue';
import Bar from '@/components/data/Bar.vue';
import ChartFilter from '@/components/global/controls/ChartFilter.vue';
import TileHeader from '@/components/global/layout/TileHeader.vue';
import Loading from '@/components/global/Loading.vue';

//assets
import axios from 'axios';
import {mapState, mapActions} from 'vuex';

import {getColors} from '../assets/scripts/utilities';

export default {
    name: 'team',
    components: {
        DonutSplit,
        CompareBar,
        StackedBar,
        ChartFilter,
        Bar,
        TileHeader,
        Loading,
    },
    data: () => ({
        teamMascot: '',
        team: {},
        //TODO: these could be mixins
        receivingFilterValues:['wr', 'te', 'rb'],
        tdFilterValues:['wr', 'te', 'rb', 'qb'],
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
        ],
        filterStackApi: 'filterStackedColumnData',
        filterGroupedApi: 'filterGroupedColumnData',
        filterColumnApi: 'filterColumnData',

    }),
    computed: {
        receivingTargetsLabel: function() {
            return this.receivingTargetsData.labels;
        },
        ...mapState({
            rushingAttemptsData: 'rushingSplitData',
            tdData: 'tdData',
            recYardsData: 'recYardsData',
            rushYardsData: 'rushYardsData',
            rushYardsAgainstData: 'totalRushYardsAgainstData',
            passYardsAgainstData: 'totalPassYardsAgainstData',
            offensePlaySplit: 'offensePlaySplit',
            teamDataLoaded: 'teamDataLoaded',
            receivingTargetsData: 'receivingTargetsData',
            teamName: 'teamName',
            color: 'color'
        }),
        teamColors: function() {
            return getColors(this.color);
        }
    },
    methods: {
        ...mapActions({
            getTeamData: 'getTeamData',
            filterCharts: 'filterCharts'
        }),
        //Comes from v-on:filterChange
        //TODO: after phase 1 see if you need to pass the series or can just make local to model and can update the team model as well
        updateRecChartWithFilter: function(selected) {
            console.log(this.teamMascot);
            const payload = {
                teamMascot: this.teamMascot,
                seriesValues: this.receivingCompareSeries,
                filter: selected,
                api: this.filterGroupedApi,
                updateState: 'receivingTargetsData'
            }
            this.filterCharts(payload);
        },
        updateTDChartWithFilter: function(selected) {
             const payload = {
                teamMascot: this.teamMascot,
                seriesValues: this.tdStackedSeries,
                filter: selected,
                api: this.filterStackApi,
                updateState: 'tdData'
            }
             this.filterCharts(payload);
        },
        updateRushYardsChartWithFilter: function(selected) {
            const payload = {
                teamMascot: this.teamMascot,
                seriesValues: 'rushYards',
                filter: selected,
                api: this.filterColumnApi,
                updateState: 'rushYardsData'
            }
             this.filterCharts(payload);
        },
        updateRecYardsChartWithFilter: function(selected) {
            const payload = {
                teamMascot: this.teamMascot,
                seriesValues: 'recYards',
                filter: selected,
                api: this.filterColumnApi,
                updateState: 'recYardsData'
            }
             this.filterCharts(payload);
        },

        //TODO: come back to here when doing player drill in
        loadPlayer: function (player) {
            console.log(player);
            this.$router.push('/player');
        },

        initTeam: function (team) {
            this.teamMascot = team;
            this.getTeamData(team);
        }
    },
    /* HOOKS */
    beforeRouteUpdate(to, from, next) {
        console.log('to: ', to);
        console.log('from: ', from);
        //this.loadTeamData(to.params.team);
        //this.getTeamData(this.$route.params.team);
        //console.log(this.$route.params.team)
        // this.teamMascot = to.params.team;
        // this.getTeamData(to.params.team);
        this.initTeam(to.params.team);
        next();
    },
    // created() {
    //     //this.loadTeamData(this.$route.params.team);
    //     console.log('route object: ', this.$route);
    //     // //this.getTeamData(this.$route.params.team);
    //     // console.log('hiya');
    //     // console.log(this.teamName);
    //     // console.log(this.color)
        
    // },
    mounted() {
        console.log('mounted');
        this.initTeam(this.$route.params.team);
        // this.teamMascot = this.$route.params.team;
        // this.getTeamData(this.$route.params.team);
    }
};
</script>

<style lang="scss">
    
</style>
