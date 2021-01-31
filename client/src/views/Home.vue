<template>
	<Dashboard>
		<Tile tileCLass="w-12">
			<template v-slot:header>
				<TileHeader title="Passing"/>
			</template>
			<Bar :labels="activePassData.labels" :values="activePassData.series" :isHorizontal="activePassData.isHorizontal" :colors="offenseColorsOrdered" :sort="true"/>
			<template v-slot:filter>
				<ChartFilter :filterValues="filterValues" :defaultOption="filterValues[0]" @filterChange="updatePassChartWithFilter"/>
			</template>
		</Tile>
		<Tile tileCLass="w-12">
			<template v-slot:header>
				<TileHeader title="Rushing"/>
			</template>
			<Bar :labels="activeRushData.labels" :values="activeRushData.series" :isHorizontal="activeRushData.isHorizontal" :colors="offenseColorsOrdered" :sort="true"/>
			<template v-slot:filter>
				<ChartFilter :filterValues="filterValues" :defaultOption="filterValues[0]" @filterChange="updateRushChartWithFilter"/>
			</template>
		</Tile>
		<Tile tileCLass="w-12">
			<template v-slot:header>
				<TileHeader title="Passing Yards Against"/>
			</template>
			<Bar :labels="passYardsAgainst.labels" :values="passYardsAgainst.series" :isHorizontal="passYardsAgainst.isHorizontal" :colors="defenseColorsOrdered" :sort="true"/>
		</Tile>
		<Tile tileCLass="w-12">
			<template v-slot:header>
				<TileHeader title="Rushing Yards Against"/>
			</template>
			<Bar :labels="rushYardsAgainst.labels" :values="rushYardsAgainst.series" :isHorizontal="rushYardsAgainst.isHorizontal" :colors="defenseColorsOrdered" :sort="true"/>
		</Tile>
	</Dashboard>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

import { paths } from '../assets/scripts/utilities'
import { mapMutations, mapActions, mapState } from 'vuex';
import Bar from '@/components/data/Bar.vue';
import TileHeader from '@/components/global/layout/TileHeader.vue';
import ChartFilter from '@/components/global/controls/ChartFilter.vue';

export default {
	name: 'home',
	components: {
		HelloWorld,
		Bar,
		TileHeader,
		ChartFilter
	},
	data: () => ({
		filterValues: ['Yards', 'Attempts']
	}),
	methods: {
		...mapMutations({
			setPresentationState: 'setPresentationState'
		}),
		...mapActions({
			getLeagueData: 'getLeagueData'
		}),
		updatePassChartWithFilter: function(selected) {
			//console.log(selected);
			let data = `pass${selected}`;
			this.setPresentationState({stateKey: 'activePassData', data: this[data]});
		},
		updateRushChartWithFilter: function(selected) {
			let data = `rush${selected}`;
			this.setPresentationState({stateKey: 'activeRushData', data: this[data]});
		}
	},
	computed: {
		...mapState({
			passAttempts: 'passAttempts',
			passYards: 'passYards',
			passYardsAgainst: 'passYardsAgainst',
			rushAttempts: 'rushAttempts',
			rushYards: 'rushYards',
			rushYardsAgainst: 'rushYardsAgainst',
			//yards: 'yards',
			offenseColorsOrdered: 'offenseColorsOrdered',
			defenseColorsOrdered:'defenseColorsOrdered',
			//leagueYardsData: 'leagueYardsData'
			activePassData: 'activePassData',
			activeRushData: 'activeRushData'
		})
	},
	mounted() {
		this.getLeagueData();

		this.setPresentationState({stateKey: 'globalHeader', data:'Fantasy Football Now'});
	},
};


</script>
