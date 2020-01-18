<template>
    <div class="chart">
        <apexchart type=bar height=350 :options="chartOptions" :series="series" ></apexchart>
    </div>
</template>

<script>
import util from '../../assets/scripts/utilities';
export default {
    name: 'Bar',
    props: ['labels', 'values', 'isHorizontal', 'trimLabels'],
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
                        distributed: true,
                        horizontal: this.isHorizontal
                    }
                },
                dataLabels: {
                    enabled: false,
                },

                xaxis: {
                    categories: this.trimLabels ? util.trimNames(this.labels) : this.labels,
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