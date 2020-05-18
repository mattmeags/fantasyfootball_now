function getStackedColumnData(seriesValues, playerData, filter) {
    // empty data
    seriesValues.forEach(element => {
        element.seriesObject.data = [];
    });
    
    let chartData = {
        labels: [],
        series: []
    }
    
    playerData.forEach(player => {
        //console.log(player.playerName);
        if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
            if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                    return false;
            }

            let qualified = false;
            //Check if any of the values are greater than 0
            seriesValues.forEach(element => {
                if (player[element.seriesName] > 0) {
                    qualified = true;
                }
            });
            // if any values were > 0 push them all
            if (qualified) {
                chartData.labels.push(player.playerName);
                seriesValues.forEach(element => {
                    element.seriesObject.data.push(player[element.seriesName]);
                });
            }
        }
    });

    seriesValues.forEach(element => {
        chartData.series.push(element.seriesObject);
    });

    return chartData
}

module.exports = getStackedColumnData;