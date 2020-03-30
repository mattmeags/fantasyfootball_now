<template>
    <div class="chart">
        <apexchart type=bar height=266 :options="chartOptions" :series="series" ></apexchart>
    </div>
</template>

<script>
import {trimNames} from '../../assets/scripts/utilities';
import dataStyleMixin from '../../mixins/dataStyleMixin';
export default {
    name: 'Bar',
    props: {
        // The X-axis
        labels: Array,
        // Data
        values: Array,
        // boolean if horizontal
        isHorizontal: Boolean,
        // TODO: find out whaat for
        trimLabels: Boolean,
        // Array of team colors
        colors: Array
    }, //['labels', 'values', 'isHorizontal', 'trimLabels', 'colors'],
    mixins: [dataStyleMixin],
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