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
            cleanTabGroup = filterTabGroup(tabGroup),
            result;

        chrome.storage.sync.get('tabs', function (items) {
            if (Object.keys(items).length === 0) {
                result = { tabs: [ cleanTabGroup ] };
            } else {
                result = items.push(cleanTabGroup);
            }

            chrome.storage.sync.set(result, function () {
                console.log('new tab group saved');
            });
        });
    }

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        switch (request.action) {
        case 'riptabs':
            ripTabs(request.tabsArr);
            break;
        }
    });

}());
