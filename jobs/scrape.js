const puppeteer = require('puppeteer'),
    cheerio = require('cheerio'),
    fs = require('fs-extra'),
    pageselectors = require('./data/pageselectors'),
    TEAMS = require('../models/global').teams;

let browser, page;

let pageSelectors = pageselectors.init(['Jaguars']);

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
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')
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
        //const tableMenu = await page.$(hoverSelector);

        //console.log(tableMenu.html());

        await page.waitFor(hoverSelector);
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

    const filesPerTeamFolder = 2;
    const teamFiles = ['passing.csv', 'rushRec.csv'];
    const allFolderFiles = ['allTeamOffense', 'passingOffense', 'rushingOffense', 'allTeamDefense', 'passingDefense', 'rushingDefense'];
    //console.log(TEAMS);
    const expectedFolders = new Array('all').concat(TEAMS);
    const filesInAllFolder = 6;
    let newPageSelectors = [];
    
    console.log('parseCheck');
    fs.readdir('data_files/csv/', async (err, createdFolders) => {
        console.log('READING first dir??');
        let missingItems = expectedFolders.filter(folderName => !createdFolders.includes(folderName));
        // console.log(missingItems);

        if (missingItems.includes('all')) {
            console.log('missing all');
            // handle all not existing
            newPageSelectors = newPageSelectors.concat(pageselectors.getTeamRelatedData());
            if (missingItems.length > 1) {
                console.log('missing all and a few moer');
                missingItems.splice(missingItems.indexOf('all'), missingItems.indexOf('all') + 1);
                console.log(newPageSelectors.concat(pageselectors.fixTeams(missingItems)));
                newPageSelectors = newPageSelectors.concat(pageselectors.fixTeams(missingItems));
            }
        } else if (missingItems.length > 0) {
            // All folder exists, just teams missing
            const missingTeamSelectors = pageselectors.fixTeams(missingItems);
            console.log('missingTeamSelectors: ', missingTeamSelectors);
            newPageSelectors = newPageSelectors.concat(missingTeamSelectors);
            console.log('new page selectors after team fix teams', newPageSelectors);
        }
        let missingPassTeams = [];
        let missingRushRecTeams = [];
        for (let i = 0; i < createdFolders.length; i++) {
            let createdFiles = fs.readdirSync('data_files/csv/' + createdFolders[i]);
            if (createdFolders[i] === 'all') {
                if (createdFiles.length != filesInAllFolder) {
                    let missingAllFiles = allFolderFiles.filter(fileName => !createdFiles.includes(fileName));
                
                    if (!missingAllFiles.includes('allTeamOffense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getAllTeamOffense());
                    }
                    if (!missingAllFiles.includes('passingOffense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getAllPassing());
                    }
                    if (!missingAllFiles.includes('rushingOffense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getAllRushingOffense());
                    }
                    if (!missingAllFiles.includes('allTeamDefense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getAllTeamDefense());
                    }
                    if (!missingAllFiles.includes('passingDefense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getAllPassingDefense());
                    }
                    if (!missingAllFiles.includes('rushingDefense')) {
                        newPageSelectors = newPageSelectors.concat(pageselectors.getAllRushingDefense());
                    }
                }
            } else {
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

        newPageSelectors = newPageSelectors.concat(pageselectors.fixTeamsPass(missingPassTeams));
        newPageSelectors = newPageSelectors.concat(pageselectors.fixTeamsRushRec(missingRushRecTeams));
        
        console.log('NEW PAGE SELECTORS: ', newPageSelectors);
        pageSelectors = [];
        
        pageSelectors = pageSelectors.concat(newPageSelectors);
        
        console.log('PAGE SELECTORS: ', pageSelectors);Array('all').concat(TEAMS);
        initData();
    });
}

//parseCheck();
initData();
