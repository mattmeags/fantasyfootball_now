'use strict';

const fontSize = '12px',
    fontFamily = 'Roboto, sans-serif',
    labelsColor = '#565658';

export default {
    computed: {
        chartOptions() {
            return {
                // used in Donut Split
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
                // Used in Bar, Compare Bar, Stacked Bar
                dataLabels: {
                    style: {
						fontSize: fontSize,
						fontFamily: fontFamily
					}
                },
                // Used in Bar, Compare Bar, Stacked Bar
                xaxis: {
                    labels: {
                        style: {
                            fontSize: fontSize,
                            fontFamily: fontFamily,
                            colors: labelsColor
                        }
                    }
                },
                // Used in Bar, Compare Bar, Stacked Bar
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