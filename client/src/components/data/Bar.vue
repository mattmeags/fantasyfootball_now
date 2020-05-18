<template>
    <div class="chart">
        <canvas data-bar-chart></canvas>
        <!-- <apexchart type=bar height=266 :options="chartOptions" :series="series" ></apexchart> -->
    </div>
</template>

<script>
import {trimNames, sortBar} from '../../assets/scripts/utilities';
//TODO: do we need datastyle?
import labelStyleMixin from '../../mixins/labelStyleMixin';
import createChartMixin from '@/mixins/createChartMixin';
export default {
    name: 'Bar',
    props: {
        // The X-axis
        labels: Array,
        // Data
        values: Array,
        // boolean if horizontal
        isHorizontal: Boolean,
        // Some charts don't need name trim
        trimLabels: Boolean,
        // Array of team colors
        colors: Array,
        // Sory from higest to lowests
        sort: Boolean
    }, //['labels', 'values', 'isHorizontal', 'trimLabels', 'colors'],
    mixins: [labelStyleMixin, createChartMixin],
    data: function() {
        return {
            chartSelector: '[data-bar-chart]',
            type: this.isHorizontal ? 'horizontalBar' : 'bar',
            options: {
                legend: {
                    display: false
                }
            }
        }
    },
    computed: {
        chartSeries() {
            let series = {}
            if (this.sort) {
			    series = sortBar(this.values, this.labels);
            } else {
                series = {
                    data: this.values,
                    labels: this.labels
                }
            }
            return series
		},
        chartData() {
            console.log('labels :', this.colors)
            console.log('bar chartseries: ', this.chartSeries );
            return {
                type: this.type,
                data: {
                    datasets: [{
                        data: this.chartSeries.data,
                        backgroundColor: this.colors,
                    }],
                    labels: this.trimLabels ? trimNames(this.chartSeries.labels) : this.chartSeries.labels
                },
                options: this.options
            }
        },
        // series() {
        
    },
    // mounted() {
    //     console.log('this: ', this);
    //     console.log(this.values);
    //     if (this.sort) {
    //         const sortedData = sortBar(this.values, this.labels);
    //         this.values = sortedData.data;
    //         this.labels = sortedData.labels;
    //     }
    // }
}
</script>