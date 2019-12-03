export default class StandardDataObject {
    constructor(labels, series) {
        this.labels = labels;
        this.series = series;
    }
}

// export default class CompareBarDataObject {
//     constructor(labels, series1, series2) {
//         this.labels = labels;
//         this.series = [{ data: series1 }, { data: series2 }];
//     }
// }