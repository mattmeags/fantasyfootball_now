<template>
    <div>
    <br>
    <br>
    <br>
    <apexchart width="500" type="donut" :options="chartOptions" :series="series"></apexchart>
    {{values}}

    </div>
</template>

<script>
    const utilities = require('../../assets/scripts/utilities');

    export default {
        name: 'testchart',
        props: ['labels', 'values'],
        data: function() {
            console.log(this.series);
            //this.test();
            let finalSeries = utilities.convertIntToString(this.values);
            return {
                series: utilities.convertIntToString(this.values),

                chartOptions: {
                    chart: {
                        type: 'donut'
                    },
                    labels: utilities.trimNames(this.labels)
                }
            }
        }
    }
</script>