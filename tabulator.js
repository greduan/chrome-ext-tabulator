;(function () {
	'use strict';

	// from the array of Tab objects it makes an object with date and the array
	function makeTabGroup(tabsArr) {
		var tabGroup = {
			date: new Date().getTime(),
			id: Date.now() // clever way to quickly get a unique ID
		};

		tabGroup.tabs = tabsArr;

		return tabGroup;
	}

	// filters tabGroup for stuff like pinned tabs, chrome:// tabs, etc.
	function filterTabGroup(tabGroup) {
		// TODO
		return tabGroup;
	}

	// saves array (of Tab objects) to localStorage
	function saveTabGroup(tabGroup) {
		chrome.storage.sync.get('tabGroups', function (storage) {
			var newArr;

			if (storage.tabGroups) {
				newArr = storage.tabGroups;
				newArr.unshift(tabGroup);

				chrome.storage.sync.set({ tabGroups: newArr });
			} else {
				chrome.storage.sync.set({ tabGroups: [ tabGroup ] });
			}
		});
	}

	// close all the tabs in the provided array of Tab objects
	function closeTabs(tabsArr) {
		var tabsToClose = [],
			i;

		for (i = 0; i < tabsArr.length; i += 1) {
			tabsToClose.push(tabsArr[i].id);
		}

		chrome.tabs.remove(tabsToClose, function () {
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

	function openBackgroundPage() {
		chrome.tabs.create({ url: chrome.extension.getURL('tabulator.html') });
	}

	// listen for messages from popup
	chrome.runtime.onMessage.addListener(function (req, sender, sendRes) {
		switch (req.action) {
			case 'save':
				saveTabs(req.tabsArr);
				openBackgroundPage(); // opening now so window doesn't close
				closeTabs(req.tabsArr);
				sendRes('ok'); // acknowledge
			break;
			case 'openbackgroundpage':
				openBackgroundPage();
				sendRes('ok'); // acknowledge
			break;
			default:
				sendRes('nope'); // acknowledge
			break;
		}
	});

}());
