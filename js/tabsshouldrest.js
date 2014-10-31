/*global chrome, windows, localStorage, HTML */

(function (H) {
    'use strict';

    var groupsDiv = H.query("#groups", 1),
        curGroupDiv;

    // from the array of Tab objects it makes an object with date and the array
    function makeTabGroup(tabsArr) {
        var tabGroup = { date: new Date('YYYY-MM-DD at hh:mm:dd') };

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

    // listen for when the browser action is clicked
    // chrome.browserAction.onClicked.addListener(function (tab) {
    //     chrome.tabs.query({ currentWindow: true }, function (tabsArr) {
    //         ripTabs(tabsArr);
    //         openBackgroundPage();
    //         closeTabs(tabsArr);
    //     });
    // });

    // make HTML with the groups
    JSON.parse(localStorage.tabGroups).forEach(function (group, i) {
        groupsDiv.add('div.group'); // one div per group

        curGroupDiv = groupsDiv.query('.group').only(i); // current group
        curGroupDiv.add('h2').textContent = 'Created: ' + group.date; // add h2
        curGroupDiv.each(function (el) { // current div
            el.add('ul>li*' + group.tabs.length); // add ul and lis
            el.ul.li.each(function (el, i) { // for each li
                el.add('a[href="' + group.tabs[i].url + '"]'); // add an anchor
                el.a.textContent = group.tabs[i].title; // add text to anchor
            });
        });
    });

}(HTML));
