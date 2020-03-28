<template>
    <div class="chart">
        <apexchart type=bar height=266 :options="chartOptions" :series="series" ></apexchart>
    </div>
</template>

<script>
import {trimNames} from '../../assets/scripts/utilities';
import dataMixin from '../../mixins/dataMixin';
export default {
    name: 'Bar',
    props: ['labels', 'values', 'isHorizontal', 'trimLabels', 'colors'],
    mixins: [dataMixin],
    computed: {
        series() {
            return this.values;
        },
        chartOptions() {
            return {
                chart: {
                    height: '100%',
                    type: 'bar',
                    toolbar: {
                        show: false
                    },
                    // events: {
                    //   click: function (chart, w, e) {
                    //     console.log(chart, w, e)
                    //   }
                    // },
                },
                colors: this.colors,
                plotOptions: {
                    bar: {
                        columnWidth: '35%',
                        columnHeight: '10px',
                        distributed: true,
                        horizontal: this.isHorizontal,
                        dataLabels: {
                            position: 'bottom'
                        }
                    }
                },
                dataLabels: {
                    enabled: this.isHorizontal,
                    textAnchor: 'start',
                    formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex]
                    }
                },
                legend: {
                    position: 'top'
                },
                xaxis: {
                    categories: this.trimLabels ? trimNames(this.labels) : this.labels,
                },
                yaxis: {
                    show: !this.isHorizontal,
                    labels: {
                        show: !this.isHorizontal,
                    }
                }
            }
        }
    }
}
</script>