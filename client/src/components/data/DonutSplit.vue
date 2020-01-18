<template>
    <div class="chart">
      <apexchart width="350" type="donut" v-bind:options="chartOptions" v-bind:series="series"></apexchart>
    </div>
</template>

<script>
import utilities from '../../assets/scripts/utilities';

export default {
  name: 'DonutSplit',
  props: ['labels', 'values'],
  computed: {
      series() {
        return utilities.convertStringToInt(this.values)
      },

      chartOptions() {
        return {
          chart: {
            type: 'donut',
            events: {
              dataPointSelection: (event, chartContext, config) => {
                this.chartDive(this.labels[config.dataPointIndex]);
              },
            },
          },
          labels: utilities.trimNames(this.labels),
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
