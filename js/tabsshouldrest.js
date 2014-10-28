/*global chrome, HTML */

(function (H) {
    'use strict';

    // H.query("#container #groups");

    function getTabGroups() {
        chrome.runtime.sendMessage({ action: 'gettabgroups' }, function (res) {
            console.log('got response');
            console.log(res.tabGroups);
        });
    }

    console.log('getting tab groups');
    getTabGroups();

}(HTML));
