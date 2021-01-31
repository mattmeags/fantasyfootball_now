<template>
    <div class="chart">
        <canvas data-bar-chart></canvas>
    </div>
</template>

<script>
import { trimNames } from '../../assets/scripts/utilities';
import labelStyleMixin from '../../mixins/labelStyleMixin';
import sortBarMixin from '@/mixins/sortBar.js';
import chartMixin from '@/mixins/chartMixin';
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
    mixins: [labelStyleMixin, chartMixin, sortBarMixin],
    data: function() {
        return {
            chartSelector: '[data-bar-chart]',
            type: this.isHorizontal ? 'horizontalBar' : 'bar',
            finalColors: this.colors,
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                // TODO: handle horizontal labels here
                scales: {
                //     yAxes: [{
                //         ticks: {
                //             mirror: this.isHorizontal ? true : false,
                            
                //             colors: '#fff'
                //         }
                //     }]
                    xAxes: [{
                        barPercentage: 0.4
                    }]
                }
            }
        }
    },
    computed: {
        chartSeries() {
            let series = {}
            if (this.sort) {
                series = this.sortBar(this.values, this.labels);
                if ('sortedIndexes' in series && series.sortedIndexes) {
                    this.finalColors = series.sortedIndexes.map(index => {
                        return this.colors[index]
                    });
                }
            } else {
                series = {
                    data: this.values,
                    labels: this.labels
                }
            }
            return series
		},
        chartData() {
            return {
                type: this.type,
                data: {
                    datasets: [{
                        data: this.chartSeries.data,
                        backgroundColor: this.finalColors,
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