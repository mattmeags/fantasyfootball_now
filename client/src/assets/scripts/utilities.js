'use strict';

var utilities = {
    convertIntToString: (strings) => {
        let integers = strings.map(string => parseInt(string, 10));
        return integers;
    },
    trimNames: (names) => {
        let namesFix = names.map(name => name.substring(0, name.indexOf("\\")));
        return namesFix;
    }
}

module.exports = utilities;