'use strict';

//TODO use scss module to populate this
const fontSize = 12,
    fontFamily = 'Roboto, sans-serif',
    labelsColor = '#565658';
export default {
    data: () => ({
        options: {
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    fontColor: labelsColor,
                    boxWidth: 8,
                    usePointStyle: true,
                    legend: 'end'
                }
            }
        }
    })
}