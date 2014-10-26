/*global chrome */

(function () {
    'use strict';

    var RIPTab = function () {
    };

    var RIPAllTabs = function () {
    };

    /*
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabsArr) {
        // add tab to save list
    });
    */

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request.action);
    });

}());
