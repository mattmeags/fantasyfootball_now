'use strict';

export default {
    methods: {
        /**
         * 
         * @param {*} data 
         * @param {*} labels 
         */
        sortBar: function(data, labels) {
            console.log('sort bar');
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
    }
}