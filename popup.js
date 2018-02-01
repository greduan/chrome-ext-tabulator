;(function () {
	'use strict';

	// all tabs
	document.getElementById('save-all').addEventListener('click', function () {

		chrome.storage.sync.get('options', function (storage) {

			var query = {
				currentWindow: true,
				pinned: storage.options.closePinnedTabs === 'yes' ? true : false
			};

			chrome.tabs.query( query, function (tabsArr) {
				chrome.runtime.sendMessage({ action: 'save', tabsArr: tabsArr }, function (res) {
					if (res === 'ok') {
						window.close();
					}
				});
			});
		});

	});

	// open background page
	document.getElementById('open-background-page').addEventListener('click', function () {
		chrome.runtime.sendMessage({ action: 'openbackgroundpage' }, function (res) {
			if (res === 'ok') {
				window.close();
			}
		});
	});

}());
