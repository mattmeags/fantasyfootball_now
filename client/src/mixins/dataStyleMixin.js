'use strict';

const fontSize = '12px',
    fontFamily = 'Roboto, sans-serif',
    labelsColor = '#565658';

export default {
    computed: {
        chartOptions() {
            return {
                legend: {
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    labels: {
                        colors: labelsColor
					},
					markers: {
						stroke: labelsColor
					}
                },
                // Used in Bar
                dataLabels: {
                    style: {
						fontSize: fontSize,
						fontFamily: fontFamily
					}
                },
                // Used in Bar
                xaxis: {
                    labels: {
                        style: {
                            fontSize: fontSize,
                            fontFamily: fontFamily,
                            colors: labelsColor
                        }
                    }
                },
                // Used in Bar
                yaxis: {
                    labels: {
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                        colors: labelsColor
                    }
                }
            }
        }
    },
}