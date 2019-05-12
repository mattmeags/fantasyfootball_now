<template>
    <div>
    <br>
    <br>
    <br>
    <apexchart width="500" type="donut" :options="chartOptions" :series="finalSeries"></apexchart>


    </div>
</template>

<script>
const utilities = require('../../assets/scripts/utilities');

export default {
  name: 'DonutSplit',
  props: ['labels', 'values'],
  data() {
      
    return {
      series: utilities.convertStringToInt(this.values),

      chartOptions: {
        chart: {
          type: 'donut',
          events: {
            dataPointSelection: (event, chartContext, config) => {
              this.chartDive(this.labels[config.dataPointIndex]);
            },
          },
        },
        labels: utilities.trimNames(this.labels),
      },
    };
  },
  methods: {
    chartDive(value) {
      this.$emit('playerSelect', value);
    },
  },
};
</script>
