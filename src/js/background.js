/*global chrome */

(function () {
    'use strict';

    var ripTabs = function (tabsArr) {
        var tabsInfo = [];

        tabsArr.forEach(function (tab) {
        });
    };

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        switch (request.action) {
        case 'riptabs':
            ripTabs(request.tabsArr);
            break;
        }
    });

}());
