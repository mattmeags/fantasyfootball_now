<template>
    <div v-if="teamDataLoaded">
        <div class="container">
            <div class="row">
                <div class="tile w-4">
                    <TileHeader title="Rush Yards Against"></TileHeader>
                    <Bar v-bind:labels="rushYardsAgainstData.labels" v-bind:values="rushYardsAgainstData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="rushYardsAgainstData.isHorizontal" v-bind:trimLabels="false"></Bar>
                </div>
                <div class="tile w-4">
                    <TileHeader title="Receiving Yards Against"></TileHeader>
                    <Bar v-bind:labels="passYardsAgainstData.labels" v-bind:values="passYardsAgainstData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="passYardsAgainstData.isHorizontal" v-bind:trimLabels="false"></Bar>
                </div>
                <div class="tile w-4">
                    <TileHeader title="Passing Plays vs Rushing Plays"></TileHeader>
                    <Bar v-bind:labels="offensePlaySplit.labels" v-bind:values="offensePlaySplit.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="offensePlaySplit.isHorizontal" v-bind:trimLabels="false"></Bar>
                </div>
            </div>
            <div class="row tall">
                <div class="tile-stack-container w-4">
                    <div class="tile h-2">
                        <TileHeader title="Rushing Split"></TileHeader>
                        <DonutSplit v-bind:labels="rushingAttemptsData.labels" v-bind:values="rushingAttemptsData.series" v-on:playerSelect="loadPlayer" v-bind:colors="teamColors"></DonutSplit>
                    </div>
                
                    <div class="tile h-2">
                        <TileHeader title="Touchdown Count"></TileHeader>
                        <StackedBar v-bind:labels="tdData.labels" v-bind:values="tdData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-on:playerSelect="loadPlayer"></StackedBar>
                        <ChartFilter v-bind:filterValues="tdFilterValues" v-on:filterChange="updateTDChartWithFilter"></ChartFilter>
                    </div>
                </div>
                
                <div class="tile h-1 w-8">
                    <div class="tile-chart-wrapper">
                        <TileHeader title="Receiving Yards"></TileHeader>
                        <Bar v-bind:labels="recYardsData.labels" v-bind:values="recYardsData.series" v-bind:trimLabels="true" v-bind:colors="teamColors"></Bar>
                        <ChartFilter v-bind:filterValues="receivingFilterValues" v-on:filterChange="updateRecYardsChartWithFilter"></ChartFilter>
                    </div>
                    <div class="tile-chart-wrapper">
                        <TileHeader title="Rushing Yards"></TileHeader>
                        <Bar v-bind:labels="rushYardsData.labels" v-bind:values="rushYardsData.series" v-bind:trimLabels="true" v-bind:colors="teamColors"></Bar>
                        <ChartFilter v-bind:filterValues="tdFilterValues" v-on:filterChange="updateRushYardsChartWithFilter"></ChartFilter>
                    </div>
                </div>
                
                
            </div>
            <div class="row">
                <div class="tile w-12">
                        <TileHeader title="Targerts & Receptions"></TileHeader>
                        <CompareBar v-bind:labels="receivingTargetsLabel" v-bind:values="receivingTargetsData.series" v-on:playerSelect="loadPlayer" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]"></CompareBar>
                        <ChartFilter v-bind:filterValues="receivingFilterValues" v-on:filterChange="updateRecChartWithFilter"></ChartFilter>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <Loading></Loading>
    </div>
    
</template>

<script>
// components
import DonutSplit from '@/components/data/DonutSplit.vue';
import CompareBar from '@/components/data/CompareBar.vue';
import StackedBar from '@/components/data/StackedBar.vue';
import Bar from '@/components/data/Bar.vue';
import ChartFilter from '@/components/data/ChartFilter.vue';
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
        Loading
    },
    data: () => ({
        teamMascot: '',
        team: {},
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
        filterColumnApi: 'filterColumnData'
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
        }
    },
    /* HOOKS */
    beforeRouteUpdate(to, from, next) {
        console.log('to: ', to);
        console.log('from: ', from);
        //this.loadTeamData(to.params.team);
        //this.getTeamData(this.$route.params.team);
        console.log(this.$route.params.team)
        this.getTeamData(to.params.team);
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
        this.teamMascot = this.$route.params.team;
        this.getTeamData(this.$route.params.team);
    }
};
</script>

<style lang="scss">
    @import '../assets/styles/grid';
    @import '../assets/styles/tiles';
    
</style>
