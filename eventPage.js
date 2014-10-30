/*global chrome, localStorage */

(function () {
    'use strict';

    function makeTabGroup(tabsArr) {
        var tabsInfo = [],
            tabGroup = { groupDate: new Date() };

        tabsArr.forEach(function (tab) {
            tabsInfo.push({
                tabTitle: tab.title,
                tabUrl: tab.url
            });
        });

        tabGroup.tabs = tabsInfo;

        return tabGroup;
    }

    function filterTabGroup(tabGroup) {
        return tabGroup;
    }

    function saveTabGroup(tabGroup) {
        if (typeof localStorage.tabGroups !== 'undefined' && Array.isArray(JSON.parse(localStorage.tabGroups))) {
            var parsedTabGroups = JSON.parse(localStorage.tabGroups);
            parsedTabGroups.push(tabGroup);
            localStorage.setItem('tabGroups', JSON.stringify(parsedTabGroups));
        } else {
            localStorage.setItem('tabGroups', JSON.stringify([ tabGroup ]));
        }
    }

    function ripTabs(tabsArr) {
        var tabGroup = makeTabGroup(tabsArr),
            cleanTabGroup = filterTabGroup(tabGroup);

        saveTabGroup(cleanTabGroup);
    }

    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.query({ currentWindow: true }, function (tabsArr) {
            ripTabs(tabsArr);
            chrome.tabs.create({ url: chrome.extension.getURL('tabsshouldrest.html') });
        });
    });

    chrome.runtime.onMessage.addListener(function (req, sen, sendRes) {
        switch (req.action) {
        case 'gettabgroups':
            sendRes({ tabGroups: JSON.parse(localStorage.getItem('tabGroups')) });
            break;
        default:
            sendRes({});
        }
    });

}());
