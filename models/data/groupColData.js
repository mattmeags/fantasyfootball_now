function getGroupedColumnData(seriesValues, playerData, filter) {
    //console.log(seriesValues);
    let chartData = {
        labels: [],
        series: [{ data: [], label: seriesValues.seriesName1}, { data: [], label: seriesValues.seriesName2}]
    };

    playerData.forEach((player) => {
        if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
            if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                    return false;
            }

            if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                return false;
            }
            chartData.labels.push(player.playerName);
            chartData.series[0].data.push(player[seriesValues.seriesValue1]);
            chartData.series[1].data.push(player[seriesValues.seriesValue2]);
        }
    });

    return chartData;
}

module.exports = getGroupedColumnData;