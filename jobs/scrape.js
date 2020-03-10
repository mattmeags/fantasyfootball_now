const puppeteer = require('puppeteer'),
    cheerio = require('cheerio'),
    fs = require('fs-extra'),
    pageselectors = require('./data/pageselectors'),
    TEAMS = require('../models/global').teams;

let browser, page, year = '2019';

let pageSelectors = pageselectors.init(year, TEAMS);

/**
 * @function initData
 * @description launches headless browser and calls scrape of each data set 
 */
async function initData() {
    if (pageSelectors.length === 0) {
        console.log('JOB COMPLETE');
        return;
    }
    browser = await puppeteer.launch({
        args: ["--proxy-server='direct://'", '--proxy-bypass-list=*'],
        headless: true
    });
    for (let i = 0; i < pageSelectors.length; i++) {
        page = await browser.newPage();
        await scrape(pageSelectors[i], browser);
        await page.close();
    }
    await browser.close();

    await parseCheck();
}

/**
 * @function scrape
 * @description scrapes the webpage on the headless browsers and gets the needed csv data
 * @param {Object} table - data object whos properties are used to scrape the page
 * @param {Object} browser - the puppeteer headless browser object
 */
async function scrape(table, browser) {
    try {

        //page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')
        console.log(table)
        console.log(table.url);
        await page.goto(table.url, { waitUntil: 'domcontentloaded' });

        await console.log('loaded url');

        //await page.waitFor('#all_team_stats .hasmore li:nth-of-type(4) button');

        let html = await page.content();
        const $ = cheerio.load(html);

        //await page.hover('#all_team_stats .hasmore');

        //all table properties should have same length execpt url which is a string and not an array
        for (let i = 0; i < table.menuSelectors.length; i++) {
            const hoverSelector = table.menuSelectors[i] + ' .hasmore';
            await console.log(hoverSelector);

            //const tableMenu = await page.$('#all_team_stats .hasmore');
            //const tableMenu = await page.$(hoverSelector);

            //console.log(tableMenu.html());

            await page.waitFor(hoverSelector);
            await page.hover(hoverSelector, {visible: true});
            
            //hacky but seems to work
            try {
                await page.waitFor('.drophover', { visible: true });
            } catch (e) {
                await page.hover(hoverSelector, { visible: true });
                await page.waitFor('.drophover', { visible: true });
            }
            

            const csvBtnSelector = hoverSelector + ' li:nth-of-type(4) button';
            //const csvBtn = await page.$('#all_team_stats .hasmore li:nth-of-type(4) button');

            await console.log(csvBtnSelector);
            const csvBtn = await page.$(csvBtnSelector);
            await console.log('after hover wait and button query');
            //await console.log(csvBtn);

            await page.waitFor(csvBtnSelector, {visible: true});
            await csvBtn.click();
            await console.log('after click');
            //TODO: commenting out cause I don't know if these do anything
            // const content = await page.$('.table_outer_container');

            // await page.$eval('.table_outer_container', (element) => {
            //     console.log(element.innerHTML);
            // });

            await page.waitFor(table.csvSelector[i]);
            await console.log('after waiting for csv table');
            await console.log(table.csvSelector[i]);

            let text = await page.evaluate(() => document.querySelector('[id^="csv_"]').innerHTML);
            //csv plain text loaded w/ HTML comment, this removes comment
            text = await text.slice(19, -1).trim();
            await console.log(text);

            await writeCSVFiles(text, table.fileName[i]);
            //await page.mouse.move(100, 100);
            await page.reload();
            
        }
        //await page.close();
        await console.log('end...');
        return;

    } catch (error) {
        console.log('==========================error==================');
        console.log(error);
    }

}

/**
 * @function writeCSVFiles
 * @description - takes raw data and writes it to a csv file
 * @param {string} data - raw data in comma seperated value format
 * @param {string} fileName - file name of the csv file to write too
 */
async function writeCSVFiles(data, fileName) {
    try {
        const fullPath = 'data_files/csv/' + fileName + '.csv';
        console.log(fullPath);
        fs.outputFile(fullPath, data);
    } catch (error) {
        console.log(error);
    }
}

//TODO:this isn't even used
const getCreatedFolders = () => {
    return new Promise((resolve, reject) => {
        fs.readdir('data_files/csv/', (err, createdFolders) => {
            if (err) {
                reject(err);
            } else {
                console.log('bout to resolve');
                resolve(createdFolders);
            }
        })
    });
}

