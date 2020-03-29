<template>
    <div class="chart">
      <apexchart type=bar height=266 :options="chartOptions" :series="series" ></apexchart>
    </div>
</template>

<script>
import {trimNames} from '../../assets/scripts/utilities';
import chartProperties from '../../assets/scripts/chartProperties';

export default {
  name: 'StackedBar',
  props: ['labels', 'values', 'colors'],
  computed: {
    series() {
      return this.values;
    },
    chartOptions() {
      console.log(this.colors);
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
          labels: {
              style: {
                  fontSize: chartProperties.labelsFontSizeSmall,
                  fontFamily: chartProperties.fontFamily,
                  colors: chartProperties.labelsColor
              }
          }
        },
        yaxis: {
          labels: {
              style: {
                  fontSize: chartProperties.labelsFontSizeSmall,
                  fontFamily: chartProperties.fontFamily,
                  colors: chartProperties.labelsColor
              }
          }
        },
        legend: {
          position: 'top',
          fontSize: chartProperties.labelsFontSizeSmall,
          fontFamily: chartProperties.fontFamily,
          labels: {
            colors: chartProperties.labelsColor
          },
        },
        chart: {
          stacked: true,
          toolbar: {
            show: false
          },

          //TODO: Later phase
          // events: {
          //   dataPointSelection: (event, chartContext, config) => {
          //     this.chartDive(this.labels[config.dataPointIndex]);
          //   },
          // },
        },
        colors: this.colors
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

<style lang="scss" scoped>
  .chart {
    top: 15px;
  }
</style>