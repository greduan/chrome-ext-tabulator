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

    function saveTabGroups(tabGroup) {
        chrome.storage.local.get(function (local) {
            if (local.tabGroups !== 'undefined' && local.tabGroups instanceof Array) {
                local.tabGroups.push(tabGroup);
            } else {
                local.tabGroups = [ tabGroup ];
            }

            chrome.storage.local.set(local);
        });
    }

    function ripTabs(tabsArr) {
        var tabGroup = makeTabGroup(tabsArr),
            cleanTabGroup = filterTabGroup(tabGroup);

        saveTabGroups(cleanTabGroup);
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
            chrome.storage.local.get('tabGroups', function (local) {
                console.log(local.tabGroups);
                sendRes({ tabGroups: local.tabGroups });
            });
            break;
        default:
            sendRes({});
        }
    });

}());
