const puppeteer = require('puppeteer'),
    cheerio = require('cheerio'),
    fs = require('fs-extra'),
    pageselectors = require('./data/pageselectors');
const TEAMS = require('../models/global').teams;

let browser, page;

let pageSelectors = pageselectors.init(TEAMS);

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
        headless: true
    });
    for (let i = 0; i < pageSelectors.length; i++) {
        await scrape(pageSelectors[i], browser);
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

        page = await browser.newPage();
        console.log(table)
        console.log(table.url);
        await page.goto(table.url, { waitUntil: 'domcontentloaded' });

        await console.log('loaded url');

        //await page.waitFor('#all_team_stats .hasmore li:nth-of-type(4) button');

        let html = await page.content();
        const $ = cheerio.load(html);

        //await page.hover('#all_team_stats .hasmore');

        const hoverSelector = table.menuSelector + ' .hasmore';
        await console.log(hoverSelector);
        //const tableMenu = await page.$('#all_team_stats .hasmore');
        const tableMenu = await page.$(hoverSelector);

        //console.log(tableMenu.html());

        await page.hover(hoverSelector);

        await page.waitFor('.drophover');

        const csvBtnSelector = hoverSelector + ' li:nth-of-type(4) button';
        //const csvBtn = await page.$('#all_team_stats .hasmore li:nth-of-type(4) button');
        await console.log(csvBtnSelector);
        const csvBtn = await page.$(csvBtnSelector);
        await console.log('after hover wait and button query');

        await csvBtn.click();
        await console.log('after click');
        const content = await page.$('.table_outer_container');

        await page.$eval('.table_outer_container', (element) => {
            console.log(element.innerHTML);
        });


        await page.waitFor(table.csvSelector);
        await console.log('after waiting for csv table');
        await console.log(table.csvSelector);

        let text = await page.evaluate(() => document.querySelector('[id^="csv_"]').innerHTML);
        text = await text.slice(19, -1).trim();
        await console.log(text);

        await writeCSVFiles(text, table.fileName);
        await page.close();
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

/**
 * @function parseCheck
 * @description checks that the scrape was successful and all csv files were created, and if not creates a new pageselector object of everything missing and reruns the scrape
 */
function parseCheck () {
    const filesPerTeamFolder = 2;
    const teamFiles = ['passing', 'rushrec'];
    const allFolderFiles = ['allTeamOffense', 'passingOffense', 'rushingOffense', 'allTeamDefense', 'passingDefense', 'rushingDefense'];
    //console.log(TEAMS);
    const expectedFolders = new Array('all').concat(TEAMS);
    const filesInAllFolder = 6;

    fs.readdir('data_files/csv/', (err, createdFolders) => {
        // console.log(expectedFolders);
        // console.log(createdFolders);
        let newPageSelectors = [];
        let missingItems = expectedFolders.filter(folderName => !createdFolders.includes(folderName));
        // console.log(missingItems);

        console.log(missingItems);
        if (missingItems.includes('all')) {
            console.log('missing all');
            // handle all not existing
            newPageSelectors.concat(pageselectors.getTeamRelatedData());
            if (missingItems.length > 1) {
                console.log('missing all and a few moer');
                missingItems.splice(missingItems.indexOf('all'), missingItems.indexOf('all') + 1);
                // console.log(pageselectors.fixTeams(missingItems));
                newPageSelectors.push(pageselectors.fixTeams(missingItems));
            }
        } else {
            // All folder exists, just teams missing
            newPageSelectors.concat(pageselectors.fixTeams(missingItems));
        }

        for (let i = 0; i < createdFolders.length; i++) {
            fs.readdir('data_files/csv/' + createdFolders[i], (err, createdFiles) => {
                if (createdFolders[i] === 'all') {
                    if (createdFiles.length != filesInAllFolder) {
                        let missingAllFiles = allFolderFiles.filter(fileName => !createdFiles.includes(fileName));
                    
                        if (!missingAllFiles.includes('allTeamOffense')) {
                            newPageSelectors.concat(pageselectors.getAllTeamOffense());
                        }
                        if (!missingAllFiles.includes('passingOffense')) {
                            newPageSelectors.concat(pageselectors.getAllPassing());
                        }
                        if (!missingAllFiles.includes('rushingOffense')) {
                            newPageSelectors.concat(pageselectors.getAllRushingOffense());
                        }
                        if (!missingAllFiles.includes('allTeamDefense')) {
                            newPageSelectors.concat(pageselectors.getAllTeamDefense());
                        }
                        if (!missingAllFiles.includes('passingDefense')) {
                            newPageSelectors.concat(pageselectors.getAllPassingDefense());
                        }
                        if (!missingAllFiles.includes('rushingDefense')) {
                            newPageSelectors.concat(pageselectors.getAllRushingDefense());
                        }
                    }
                } else {
                    if (createdFiles.length != filesPerTeamFolder) {
                        console.log('missing team files');
                        let missingTeamFiles = teamFiles.filter(fileName => !createdFiles.includes(fileName));
                        if (!missingTeamFiles.includes('passing')) {
                            newPageSelector.concat(pageselectors.getPassing(createdFolders[i]));
                        }
                        if (!missingTeamFiles.includes('rushRec')) {
                            newPageSelectors.concat(pageselectors.getPassing(createdFolders[i]));
                        }
                    }
                }
            });
        }
        pageSelectors = newPageSelectors;
        initData();
    });
}
//parseCheck();
initData();
