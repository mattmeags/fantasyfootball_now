<template>
    <div class="chart">
		 <canvas data-donut-chart></canvas>
    </div>
</template>

<script>
import {convertStringsToInts, trimNames} from '@/assets/scripts/utilities';

import chartMixin from '@/mixins/chartMixin';
import legendStyleMixin from '@/mixins/legendStyleMixin';

export default {
  name: 'DonutSplit',
  props: {
		labels: Array,
		values: Array,
		colors: Array
	},
    mixins: [chartMixin, legendStyleMixin],
	data: () => ({
        chartSelector: '[data-donut-chart]',
        type: 'doughnut',
        options: {
            maintainAspectRatio: false,
        }
    }),
  	computed: {
      	chartData() {
        	return {
				type: this.type,
                data: {
                    datasets: [{
                        data: this.values,
                        backgroundColor: this.colors
                    }],
                    labels: trimNames(this.labels),
                },
                options: this.options
        	}
      	},
    },
    mounted() {
        console.log('donut');
        this.Chart.height = 400;
        console.log(this.Chart);
        
    }
};
</script>

<style lang="scss" scoped>
//   .chart {
//     height: 100%;
//     width: 100%;
//     text-align: left;
//   }
</style>
