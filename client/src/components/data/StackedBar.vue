<template>
    <div class="chart">
		<canvas data-stacked-bar-chart></canvas>
	</div>
</template>

<script>
import {trimNames, addColorToDataSet, sortStackedBar} from '@/assets/scripts/utilities';
import labelStyleMixin from '@/mixins/labelStyleMixin';
import chartMixin from '@/mixins/chartMixin';
import legendStyleMixin from '@/mixins/legendStyleMixin';

export default {
	name: 'StackedBar',
	props: ['labels', 'values', 'colors'],
	mixins: [labelStyleMixin, chartMixin, legendStyleMixin],
	data: () => ({
		chartSelector: '[data-stacked-bar-chart]',
		type: 'bar',
		options: {
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					stacked: true,
				}],
				 yAxes: [{
					stacked: true,
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	}),
	computed: {
		chartSeries() {
			const sortedSeries = sortStackedBar(this.values, this.labels);
			return {
				data: sortedSeries.data,
				labels: sortedSeries.labels,
			}
		},
		chartData() {
			//Add backgroundcolor to match structure
			const dataSetWithColors = addColorToDataSet(this.chartSeries.data, this.colors);
			return {
				type: this.type,
				data: {
					labels: trimNames(this.chartSeries.labels),
					datasets: dataSetWithColors
				},
				options: this.options
			}
		}	
	},
	// methods: {
	// 	chartDive(value) {
	//  TODO: phase 2
	// 	this.$emit('playerSelect', value);
	// 	},
	// },
};
</script>

<style lang="scss" scoped>

</style>