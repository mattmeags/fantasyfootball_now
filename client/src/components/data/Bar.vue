<template>
    <div class="chart">
        <apexchart type=bar height=350 :options="chartOptions" :series="series" ></apexchart>
    </div>
</template>

<script>
const util = require('../../assets/scripts/utilities');
export default {
    name: 'Bar',
    props: ['labels', 'values'],
    computed: {
        series() {
            return this.values;
        },
        chartOptions() {
            return {
                chart: {
                height: 350,
                type: 'bar',
                // events: {
                //   click: function (chart, w, e) {
                //     console.log(chart, w, e)
                //   }
                // },
                },
                //colors: colors,
                plotOptions: {
                    bar: {
                        columnWidth: '35%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false,
                },

                xaxis: {
                    categories: util.trimNames(this.labels),
                    // labels: {
                    //     style: {
                    //         //colors: colors,
                    //         fontSize: '14px'
                    //     }
                    // }
                }
            }
        }
    }
}
</script>