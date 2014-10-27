/*global chrome */

(function (H) {
    'use strict';

    // H.query("#container #groups");

    function getTabGroups() {
        chrome.runtime.sendMessage({ action: 'gettabgroups' }, function (res) {
            return res;
        });
    }

    console.log(getTabGroups());

}(HTML));
