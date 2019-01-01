(function() {
  'use strict';

  function getWord(info, tab) {
    console.log('Word ' + info.selectionText + ' was clicked.');
    chrome.tabs.create({
      url: 'http://www.google.com/search?q=' + info.selectionText,
    });
  }

  function getTabs(info, tab) {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        console.log(tab.url);
      });
    });
  }

  // from the array of Tab objects it makes an object with date and the array
  function makeTabGroup(tabsArr) {
    return {
      date: Date.now(),
      id: Date.now(), // clever way to quickly get a unique ID
      title: '',
      tabs: tabsArr.map(tab => ({
        url: tab.url,
        title: tab.title,
        pinned: tab.pinned,
      })),
    };
  }

  // filters tabGroup for stuff like pinned tabs, chrome:// tabs, etc.
  function filterTabGroup(tabGroup) {
    tabGroup.tabs = filterTabs(tabGroup.tabs);
    return tabGroup;
  }

  function filterTabs(tabsArr) {
    console.log(Options);
    var filteredTabs = [];

    tabsArr.forEach(tab => {
      if (tab.pinned) {
        if (Options.includePinnedTabs == 'yes') {
          filteredTabs.push(tab);
        }
      } else {
        filteredTabs.push(tab);
      }
    });

    return filteredTabs;
  }

  // saves array (of Tab objects) to localStorage
  function saveTabGroup(tabGroup) {
    chrome.storage.local.get('tabGroups', function(storage) {
      var newArr;

      if (storage.tabGroups) {
        newArr = storage.tabGroups;
        newArr.unshift(tabGroup);

        chrome.storage.local.set({ tabGroups: newArr });
      } else {
        chrome.storage.local.set({ tabGroups: [tabGroup] });
      }
    });
  }

  // close all the tabs in the provided array of Tab objects
  function closeTabs(tabsArr) {
    var tabsToClose = [],
      i;
    var filtered = filterTabs(tabsArr);

    for (i = 0; i < filtered.length; i += 1) {
      tabsToClose.push(filtered[i].id);
      console.log({ url: filtered[i].url, pinned: filtered[i].pinned });
    }

    chrome.tabs.remove(tabsToClose, function() {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  }

  // makes a tab group, filters it and saves it to localStorage
  function saveTabs(tabsArr) {
    var tabGroup = makeTabGroup(tabsArr),
      cleanTabGroup = filterTabGroup(tabGroup);

    saveTabGroup(cleanTabGroup);
  }

  function saveAllTabs() {
    const myUrl = chrome.extension.getURL('tabulator.html');
    chrome.tabs.query({ currentWindow: true }, function(tabsArr) {
      const tabsToSave = tabsArr.filter(tab => tab.url !== myUrl);
      saveTabs(tabsToSave);
      openBackgroundPageIfNeeded(() => {
        closeTabs(tabsToSave);
      });
    });
  }

  function saveAllButActive() {
    const myUrl = chrome.extension.getURL('tabulator.html');
    chrome.tabs.query({ currentWindow: true, active: false }, function(
      tabsArr
    ) {
      const tabsToSave = tabsArr.filter(tab => tab.url !== myUrl);
      saveTabs(tabsToSave);
      openBackgroundPageIfNeeded(() => {
        closeTabs(tabsToSave);
      });
    });
  }

  function saveActiveTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      saveTabs(tabs);
      openBackgroundPageIfNeeded(() => {
        closeTabs(tabs);
      });
    });
  }

  const openBackgroundPageIfNeeded = done => {
    const myUrl = chrome.extension.getURL('tabulator.html');
    chrome.tabs.query({ url: myUrl }, function(tabsArr) {
      if (tabsArr.length == 0) {
        chrome.tabs.create({ url: myUrl });
      }
      if (tabsArr.length) {
        chrome.tabs.highlight({ tabs: tabsArr[0].index });
        chrome.tabs.reload(tabsArr[0].id);
      }
      done();
    });
  };

  function openBackgroundPage() {
    chrome.tabs.create({ url: chrome.extension.getURL('tabulator.html') });
  }

  function openOptionsPage() {
    chrome.tabs.create({ url: chrome.extension.getURL('options.html') });
  }

  // listen for messages from popup
  chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
    switch (req.action) {
      case 'saveAllButActive':
        saveAllButActive();
        sendRes('ok');
        break;
      case 'saveAll':
        saveAllTabs();
        sendRes('ok');
        break;
      case 'saveActive':
        saveActiveTab();
        break;
      case 'openbackgroundpage':
        openBackgroundPageIfNeeded(() => {
          sendRes('ok'); // acknowledge
        });
        break;
      default:
        sendRes('nope'); // acknowledge
        break;
    }
  });

  var Options = {};
  chrome.storage.local.get('options', function(storage) {
    Options = storage.options || {
      includePinnedTabs: 'yes',
      deleteTabOnOpen: 'no',
    };
  });

  //#region Context Menus
  chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      title: 'Tabulator',
      type: 'normal',
      id: 'main',
      contexts: ['page'],
    });
    chrome.contextMenus.create({
      title: 'Open Tabulator',
      type: 'normal',
      id: 'backgroundPage',
      contexts: ['page'],
      parentId: 'main',
    });
    chrome.contextMenus.create({
      type: 'separator',
      id: 'separator0',
      contexts: ['page'],
      parentId: 'main',
    });
    chrome.contextMenus.create({
      title: 'Save all but active',
      type: 'normal',
      id: 'saveAllButActive',
      contexts: ['page'],
      parentId: 'main',
    });
    chrome.contextMenus.create({
      title: 'Save open tabs',
      type: 'normal',
      id: 'saveOpenTabs',
      contexts: ['page'],
      parentId: 'main',
    });
    chrome.contextMenus.create({
      title: 'Save active tab',
      type: 'normal',
      id: 'saveActiveTab',
      contexts: ['page'],
      parentId: 'main',
    });

    chrome.contextMenus.onClicked.addListener(function(itemData, tab) {
      if (itemData.menuItemId === 'test') {
        getTabs(itemData, tab);
      } else if (itemData.menuItemId === 'backgroundPage') {
        openBackgroundPage();
      } else if (itemData.menuItemId === 'saveAllButActive') {
        saveAllButActive();
      } else if (itemData.menuItemId === 'saveOpenTabs') {
        saveAllTabs();
      } else if (itemData.menuItemId === 'saveActiveTab') {
        saveActiveTab();
      } else if (itemData.menuItemId === 'optionsPage') {
        openOptionsPage();
      }
    });
  });
  //#endregion
})();
//TODO: Add option to save tabs from context menu.
//TODO: Move delete tab group to title.
