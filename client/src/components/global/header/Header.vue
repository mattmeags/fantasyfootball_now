<template>
    <header class="header">
        <h1 class="type--h1 header__heading">{{globalHeader}}</h1>
		<div class="header__filter">
			<ChartFilter v-bind:defaultOption="selectedYear" v-bind:filterValues="years" v-on:filterChange="initUpdateYear"></ChartFilter>
        </div>
		<!--<Search v-bind:teams='headerData.conferences'></Search>-->
    </header>
</template>

<script>

// import Search from '@/components/header/Search.vue';
import {mapState, mapActions, mapMutations} from 'vuex';
import ChartFilter from '@/components/global/controls/ChartFilter.vue'

export default {
  	name: 'Header',
	components: {
		// Search,
		ChartFilter
	},
	data: () => ({
		headerData: {},
		showMenu: false,
	}),
	computed: {
		...mapState({
			globalHeader: 'globalHeader',
			years: 'years',
			selectedYear: 'selectedYear'
		}),
		getYearDefaultRemoved: function() {
			console.log('year before: ', this.years);
			this.years.shift();
			console.log('year remaining: ', this.years);
			return this.years;
		}
	},
	methods: {
		...mapActions({
			updateYear: 'updateYear'
		}),
		...mapMutations({
			setSelectedYear: 'setSelectedYear'
		}),
		initUpdateYear(selected) {
			this.updateYear({
				year: selected,
				route: this.$route.name,
				params: this.$route.params
			});
		},
		
	},
	created() {
		if (!this.selectedYear) {
			this.setSelectedYear(this.years[0])
			console.log('mounted updated');
		}
	}
};
</script>

<style  lang="scss">
    @import '@/assets/styles';

    .header {
        background: $white;
        padding: 10px 15px 10px 65px;
        position: fixed;
		top: 0;
        width: 100%;
        height: $header-height;
        z-index: $domiant-index;
        box-sizing: border-box;
        display: flex;
		justify-content: space-between;
        align-items: center;
    }
    
</style>
