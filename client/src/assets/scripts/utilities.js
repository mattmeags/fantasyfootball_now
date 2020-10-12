//TODO: Need lots of comments
/**
 * @param {array} strings
 * @description converts array of strings into array of integers
*/
export function convertStringsToInts(strings) {
    const integers = strings.map(string => parseInt(string, 10));
    return integers;
};
/**
 * @param {array} strings
 * @description trims the PFR notations off names
*/
export function trimNames (names) {
    const namesFix = names.map(name => {
        return trimName(name);
    });
    return namesFix;
};
export function trimName(name) {
    let finalName;
    if (name.indexOf('\\') != -1) {
        finalName = name.substring(0, name.indexOf('\\'));
    } else {
        finalName = name;
    }
    if (finalName.indexOf('*') != -1) {
        finalName = name.substring(0, name.indexOf('*'));
    }
    if (finalName.indexOf('+') != -1) {
        finalName = name.substring(0, name.indexOf('+'));
    }
    return finalName;
};
// this can be a mixin
export function getColors(teamColor) {
    const Color = require('color');

    let dataColors = [];
    dataColors.push(teamColor);
    for (var i = 0; i < 5; i++) {
        dataColors.push(Color(dataColors[i]).darken(0.3).hex());
    }
    return dataColors;
}
//TODO: add to constants
const baseUrl = 'http://localhost:4000/';
export const paths = {
    loadAllTeamsUrl: `${baseUrl}getTeams`,
    loadSingleTeamUrl: `${baseUrl}loadTeam`,
    loadPositinsUrl: `${baseUrl}getPositions`,
    loadPositionsPageUrl: `${baseUrl}loadPositions`,
    getYears: `${baseUrl}getYears`,
    updateYear: `${baseUrl}updateYear`,
    home: `${baseUrl}home`,
    createUrl: (endPoint) => baseUrl + endPoint,
}

export function addColorToDataSet(dataSet, colors) {
    dataSet.forEach((dataSet, index) => {
        dataSet.backgroundColor = colors[index];
    });
    return dataSet;
}

export function sortBar(data, labels) {
    let finalData = [],
        finalLabels = [],
        sortedIndexes = [],
        sortedSeries = {};

    if (data && labels) {
        finalData.push(data[0]);
        finalLabels.push(labels[0]);
        sortedIndexes.push(0);

        data.forEach((element, index) => {
            
        // skip index 0 cause we push the first values right away
            if (index > 0) {
                // compare current element against final values array
                for (var i = 0; i < finalData.length; i++) {
                    let num;
                    if (element == "") {
                        num = 0;
                    } else {
                        num = parseInt(element, 10);
                    }
                    //Insert element in space before item it is larger than
                    if (parseInt(num, 10) > parseInt(finalData[i], 10)) {
                        //splice(index to inject, # of els to remove, element to add)
                        finalData.splice(i, 0, num);
                        finalLabels.splice(i, 0, labels[index]);
                        sortedIndexes.splice(i, 0, index);
                        break;
                    }
                    //Add to end of arry if its smaller than everything else
                    if ((i + 1) == finalData.length) {
                        finalData.push(num);
                        finalLabels.push(labels[index]);
                        sortedIndexes.push(index);
                        break;
                    }
                }
            }
        });
        sortedSeries = {
            data: finalData,
            labels: finalLabels,
            sortedIndexes: sortedIndexes
        }
    }
    
    return sortedSeries;
}

function sumArrays(array1, array2) {
    let sumsArray = []
    array1.forEach((element, index) => {
        let arr1Num,
            arr2Num;
        //CHeck of empty strings as values
        if (element == "") {
            arr1Num = 0;
        } else {
            arr1Num = parseInt(element, 10);
        }
        if (array2[index] == "") {
            arr2Num = 0;
        } else {
            arr2Num = parseInt(array2[index], 10);
        }

        let sum = arr1Num + arr2Num;
        sumsArray.push(sum);
    });
    return sumsArray;
}

export function sortStackedBar(data, labels) {
    // [{data:['2', '4','1', '7', '5'], label:'Value 1'}, {data:['6', '11', '8', '2', '4'], label: 'Value 2'}]

    const totalsArray = sumArrays(data[0].data, data[1].data),
        sortedChart = sortBar(totalsArray, labels),
        sortedOrderArr = sortedChart.sortedIndexes;
    
    let sortedSeries = [
        {
            data: [],
            label: data[0].label
        },
        {
            data: [],
            label: data[1].label
        }
        ],
        finalSorted = {};
    
    sortedOrderArr.forEach((element, index) => {
        sortedSeries[0].data.push(data[0].data[element]);
        sortedSeries[1].data.push(data[1].data[element]);
    });

    finalSorted.data = sortedSeries;
    finalSorted.labels = sortedChart.labels
    return finalSorted;
}

export function sortGroupedBar(data, labels) {
    // [{data:['2', '4', '1', '7', '4'], label:'Value 1'}, {data:['6', '11', '8', '2', '5'], label: 'Value 2'}]
    const firstSort = sortBar(data[0].data, labels),
        finalSortedData = [
            {
                // sort by first data series so can add her
                data: firstSort.data,
                label: data[0].label,
            },
            {
                data: [],
                label: data[1].label,
            },
        ],
        secondSort = [],
        finalSeries = {};

    // check the index of the sorted and sort the other data series with it
    firstSort.sortedIndexes.forEach(element => {
        secondSort.push(data[1].data[element]);
    });

    finalSortedData[1].data = secondSort;

    finalSeries.data = finalSortedData;
    finalSeries.labels = firstSort.labels;

    return finalSeries;
}
