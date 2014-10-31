/*global chrome, windows, localStorage, HTML */

(function (H) {
    'use strict';

    var groupsDiv = H.query("#groups", 1),
        curGroupDiv;

    // from the array of Tab objects it makes an object with date and the array
    function makeTabGroup(tabsArr) {
        var tabGroup = { date: new Date() };

        tabGroup.tabs = tabsArr;

        return tabGroup;
    }

    // filters tabGroup for stuff like pinned tabs, chrome:// tabs etc.
    function filterTabGroup(tabGroup) {
        return tabGroup;
    }

    // saves array (of Tab objects) to localStorage
    function saveTabGroup(tabGroup) {
        if (!(localStorage.tabGroups === undefined) && Array.isArray(JSON.parse(localStorage.tabGroups))) {
            var parsedTabGroups = JSON.parse(localStorage.tabGroups);
            parsedTabGroups.push(tabGroup);
            localStorage.setItem('tabGroups', JSON.stringify(parsedTabGroups));
        } else {
            localStorage.setItem('tabGroups', JSON.stringify([ tabGroup ]));
        }
    }

    function closeTabs(tabsArr) {
        var tabsToClose = [];

        tabsArr.forEach(function (tab) {
            tabsToClose.push(tab.id);
        });

        chrome.tabs.remove(tabsToClose);
    }

    // makes a tab group, filters it and saves it to localStorage
    function ripTabs(tabsArr) {
        var tabGroup = makeTabGroup(tabsArr),
            cleanTabGroup = filterTabGroup(tabGroup);

        saveTabGroup(cleanTabGroup);
    }

    // listen for when the browser action is clicked
    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.query({ currentWindow: true }, function (tabsArr) {
            ripTabs(tabsArr); // store current tab group as a new tab group
            // open the background page with the groups list
            chrome.tabs.create({
                url: chrome.extension.getURL('tabsshouldrest.html'),
                windowId: chrome.windows.WINDOW_ID_CURRENT
            });
            closeTabs(tabsArr);
        });
    });

    // make HTML with the groups
    JSON.parse(localStorage.tabGroups).forEach(function (group, i) {
        groupsDiv.add("div.group");

        curGroupDiv = groupsDiv.query(".group").only(i);
        curGroupDiv.add("h2").textContent = group.date;
        curGroupDiv.each(function (el) {
            el.add("ul>li*" + group.tabs.length);
            el.ul.li.each(function (el, i) {
                el.add('a[href="' + group.tabs[i].url + '"]');
                el.a.textContent = group.tabs[i].title;
            });
        });
    });

}(HTML));
