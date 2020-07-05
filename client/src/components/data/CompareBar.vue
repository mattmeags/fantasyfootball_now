<template>
    <div class="chart">
        <!-- <apexchart type="bar" height=266 :series="series" :options="chartOptions"></apexchart> -->
		<canvas data-compare-bar-chart></canvas>
	</div>
</template>

<script>
import {trimNames, addColorToDataSet, sortGroupedBar} from '@/assets/scripts/utilities';
import labelStyleMixin from '@/mixins/labelStyleMixin';
import chartMixin from '@/mixins/chartMixin';
import legendStyleMixin from '@/mixins/legendStyleMixin';

export default {
	name: 'CompareBar',
	props: ['labels', 'values', 'colors'],
	mixins: [labelStyleMixin, chartMixin, legendStyleMixin],
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
			const series = sortGroupedBar(this.values, this.labels);
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
		chartDive(value) {
			this.$emit('playerSelect', value);
		},
	},
};
</script>

