<template>
    <div class="chart">
      <apexchart type="donut" height=266 v-bind:options="chartOptions" v-bind:series="series"></apexchart>
    </div>
</template>

<script>
import {convertStringToInt, trimNames} from '../../assets/scripts/utilities';
import dataStyleMixin from '../../mixins/dataStyleMixin';

export default {
  name: 'DonutSplit',
  props: ['labels', 'values', 'colors'],
  mixins: [dataStyleMixin],
  computed: {
      series() {
        return convertStringToInt(this.values)
      },

      chartOptions() {
        return {
          	chart: {
				type: 'donut',
				// width: '100%',
				// height: '100%'
				//height:,
				// events: {
				//   dataPointSelection: (event, chartContext, config) => {
				//     this.chartDive(this.labels[config.dataPointIndex]);
				//   },
				//},
          	},
          	labels: trimNames(this.labels),
          	legend: {
				fontSize: '16px',
				horizontalAlign: 'left',
				position: 'right',
				offsetY: 50,
				itemMargin: {
					horizontal: 5
				}
          },
          colors: this.colors
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

<style lang="scss" scoped>
  .chart {
    height: 100%;
    width: 100%;
    text-align: left;
  }
</style>
