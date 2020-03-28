<template>
    <div class="chart">
        <apexchart type="bar" height=266 :series="series" :options="chartOptions"></apexchart>
    </div>
</template>

<script>
import {trimNames} from '../../assets/scripts/utilities';
import dataMixin from '../../mixins/dataMixin';

export default {
	name: 'CompareBar',
	props: ['labels', 'values', 'colors'],
	mixins: [dataMixin],
	// using computed over data so its reactive and updates when the props do
	computed: {
		series() {
		return [{
			name: 'Targets',
			type: 'column',
			data: this.values[0].data,
		},
		{
			name: 'Receptions',
			type: 'column',
			data: this.values[1].data,
		}];
		},
		chartOptions() {
			return {
				plotOptions: {
					bar: {
						horizontal: false,
						dataLabels: {
							position: 'top',
						},
					},
				},
				xaxis: {
					categories: trimNames(this.labels),
				},
				legend: {
					position: 'top',
				},
				dataLabels: {
					textAnchor: 'middle',
				},
				chart: {
				// width: '100%',
				// height: '100%',
					toolbar: {
						show: false
					},
					events: {
						dataPointSelection: (event, chartContext, config) => {
						this.chartDive(this.labels[config.dataPointIndex]);
						},
					},
				},
				colors: this.colors,
			};
		},
	},
	methods: {
		chartDive(value) {
			this.$emit('playerSelect', value);
		},
	},
};
</script>

