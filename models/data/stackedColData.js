function getStackedColumnData(seriesValues, playerData, filter) {
    // empty data
    seriesValues.forEach(element => {
        element.seriesObject.data = [];
    });

    let chartData = {
        labels: [],
        series: []
    }
    
    playerData.forEach((player) => {
        if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
            if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                    return false;
            }
            // if any of the values are greater than 0 push all values required
            seriesValues.forEach(element => {
                if (player[element.seriesName] > 0) {
                    chartData.labels.push(player.playerName);
                    seriesValues.forEach(element2 => {
                        element2.seriesObject.data.push(player[element2.seriesName]);
                    });
                    return;
                }
            });
        }
    });

    seriesValues.forEach(element => {
        chartData.series.push(element.seriesObject);
    });

    return chartData
}

module.exports = getStackedColumnData;