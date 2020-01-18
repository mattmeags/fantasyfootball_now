<template>
    <div class="chart">
        <apexchart type="bar" height=350 :series="series" :options="chartOptions"></apexchart>
    </div>
</template>

<script>
import util from '../../assets/scripts/utilities';

export default {
  name: 'CompareBar',
  props: ['labels', 'values'],

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
          categories: util.trimNames(this.labels),
        },
        dataLabels: {
          textAnchor: 'middle',
        },
        chart: {
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
