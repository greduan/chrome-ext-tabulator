/*global chrome, windows, localStorage, HTML */

(function (H) {
    'use strict';

    // from the array of Tab objects it makes an object with date and the array
    function makeTabGroup(tabsArr) {
        var tabGroup = { date: new Date() };

        tabGroup.tabs = tabsArr;

        return tabGroup;
    }

    // filters tabGroup for stuff like pinned tabs, chrome:// tabs etc.
    function filterTabGroup(tabGroup) {
        return tabGroup;
    }

    // saves array (of Tab objects) to localStorage
    function saveTabGroup(tabGroup) {
        if (!(localStorage.tabGroups === undefined) && Array.isArray(JSON.parse(localStorage.tabGroups))) {
            var parsedTabGroups = JSON.parse(localStorage.tabGroups);
            parsedTabGroups.push(tabGroup);
            localStorage.setItem('tabGroups', JSON.stringify(parsedTabGroups));
        } else {
            localStorage.setItem('tabGroups', JSON.stringify([ tabGroup ]));
        }
    }

    // close all the tabs found in the array of Tab objects
    function closeTabs(tabsArr) {
        var tabsToClose = [];

        tabsArr.forEach(function (tab) {
            tabsToClose.push(tab.id);
        });

        chrome.tabs.remove(tabsToClose);
    }

    // makes a tab group, filters it and saves it to localStorage
    function ripTabs(tabsArr) {
        var tabGroup = makeTabGroup(tabsArr),
            cleanTabGroup = filterTabGroup(tabGroup);

        saveTabGroup(cleanTabGroup);
    }

    // open the background page with the groups list in the current window
    // opening it now so window doesn't close because of lack of tabs
    function openBackgroundPage() {
        chrome.tabs.create({
            url: chrome.extension.getURL('tabsshouldrest.html'),
            windowId: chrome.windows.WINDOW_ID_CURRENT
        });
    }

    // listen for messages from popup
    chrome.runtime.onMessage.addListener(function (req, sender, sendRes) {
        switch (req.action) {
        case 'rip':
            ripTabs(req.tabsArr);
            openBackgroundPage();
            closeTabs(req.tabsArr);
            sendRes('ok'); // acknowledge
            break;
        case 'openbackgroundpage':
            openBackgroundPage();
            sendRes('ok'); // acknowledge
            break;
        default:
            sendRes('nothing'); // acknowledge
        }
    });

}(HTML));
