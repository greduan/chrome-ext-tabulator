/*global chrome */

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

    function ripTabs(tabsArr) {
        var tabGroup = makeTabGroup(tabsArr),
            cleanTabGroup = filterTabGroup(tabGroup);

        chrome.storage.local.get(function (local) {
            if (local.tabGroups !== 'undefined' && local.tabGroups instanceof Array) {
                local.tabGroups.push(cleanTabGroup);
            } else {
                local.tabGroups = [ cleanTabGroup ];
            }

            chrome.storage.local.set(local);
        });
    }

    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.query({ currentWindow: true }, function (tabsArr) {
            console.log(tabsArr);
        });
    });

}());
