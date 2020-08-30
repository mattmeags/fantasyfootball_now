'use strict';

//TODO use scss module to populate this
const fontSize = 12,
    fontFamily = 'Roboto, sans-serif',
    labelsColor = '#565658';

export default {
    data: () => ({
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                        colors: labelsColor,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                        colors: labelsColor,
                        beginAtZero: true
                    }
                }]
            }
        }
    }),
}