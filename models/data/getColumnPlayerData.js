function getColumnPlayerData(seriesKey, playerData, filter) {
    let chartData = {
        labels: [],
        series: []
    };
    console.log(seriesKey);
    playerData.forEach(player => {
        if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
            if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                return false;
            }
            if (player[seriesKey] > 0) {
                chartData.labels.push(player.playerName);
                chartData.series.push(player[seriesKey]);
            }
        }
    });
    return chartData;
}

module.exports = getColumnPlayerData;