/**
 * @function parseCheck
 * @description checks that the scrape was successful and all csv files were created, and if not creates a new pageselector object of everything missing and reruns the scrape
 */
async function parseCheck () {

    const filesPerTeamFolder = 2,
        teamFiles = ['passing.csv', 'rushRec.csv'],
        allFolderFiles = ['allTeamOffense', 'passingOffense', 'rushingOffense', 'allTeamDefense', 'passingDefense', 'rushingDefense'],
        expectedFolders = new Array('all').concat(TEAMS),
        numFilesInAllFolder = allFolderFiles.length;

    let newPageSelectors = [],
        missingPassTeams = [],
        missingRushRecTeams = [];
    
    console.log('parseCheck');
    //TODO: need to check for year folder now
    fs.readdir('data_files/csv/', async (err, createdFolders) => {
        console.log('READING first dir??');
        // FOLDER CHECKING
        let missingFolders = expectedFolders.filter(folderName => !createdFolders.includes(folderName));

        if (missingFolders.includes('all')) {
            // handle all folder not existing
            newPageSelectors = newPageSelectors.concat(pageselectors.getLeagueSelectors(year));
            if (missingFolders.length > 1) {
                // All folder is missing but other folders are missing as well
                const otherMissingFolders = missingFolders.splice(missingFolders.indexOf('all'), missingFolders.indexOf('all') + 1);
                newPageSelectors = newPageSelectors.concat(pageselectors.init(otherMissingFolders, year));
            }
        } else if (missingFolders.length > 0) {
            // All folder exists, just team folders missing
            const missingTeamSelectors = pageselectors.init(missingFolders, year);
            newPageSelectors = newPageSelectors.concat(missingTeamSelectors);
        }
        // FILE CHECKING
        for (let i = 0; i < createdFolders.length; i++) {
            let createdFiles = fs.readdirSync('data_files/csv/' + createdFolders[i] + '/' + year);
            if (createdFolders[i] === 'all') {
                if (createdFiles.length != numFilesInAllFolder) {
                    // Checking missing files in the all folder
                    let missingAllFiles = allFolderFiles.filter(fileName => !createdFiles.includes(fileName));
                
                    if (!missingAllFiles.includes('allTeamOffense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getLeagueOffenseSelectors(year, false, false));
                    }
                    if (!missingAllFiles.includes('passingOffense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getLeagueOffenseSelectors(yaer, true, false, false));
                    }
                    if (!missingAllFiles.includes('rushingOffense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getLeagueOffenseSelectors(year, false, true, false));
                    }
                    if (!missingAllFiles.includes('allTeamDefense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getLeagueDefenseSelctors(year, false, false));
                    }
                    if (!missingAllFiles.includes('passingDefense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getLeagueDefenseSelctors(year, true, false, false));
                    }
                    if (!missingAllFiles.includes('rushingDefense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getLeagueDefenseSelctors(year, false, true, false));
                    }
                }
            } else {
                // Check missing files in team folders
                //TODO: will have to adjust w/ year folders and week by week data
                if (createdFiles.length != filesPerTeamFolder) {
                    let missingTeamFiles = teamFiles.filter(fileName => !createdFiles.includes(fileName));
                    console.log('createdTeamFiles: ', createdFiles);
                    console.log('missingTeamFiles: ', missingTeamFiles);
                    if (missingTeamFiles.includes('passing.csv')) {
                        console.log('missingPassTeam: ', createdFolders[i]);
                        missingPassTeams.push(createdFolders[i]);
                    }
                    if (missingTeamFiles.includes('rushRec.csv')) {
                        console.log('missingRushRecTeam: ', createdFolders[i]);
                        missingRushRecTeams.push(createdFolders[i]);
                    }
                }
            }
        }

        // Combine Page selector objects for pass and rush into newPageSelectors which has all
        //TODO: we probably don't need all this, pageseletors.js has alot of init functions there is likely a way to clean up
        newPageSelectors = newPageSelectors.concat(pageselectors.fixTeamsPass(missingPassTeams, year));
        newPageSelectors = newPageSelectors.concat(pageselectors.fixTeamsRushRec(missingRushRecTeams, year));
        
        console.log('NEW PAGE SELECTORS: ', newPageSelectors);
        pageSelectors = [];
        pageSelectors = pageSelectors.concat(newPageSelectors);
        console.log('PAGE SELECTORS: ', pageSelectors);

        initData();
    });
}

//parseCheck();
initData();
