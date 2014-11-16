;(function () {
    'use strict';

    // current tab
    document.getElementById('rip-this').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabsArr) {
            chrome.runtime.sendMessage({ action: 'rip', tabsArr: tabsArr });
        });
        window.close();
    });

    // all tabs
    document.getElementById('rip-all').addEventListener('click', function () {
        chrome.tabs.query({ currentWindow: true }, function (tabsArr) {
            chrome.runtime.sendMessage({ action: 'rip', tabsArr: tabsArr });
        });
        window.close();
    });

    // open background page
    document.getElementById('open-background-page').addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'openbackgroundpage' });
        window.close();
    });

}());
