

const utilities = {
  /**
     * @function convertStringToInt
     * @param {array} strings
     * @description converts array of strings into array of integers
    */
  convertStringToInt: (strings) => {
    const integers = strings.map(string => parseInt(string, 10));
    return integers;
  },
  /**
     * @function trimNames
     * @param {array} strings
     * @description trims the PFR notations off names
    */
  trimNames: (names) => {
    const namesFix = names.map(name => name.substring(0, name.indexOf('\\')));
    console.log(namesFix);
    return namesFix;
  },
  trimName: (name) => {
    return name.substring(0, name.indexOf('\\'));
  }
};

export default utilities;
