'use strict';

module.exports = {
     // [team]/rushRec
    playerHeader: [
        'number',
        'playerName',
        'age',
        'position',
        'gamesPlayed',
        'gamesStarted',
        'rushingAttempts',
        'rushYards',
        'rushTD',
        'longestRushAttempt',
        'yardsPerAttempt',
        'yardsPerGame',
        'rushAttemptsPerGame',
        'recTargets',
        'receptions',
        'recYards',
        'yardsPerRec',
        'recTD',
        'longestRec',
        'recPerGame',
        'recYardsPerGame',
        'completionPercentage',
        'receivingYardsPerTarget',
        'totalTouches',
        'yardsPerTouch',
        'yardsFromScrimage',
        'totalTD',
        'fumbles'
    ],
    // [team]/passing
    playerPassing: [
        'number',
        'playerName',
        'age',
        'position',
        'gamesPlayed',
        'gamesStarted',
        'qbRecord',
        'completions',
        'attempts',
        'completionPercentage',
        'yards',
        'tds',
        'tdPercentage',
        'interceptions',
        'interceptionPercentage',
        'longest',
        'yardsPerAttempt',
        'adjustedYardsPerAttempt',
        'yardsPerCompletion',
        'yardsPerGame',
        'rate',
        'qbr',
        'timesSacked',
        'yardsLostToSack',
        'netYardsPerAttempt',
        'adjustedYardsPerAttempt',
        'sackPercentage',
        'fourthQuarterComebacks',
        'gameWinningDrives'
    ],
    // all/passingOffense
    allTeamPassingOffense:  [
        'rank',
        'name',
        'games',
        'completions',
        'attempts',
        'completionPercentage',
        'yards',
        'tds',
        'tdPercentagePassAttempt',
        'int',
        'intPercentage',
        'longestPass',
        'yardsPerAttempt',
        'adjustedYardsPerAttempt',
        'yardsPerCompletion',
        'yardsPerGame',
        'qbr',
        'sacks',
        'yardsLostToSacks',
        'netYardsPerAttempt',
        'adjustedNetYardsPerAttempt',
        'sackPercentage',
        'comebacksLedByQB',
        'gameWinningDrives',
        'expectedPoints'
    ],
    // all/rushingOffense
    allTeamRushingOffense: [
        'rank',
        'name',
        'games',
        'attempts',
        'yards',
        'tds',
        'longestRushAttempt',
        'yardsPerGame',
        'fumbles',
        'expectedPoints'
    ],
    // all/allTeamOffense
    allTeamOffenseHeader: [
        'rank',
        'name',
        'games',
        'pointsScored',
        'totalYards',
        'totalPlays',
        'yardsPerPlay',
        'turnOvers',
        'fumblesLost',
        'firstDowns',
        'passCompleted',
        'passAttempts',
        'passYards',
        'passTDs',
        'interceptions',
        'netYardsPerAttempt',
        'passFirstDowns',
        'rushAttempts',
        'rushYrds',
        'rushTDs',
        'rushYardsPerAttempt',
        'rushFirstDowns',
        'penalties',
        'penaltyYards',
        'firstDownsByPenalty',
        'driveScorePercentage',
        'driveTurnOverPercentage',
        'expectedPoints'
    ],
    // all/allTeamDefense
    allTeamDefenseHeader: [
        'rank',
        'name',
        'games',
        'pointsScoredAgainst',
        'yardsAgainst',
        'playsAgainst',
        'yardsPerPlayAgainst',
        'takeAways',
        'fumblesLostByTeam',
        'firstDownsAllowed',
        'passesCompletedAgainst',
        'passesAttemptedAgainst',
        'passingYardsAgainst',
        'passingTDsAgainst',
        'interceptions',
        'netYardsAgainstPerPassAttempt',
        'passingFirstDownsAgainst',
        'rushingAttemptsAgainst',
        'rushingYardsAgainst',
        'rushingTDsAgainst',
        'rushingYardsPerAttemptAgainst',
        'rushingFirstDownsAgainst',
        'defensePenalties',
        'defensivePenatlyYardsAgainst',
        'defensivePenatlyFirstDownsAgainst',
        'percentageDrivesEndingInScoreAgainst',
        'percentageDrivesEndingInTurnOver',
        'expectedPointsContributed'
    ],
    // all/rushingDefense
    allTeamRushingDefense: [
        'rank',
        'name',
        'games',
        'attemptsAgainst',
        'yardsAgainst',
        'tdsAgainst',
        'yardsPerAttemptAgainst',
        'yardsPerGame',
        'expectedPointsContributedByRushingDefense'
    ],
    // all/passingDefense
    allTeamPassingDefense: [
        'rank',
        'name',
        'games',
        'completionPercentageAgainst',
        'yardsAgainst',
        'tdsAgainst',
        'tdPercentageRateAgainst',
        'interceptions',
        'passesDefended',
        'interceptionPercentage',
        'yardsPerAttempt',
        'adjustedYardsPerAttempt',
        'yardsPerCompletion',
        'yardsPerGame',
        'rate',
        'sacks',
        'yardsLostToSack',
        'qbHits',
        'tacklesForLoss',
        'netYardsPerAttempt',
        'adjustedNetYardsPerAttempt',
        'sackPercentage',
        'expectedPointsContributedByPassingDefense'
    ]
}