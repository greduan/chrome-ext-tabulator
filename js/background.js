/*global chrome */

(function () {
    'use strict';

    function makeTabGroup(TabsArr) {
        var tabsInfo = [],
            tabGroup = { groupDate: new Date() };

        TabsArr.forEach(function (tab) {
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

    function ripTabs(TabsArr) {
        var tabGroup = makeTabGroup(TabsArr),
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

    function getTabGroups() {
        var result;

    }

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        switch (request.action) {
        case 'riptabs':
            ripTabs(request.tabsArr);
            break;
        case 'gettabgroups':
            chrome.storage.local.get(function (local) {
                sendResponse(local.tabGroups);
            });
            break;
        }
    });

}());
