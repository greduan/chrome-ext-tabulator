/*global chrome */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        // RIP the current tab
        document.getElementById('RIPTab').addEventListener('click', function () {
            chrome.runtime.sendMessage({ action: 'riptab' });
            window.close();
        });

        // RIP all tabs
        document.getElementById('RIPAllTab').addEventListener('click', function () {
            chrome.runtime.sendMessage({ action: 'ripalltabs' });
            window.close();
        });
    });

})();
