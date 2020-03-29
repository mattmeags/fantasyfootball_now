// TODO: update tabbing here
<template>
    <div class="chart">
      <apexchart type="donut" height=266 v-bind:options="chartOptions" v-bind:series="series"></apexchart>
    </div>
</template>

<script>
import {convertStringToInt, trimNames} from '../../assets/scripts/utilities';
import chartProperties from '../../assets/scripts/chartProperties';

export default {
  name: 'DonutSplit',
  props: ['labels', 'values', 'colors'],
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
            fontSize: chartProperties.labelsFontSizeLarge,
            fontFamily:  chartProperties.fontFamily,
            horizontalAlign: 'left',
            position: 'right',
            offsetY: 50,
            markers: {
              stroke: chartProperties.labelsColor
            },
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
