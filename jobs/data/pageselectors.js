const TEAMS = require('../../models/global').teams;
const baseURL = 'https://www.pro-football-reference.com';
const teamCodes = ['crd', 'atl', 'rav', 'buf', 'car', 'chi', 'cin', 'cle', 'dal', 'den', 'det', 'gnb', 'htx', 'clt', 'jax', 'kan', 'sdg', 'ram', 'mia', 'min', 'nwe', 'nor', 'nyg', 'nyj', 'rai', 'phi', 'pit', 'sfo', 'sea', 'tam', 'oti', 'was'];

let exportedPageSelectors = []

/**
 * @class
 * @desc - Team name and PFF code pairing
 */
class TeamCode {
    constructor (name) {
        this.name = name;
        var index = TEAMS.findIndex((el) => el === name);
        this.code = teamCodes[index];   
    }
}

/**
 * @class
 * @desc - object used to navigate to page, find data and download it
 */
class PageSelector {
    constructor(url, menuSelector, csvSelector, fileName) {
        this.url = url,
        this.menuSelector = menuSelector;
        this.csvSelector = csvSelector;
        this.fileName = fileName;
    }
}

/**
 * @private
 * @function getTeamCodes
 * @param {Array} - array of team names that will be used in scrape job
 * @returns {Array} - array of TeamCode Objects
 */
function getTeamCodes(teams) {
    const teamCodesArr = [];
    teams.forEach(element => {
        teamCodesArr.push(new TeamCode(element));
    });
    return teamCodesArr;
}

/**
 * @public
 * @function getPassing
 * @param {Array} teams - array of TeamCodes Objects to be used in scrape
 * @desc adds page selector objects for team passing stats
 */
function getPassing(teams) {
    for (var i = 0; i < teams.length; i++) {
        exportedPageSelectors.push(
            new PageSelector(
                baseURL + '/teams/' + teams[i].code + '/2018.htm',
                '#all_passing',
                '#csv_passing',
                teams[i].name + '/passing'
            )
        );  
    }
    return exportedPageSelectors;
};

/**
 * @public
 * @function getRushRec
 * @param {Array} teams - array of TeamCodes Objects to be used in scrape
 * @desc adds page selector objects for team russhing and receiving stats
 */
function getRushRec(teams) {
    for (var i = 0; i < teams.length; i++) {
        exportedPageSelectors.push(
            new PageSelector(
                baseURL + '/teams/' + teams[i].code + '/2018.htm',
                '#all_rushing_and_receiving',
                '#csv_rushing_and_receiving', 
                teams[i].name + '/rushRec'
            )
        );
    }
    return exportedPageSelectors;
};

/**
 * @public
 * @function
 * @description
 * @returns {Object} - a page selector object
 */
function getAllTeamOffense() {
    //teamOffense
    return new PageSelector(
        baseURL + '/years/2018/',
        '#all_team_stats',
        '#csv_team_stats',
        'all/allTeamOffense'
    );
}

/**
 * @public
 * @function
 * @description
 * @returns {Object} - a page selector object
 */
function getAllPassing() {
    //passingOffense: 
    return new PageSelector(
        baseURL + '/years/2018/#all_passing',
        '#all_passing',
        '#csv_passing',
        'all/passingOffense'
    );
}

/**
 * @public
 * @function
 * @description
 * @returns {Object} - a page selector object
 */
function getAllRushingOffense() {
    //rushingOffense: 
    return new PageSelector(
        baseURL + '/years/2018/#all_rushing',
        '#all_rushing',
        '#csv_rushing',
        'all/rushingOffense'
    );
}

/**
 * @public
 * @function
 * @description
 * @returns {Object} - a page selector object
 */
function getAllDefense() {
    //teamDefense: 
    return new PageSelector(
        baseURL + '/years/2018/opp.htm',
        '#all_team_stats',
        '#csv_team_stats',
        'all/allTeamDefense'
    );
}

/**
 * @public
 * @function
 * @description
 * @returns {Object} - a page selector object
 */
function getAllPassingDefense() {
    //passingDefense: 
    return new PageSelector(
        baseURL + '/years/2018/opp.htm',
        '#all_passing',
        '#csv_passing',
        'all/passingDefense'
    );
}

/**
 * @public
 * @function
 * @description
 * @returns {Object} - a page selector object
 */
function getAllRushingDefense() {
    //rushingDefense: 
    return new PageSelector(
        baseURL + '/years/2018/opp.htm',
        '#all_rushing',
        '#csv_rushing',
        'all/rushingDefense'
    );
}

/**
 * @public
 * @function
 * @description
 * @returns {Object} - a page selector object
 */
function getTeamRelatedData() {
    exportedPageSelectors = [
        getAllTeamOffense(), 
        getAllPassing(), 
        getAllRushingOffense(), 
        getAllDefense(), 
        getAllPassingDefense(), 
        getAllRushingDefense()
    ];
    return exportedPageSelectors;
    //console.log('after all');
}

module.exports = {
    init: function(teams) {
        getTeamRelatedData();
        const scanTeams = getTeamCodes(teams);
        getPassing(scanTeams);
        getRushRec(scanTeams);

        return exportedPageSelectors;
    },
    fixTeams: (missingTeams) => {
        exportedPageSelectors = [];
        const scanMissingTeams = getTeamCodes(missingTeams);
        console.log('scanMissingTeams: ', scanMissingTeams);
        getPassing(scanMissingTeams);
        getRushRec(scanMissingTeams);
        console.log('exportedPageSelectors', exportedPageSelectors);
        return exportedPageSelectors;
    },
    fixTeamsPass: (missingTeams) => {
        exportedPageSelectors = [];
        console.log('fixpass: ', missingTeams);
        const scanMissingTeams = getTeamCodes(missingTeams);
        getPassing(scanMissingTeams);
        return exportedPageSelectors;
    },
    fixTeamsRushRec: (missingTeams) => {
        exportedPageSelectors = [];
        const scanMissingTeams = getTeamCodes(missingTeams);
        getRushRec(scanMissingTeams);
        return exportedPageSelectors;
    },
    getTeamRelatedData: getTeamRelatedData,
    getAllTeamOffense: getAllTeamOffense,
    getAllPassing: getAllPassing,
    getAllRushingOffense: getAllRushingOffense,
    getAllDefense: getAllDefense,
    getAllPassingDefense: getAllPassingDefense,
    getAllRushingDefense: getAllRushingDefense
}