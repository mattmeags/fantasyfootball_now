'use strict';

export default {
    data: () => ({
        Chart
    }),
    methods: {
        // chartDive(value) {
        //   this.$emit('playerSelect', value);
        // },
        createChart() {
            const selector = this.chartSelector,
                chartData = this.chartData,
                // this.$el (this is the vue instance) ($el is the outermost parent element)
                ctx = this.$el.querySelector(selector),
                myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
            //myChart.destroy()
            this.Chart = {};
            this.Chart = myChart;
        },

        destroyChart() {
            this.Chart.destroy();

        },

        updateChart() {
            this.destroyChart();

            this.createChart();
        }
    },
    watch: {
        chartData() {
            this.updateChart();
        }
    },
    mounted() {
        this.createChart();
    }
}