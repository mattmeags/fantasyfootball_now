const TEAMS = require('../../models/global').teams,
    baseURL = 'https://www.pro-football-reference.com',
    teamCodes = ['crd', 'atl', 'rav', 'buf', 'car', 'chi', 'cin', 'cle', 'dal', 'den', 'det', 'gnb', 'htx', 'clt', 'jax', 'kan', 'sdg', 'ram', 'mia', 'min', 'nwe', 'nor', 'nyg', 'nyj', 'rai', 'phi', 'pit', 'sfo', 'sea', 'tam', 'oti', 'was'],
    passingMenuSelector = '#all_passing',
    passingCsvSelector = '#csv_passing',
    rushRecMenuSelector = '#all_rushing_and_receiving',
    rushRecCsvSelector = '#csv_rushing_and_receiving',
    passFileName = '/passing',
    rushRecFileName = '/rushRec';

let exportedPageSelectors = [];

/**
 * @class
 * @desc - Team name and PFF code pairing
 */
class TeamCode {
    constructor(name) {
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
    constructor(url, menuSelectors, csvSelectors, fileNames, all, passing, rushRec, whole) {      
        const baseURL = 'https://www.pro-football-reference.com';      
        this.url = baseURL + url;
        switch(true) {
            case all:
                this.menuSelectors = menuSelectors;
                this.csvSelector = csvSelectors;
                this.fileName = fileNames;
                break;
            case passing:
                this.menuSelectors = [menuSelectors[0]];
                this.csvSelector = [csvSelectors[0]];
                this.fileName = [fileNames[0]];
                break;
            case rushRec:
                this.menuSelectors = [menuSelectors[1]];
                this.csvSelector = [csvSelectors[1]];
                this.fileName = [fileNames[1]];
                break;
            case whole:
                this.menuSelectors = [menuSelectors[2]];
                this.csvSelector = [csvSelectors[2]];
                this.fileName = [fileNames[2]];
                break;
        }
    }
}

/**
 * @class
 * @description - PageSelector object specific to team data
 */
class TeamPageSelector extends PageSelector {
    constructor(teamObj, passing = true, rushRec = true) {
        const all = passing && rushRec,
            menuSelectorArr = [passingMenuSelector, rushRecMenuSelector],
            csvSelectorArr = [passingCsvSelector, rushRecCsvSelector],
            fileNameArr = [teamObj.name + passFileName, teamObj.name + rushRecFileName],
            url = '/teams/' + teamObj.code + '/2018.htm'

        super(url, menuSelectorArr, csvSelectorArr, fileNameArr, all, passing, rushRec);
    }
}

/**
 * @class
 * @description - PageSelector object specific to total league offensive data
 */
class LeagueOffensePageSelector extends PageSelector {
    constructor(passing = true, rushing = true, whole = true) {
        const url = '/years/2018/',
            menuSelectorArr = [passingMenuSelector, '#all_rushing', '#all_team_stats', ],
            csvSelectorArr = [passingCsvSelector, '#csv_rushing', '#csv_team_stats'],
            fileNameArr = ['all/passingOffense', 'all/rushingOffense', 'all/allTeamOffense'],
            all = passing && rushing && whole;

        super(url, menuSelectorArr, csvSelectorArr, fileNameArr, all, passing, rushing, whole);
    }
}

/**
 * @class
 * @description - PageSelector object specific to total league defensive data
 */
class LeagueDefensePageSelector extends PageSelector {
    constructor(passing = true, rushing = true, whole = true) {
        const url = '/years/2018/opp.htm',
            menuSelectorArr = [passingMenuSelector, '#all_rushing', '#all_team_stats'],
            csvSelectorArr = [passingCsvSelector, '#csv_rushing', '#csv_team_stats'],
            fileNameArr = ['all/passingDefense', 'all/rushingDefense', 'all/allTeamDefense'],
            all = passing && rushing && whole;

        super(url, menuSelectorArr, csvSelectorArr, fileNameArr, all, passing, rushing, whole);
    }
}

/**
 * @private
 * @function getTeamCodes
 * @description - get an array of TeamCode objects {teamName, pffTeamCode}
 * @param {Array} - array of team names that will be used in scrape job
 * @returns {Array} - array of TeamCode Objects
 */
function getTeamCodes(teams) {
    const teamCodesArr = [];
    teams.forEach(element => {
        teamCodesArr.push(new TeamCode(element));
    });
    console.log(teamCodesArr);
    return teamCodesArr;
}

/**
 * @private
 * @param {Array} teams - array of TeamCodes Objects to be used in scrape
 * @returns {Array} exportedPageSelectors - array of PageSelector Objects for passing
 * @desc adds page selector objects for team passing stats
 */
function getTeamSelectors(teams) {
    for (var i = 0; i < teams.length; i++) {
        exportedPageSelectors.push(
            new TeamPageSelector(
                teams[i]
            )
        );
    }
    return exportedPageSelectors;
}

/**
 * @private
 * @description creates PageSelectors for offensive and defensive league data
 */
function getLeagueSelectors() {
    getLeagueOffenseSelectors();
    getLeagueDefenseSelctors();
}

/**
 * @public
 * @param {boolean} pass - include offensive passing in page selectors
 * @param {boolean} rush - include offensive rushing in page selectors
 * @param {boolean} whole - include 'whole' offensive in page selectors
 */
function getLeagueOffenseSelectors(pass = true, rush = true, whole = true) {
    exportedPageSelectors.push(
        new LeagueOffensePageSelector(pass, rush, whole)
    );
}

/**
 * @public
 * @param {boolean} pass - include defensive passing in page selectors
 * @param {boolean} rush - include defensive rushing in page selectors
 * @param {boolean} whole - include 'whole' defensive in page selectors
 */
function getLeagueDefenseSelctors(pass = true, rush = true, whole = true) {
    exportedPageSelectors.push(
        new LeagueDefensePageSelector(pass, rush, whole)
    );
}

module.exports = {
    init: function (teams = TEAMS) {
        exportedPageSelectors = [];
        const scanTeams = getTeamCodes(teams);
        getTeamSelectors(scanTeams);
        getLeagueSelectors(scanTeams);
        return exportedPageSelectors;
    },
    fixTeamsPass: (missingTeams) => {
        exportedPageSelectors = [];
        console.log('fixpass: ', missingTeams);
        const scanMissingTeams = getTeamCodes(missingTeams);
        getTeamSelectors(scanMissingTeams, true, false);
        return exportedPageSelectors;
    },
    fixTeamsRushRec: (missingTeams) => {
        exportedPageSelectors = [];
        const scanMissingTeams = getTeamCodes(missingTeams);
        //getRushRec(scanMissingTeams);
        getTeamSelectors(scanMissingTeams, false, true);
        return exportedPageSelectors;
    },
    getLeagueOffenseSelectors: getLeagueOffenseSelectors,
    getLeagueDefenseSelctors: getLeagueDefenseSelctors
}