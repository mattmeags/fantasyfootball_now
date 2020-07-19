<template>
    <div v-if="teamDataLoaded">
        <Dashboard>

            <Tile tileClass="w-4-1">
                <template v-slot:header>
                    <TileHeader title="Rush Yards Against"></TileHeader>
                </template>

                <Bar v-bind:labels="rushYardsAgainstData.labels" v-bind:values="rushYardsAgainstData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="rushYardsAgainstData.isHorizontal" v-bind:trimLabels="false" :sort="false"></Bar>
            </Tile>
            
            <Tile tileClass="w-4-5">
                <template v-slot:header>
                        <TileHeader title="Receiving Yards Against"></TileHeader>
                </template>

                <Bar v-bind:labels="passYardsAgainstData.labels" v-bind:values="passYardsAgainstData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="passYardsAgainstData.isHorizontal" v-bind:trimLabels="false" :sort="false"></Bar>
            </Tile>

            <Tile tileClass="w-4-9">
                <template v-slot:header>
                    <TileHeader title="Passing Plays vs Rushing Plays"></TileHeader>
                </template>

                <Bar v-bind:labels="offensePlaySplit.labels" v-bind:values="offensePlaySplit.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-bind:isHorizontal="offensePlaySplit.isHorizontal" v-bind:trimLabels="false" :sort="false"></Bar>
            </Tile>

            <Tile tileClass="w-4-1">
                <template v-slot:header>
                    <TileHeader title="Rushing Split"></TileHeader>
                </template>

                 <DonutSplit v-bind:labels="rushingAttemptsData.labels" v-bind:values="rushingAttemptsData.series" v-on:playerSelect="loadPlayer" v-bind:colors="teamColors"></DonutSplit>
            </Tile>
            <Tile tileClass="w-8-5">
                <template v-slot:header>
                    <TileHeader title="Receiving Yards"></TileHeader>
                </template>
  
                <Bar v-bind:labels="recYardsData.labels" v-bind:values="recYardsData.series" v-bind:trimLabels="true" v-bind:colors="teamColors" :sort="true"></Bar>
     
                <template v-slot:filter>
                    <ChartFilter v-bind:filterValues="receivingFilterValues" defaultOption="all" v-on:filterChange="updateRecYardsChartWithFilter"></ChartFilter>
                </template>
            </Tile>

            <Tile tileClass="w-4-1">
                <template v-slot:header>
                    <TileHeader title="Touchdown Count"></TileHeader>
                </template>
  
                <StackedBar v-bind:labels="tdData.labels" v-bind:values="tdData.series" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]" v-on:playerSelect="loadPlayer"></StackedBar>

                <template v-slot:filter>
                    <ChartFilter v-bind:filterValues="tdFilterValues" defaultOption="all"  v-on:filterChange="updateTDChartWithFilter"></ChartFilter>
                </template>
            </Tile>
            <Tile tileClass="w-8-5">
                <template v-slot:header>
                    <TileHeader title="Rushing Yards"></TileHeader>
                </template>

                <Bar v-bind:labels="rushYardsData.labels" v-bind:values="rushYardsData.series" v-bind:trimLabels="true" v-bind:colors="teamColors" :sort="true"></Bar>

                    <template v-slot:filter>    
                    <ChartFilter v-bind:filterValues="tdFilterValues" defaultOption="all" v-on:filterChange="updateRushYardsChartWithFilter"></ChartFilter>
                </template>
            </Tile>

            <Tile tileClass="w-12">
                <template v-slot:header>
                    <TileHeader title="Targerts & Receptions"></TileHeader>
                </template>
 
                <CompareBar v-bind:labels="receivingTargetsLabel" v-bind:values="receivingTargetsData.series" v-on:playerSelect="loadPlayer" v-bind:colors="[teamColors[0], teamColors[teamColors.length - 1]]"></CompareBar>
                
                <template v-slot:filter>
                        <ChartFilter v-bind:filterValues="receivingFilterValues" defaultOption="all"  v-on:filterChange="updateRecChartWithFilter"></ChartFilter>
                </template>
            </Tile>

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
import {getColors} from '@/assets/scripts/utilities';

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
        /**
         * updates Receiving chart when filtered
         */
        updateRecChartWithFilter: function(selected) {
            const payload = {
                teamMascot: this.teamMascot,
                seriesName: 'receivingCompareSeries',
                filter: selected,
                api: this.filterGroupedApi,
                updateState: 'receivingTargetsData'
            }
            this.filterCharts(payload);
        },
        /**
         * updates TD chart when filtered
         */
        updateTDChartWithFilter: function(selected) {
             const payload = {
                teamMascot: this.teamMascot,
                seriesName: 'tdStackedSeries',
                filter: selected,
                api: this.filterStackApi,
                updateState: 'tdData'
            }
             this.filterCharts(payload);
        },
        /**
         * updates Rushing yards chart when filtered
         */
        updateRushYardsChartWithFilter: function(selected) {
            const payload = {
                teamMascot: this.teamMascot,
                seriesName: 'rushYards',
                filter: selected,
                api: this.filterColumnApi,
                updateState: 'rushYardsData'
            }
             this.filterCharts(payload);
        },
        /**
         * updates Receiving Yards chart when filtered
         */
        updateRecYardsChartWithFilter: function(selected) {
            const payload = {
                teamMascot: this.teamMascot,
                seriesName: 'recYards',
                filter: selected,
                api: this.filterColumnApi,
                updateState: 'recYardsData'
            }
             this.filterCharts(payload);
        },

        //TODO: come back to here when doing player drill in
        loadPlayer: function (player) {
            this.$router.push('/player');
        },

        /**
         * Initialize team route
         */
        initTeam: function (team) {
            this.teamMascot = team;
            this.getTeamData(team);
        }
    },
    /* HOOKS */
    beforeRouteUpdate(to, from, next) {
        // Keep these for later dev to see whats on to and from objecte
        // console.log('to: ', to);
        // console.log('from: ', from);
        this.initTeam(to.params.team);
        next();
    },
    mounted() {
        this.initTeam(this.$route.params.team);
    }
};
</script>

<style lang="scss">
    
</style>
