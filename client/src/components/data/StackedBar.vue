<template>
    <div class="chart">
		<canvas data-stacked-bar-chart></canvas>
	</div>
</template>

<script>
import { trimNames, addColorToDataSet, sumArrays } from '@/assets/scripts/utilities';
import labelStyleMixin from '@/mixins/labelStyleMixin';
import chartMixin from '@/mixins/chartMixin';
import legendStyleMixin from '@/mixins/legendStyleMixin';
import sortBarMixin from '@/mixins/sortBar.js';

export default {
	name: 'StackedBar',
	props: ['labels', 'values', 'colors'],
	mixins: [labelStyleMixin, chartMixin, legendStyleMixin, sortBarMixin],
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
			const sortedSeries = this.sortStackedBar(this.values, this.labels);
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
	methods: {
		sortStackedBar: function(data, labels) {
			// [{data:['2', '4','1', '7', '5'], label:'Value 1'}, {data:['6', '11', '8', '2', '4'], label: 'Value 2'}]

			const totalsArray = sumArrays(data[0].data, data[1].data),
				sortedChart = this.sortBar(totalsArray, labels),
				sortedOrderArr = sortedChart.sortedIndexes;
			
			let sortedSeries = [
				{
					data: [],
					label: data[0].label
				},
				{
					data: [],
					label: data[1].label
				}
				],
				finalSorted = {};
			
			sortedOrderArr.forEach((element, index) => {
				sortedSeries[0].data.push(data[0].data[element]);
				sortedSeries[1].data.push(data[1].data[element]);
			});

			finalSorted.data = sortedSeries;
			finalSorted.labels = sortedChart.labels
			return finalSorted;
		}
	}
};
</script>

<style lang="scss" scoped>

</style>