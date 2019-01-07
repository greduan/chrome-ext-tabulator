const browser = require('webextension-polyfill');
const storage = require('../lib/storage');

// saves array (of Tab objects) to localStorage
function saveTabGroup(tabGroup) {
  return storage.get('tabGroups').then(storage => {
    let newArr;

    if (storage.tabGroups) {
      newArr = storage.tabGroups;
      newArr.unshift(tabGroup);
    } else {
      newArr = [tabGroup];
    }

    return storage.set({ tabGroups: newArr });
  });
}

const filterTab = tab => {
  const includePinnedTabs = Options.includePinnedTabs === 'yes';

  // XXX: Should this filter out chrome:// tabs?

  return !tab.pinned || includePinnedTabs;
};

function closeTabs(tabsArr) {
  const tabIds = tabsArr.filter(filterTab).map(tab => tab.id);

  browser.tabs.remove(tabIds).then(() => {
    // XXX: Is this necessary or useful?
    if (browser.runtime.lastError) {
      console.error(browser.runtime.lastError);
    }
  });
}

// makes a tab group, filters it and saves it to localStorage
function saveTabs(tabsArr) {
  const tabGroup = {
    date: Date.now(),
    id: Date.now(),
    title: '',
    tabs: tabsArr
      .map(tab => ({
        url: tab.url,
        title: tab.title,
        pinned: tab.pinned,
      }))
      .filter(filterTab),
  };

  saveTabGroup(cleanTabGroup);
}

function saveAllTabs() {
  const myUrl = browser.extension.getURL('/src/tabulator/tabulator.html');
  browser.tabs.query({ currentWindow: true }).then(tabsArr => {
    const tabsToSave = tabsArr.filter(tab => tab.url !== myUrl);
    saveTabs(tabsToSave);
    openBackgroundPageIfNeeded(() => {
      closeTabs(tabsToSave);
    });
  });
}

function saveAllButActive() {
  const myUrl = browser.extension.getURL('/src/tabulator/tabulator.html');
  browser.tabs.query({ currentWindow: true, active: false }).then(tabsArr => {
    const tabsToSave = tabsArr.filter(tab => tab.url !== myUrl);
    saveTabs(tabsToSave);
    openBackgroundPageIfNeeded(() => {
      closeTabs(tabsToSave);
    });
  });
}

function saveActiveTab() {
  browser.tabs.query({ currentWindow: true, active: true }).then(tabs => {
    saveTabs(tabs);
    openBackgroundPageIfNeeded(() => {
      closeTabs(tabs);
    });
  });
}

const openBackgroundPageIfNeeded = done => {
  const myUrl = browser.extension.getURL('/src/tabulator/tabulator.html');
  browser.tabs.query({ url: myUrl }).then(tabsArr => {
    if (tabsArr.length === 0) {
      browser.tabs.create({ url: myUrl });
    } else {
      browser.tabs.highlight({ tabs: tabsArr[0].index });
      browser.tabs.reload(tabsArr[0].id);
    }
    done();
  });
};

function openBackgroundPage() {
  browser.tabs.create({
    url: browser.extension.getURL('/src/tabulator/tabulator.html'),
  });
}

function openOptionsPage() {
  browser.tabs.create({
    url: browser.extension.getURL('/src/options/options.html'),
  });
}

// listen for messages from popup
browser.runtime.onMessage.addListener(function(req, sender, sendRes) {
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

storage.get('options').then(storage => {
  Options = storage.options || {
    includePinnedTabs: 'yes',
    deleteTabOnOpen: 'no',
  };
});

browser.runtime.onInstalled.addListener(function() {
  browser.contextMenus.create({
    title: 'Tabulator',
    type: 'normal',
    id: 'main',
    contexts: ['page'],
  });
  browser.contextMenus.create({
    title: 'Open Tabulator',
    type: 'normal',
    id: 'backgroundPage',
    contexts: ['page'],
    parentId: 'main',
  });
  browser.contextMenus.create({
    type: 'separator',
    id: 'separator0',
    contexts: ['page'],
    parentId: 'main',
  });
  browser.contextMenus.create({
    title: 'Save all but active',
    type: 'normal',
    id: 'saveAllButActive',
    contexts: ['page'],
    parentId: 'main',
  });
  browser.contextMenus.create({
    title: 'Save open tabs',
    type: 'normal',
    id: 'saveOpenTabs',
    contexts: ['page'],
    parentId: 'main',
  });
  browser.contextMenus.create({
    title: 'Save active tab',
    type: 'normal',
    id: 'saveActiveTab',
    contexts: ['page'],
    parentId: 'main',
  });

  browser.contextMenus.onClicked.addListener(function(itemData, tab) {
    if (itemData.menuItemId === 'backgroundPage') {
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

//TODO: Add option to save tabs from context menu.
//TODO: Move delete tab group to title.
