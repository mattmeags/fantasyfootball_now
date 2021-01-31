<template>
    <div class="chart">
		<canvas data-compare-bar-chart></canvas>
	</div>
</template>

<script>
import {trimNames, addColorToDataSet, sortGroupedBar} from '@/assets/scripts/utilities';
import labelStyleMixin from '@/mixins/labelStyleMixin';
import chartMixin from '@/mixins/chartMixin';
import legendStyleMixin from '@/mixins/legendStyleMixin';
import sortBarMixin from '@/mixins/sortBar.js';

export default {
	name: 'CompareBar',
	props: ['labels', 'values', 'colors'],
	mixins: [labelStyleMixin, chartMixin, legendStyleMixin, sortBarMixin],
	data: () => ({
		chartSelector: '[data-compare-bar-chart]',
		type: 'bar',
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	}),
	// using computed over data so its reactive and updates when the props do
	computed: {
		chartSeries() {
			const series = this.sortGroupedBar(this.values, this.labels);
			return {
				data: series.data,
				labels: series.labels
			}
		},
		chartData() {
			const dataSetWithColors = addColorToDataSet(this.chartSeries.data, this.colors)

			return {
				type: this.type,
				data: {
					labels: trimNames(this.chartSeries.labels),
					datasets: dataSetWithColors
				},
				options: this.options
			}
		},
	},
	methods: {
		sortGroupedBar: function(data, labels) {
			// [{data:['2', '4', '1', '7', '4'], label:'Value 1'}, {data:['6', '11', '8', '2', '5'], label: 'Value 2'}]
			const firstSort = this.sortBar(data[0].data, labels),
				finalSortedData = [
					{
						// sort by first data series so can add her
						data: firstSort.data,
						label: data[0].label,
					},
					{
						data: [],
						label: data[1].label,
					},
				],
				secondSort = [],
				finalSeries = {};

			// check the index of the sorted and sort the other data series with it
			firstSort.sortedIndexes.forEach(element => {
				secondSort.push(data[1].data[element]);
			});

			finalSortedData[1].data = secondSort;

			finalSeries.data = finalSortedData;
			finalSeries.labels = firstSort.labels;

			return finalSeries;
		},
		chartDive(value) {
			this.$emit('playerSelect', value);
		},
	},
};
</script>

