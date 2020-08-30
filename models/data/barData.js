'use strict';

module.exports = function(labels, data, horizontal = false) {
    this.labels = labels;
    this.series = data;
    this.isHorizontal = horizontal;
}