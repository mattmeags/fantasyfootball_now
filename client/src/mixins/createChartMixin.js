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
            console.log('where are you breaking');
            console.log(this.chartData);
            const selector = this.chartSelector,
                chartData = this.chartData,
                // this.$el (this is the vue instance) ($el is the outermost parent element)
                ctx = this.$el.querySelector(selector),
                myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
            console.log(this);
            console.log('myChart: ', myChart);
            //myChart.destroy()
            this.Chart = {};
            this.Chart = myChart;
        },

        destroyChart() {
            console.log(this.Chart);
            this.Chart.destroy();

        },

        updateChart() {
            this.destroyChart();

            this.createChart();
        }
    },
    watch: {
        chartData() {
            console.log('watch');
            this.updateChart();
        }
    },
    mounted() {
        this.createChart();
    }
}