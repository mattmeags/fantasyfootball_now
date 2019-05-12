<template>
    <div id="chart">
        {{chartOptions.xaxis.categories}}
        asfsadf
      <apexchart type=bar height=350 :options="chartOptions" :series="series" ></apexchart>
    </div>
</template>

<script>
const util = require('../../assets/scripts/utilities');

export default {
  name: 'StackedBar',
  props: ['labels', 'values'],
  computed: {
    series() {
      return this.values;
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
          categories: util.trimNames(this.labels),
        },
        chart: {
          stacked: true,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              this.chartDive(this.labels[config.dataPointIndex]);
            },
          },
        },


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
