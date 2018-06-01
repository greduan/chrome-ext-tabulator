;(function ($) {
	'use strict';

	var opts = {};

	document.addEventListener('DOMContentLoaded', function () {
		chrome.storage.local.get('options', function (storage) {
			var opts = storage.options || {};

			if (opts.deleteTabOnOpen === undefined) {
				$('input[name="deleteTabOnOpen"][value="no"]').prop('checked', 'checked');
			} else {
				$('input[name="deleteTabOnOpen"][value="' + opts.deleteTabOnOpen + '"]').prop('checked', 'checked');
			}

			if (opts.closePinnedTabs === undefined) {
				$('input[name="closePinnedTabs"][value="no"]').prop('checked', 'checked');
			} else {
				$('input[name="closePinnedTabs"][value="' + opts.closePinnedTabs + '"]').prop('checked', 'checked');
			}
		});
	});

	document.getElementById('import').addEventListener('click', () => {
		const newGroups = document.getElementById('import-text').value.split('\n\n').map((block, i) => ({
			tabs: block.split('\n').map(item => {
				const [url, ...rest] = item.split('|')
				return {url: url.trim(), title: rest.join('|').trim(), pinned: false}
			}),
			id: Date.now() - i,
			date: Date.now(),
		}));
		// console.log(newGroups)
		chrome.storage.local.get('tabGroups', storage => {
			const groups = storage.tabGroups || [];
			chrome.storage.local.set({tabGroups: newGroups.concat(groups)})
		})
	})

	document.getElementsByName('save')[0].addEventListener('click', function () {
		var deleteTabOnOpen = document.querySelector('input[name="deleteTabOnOpen"]:checked').value;
		var closePinnedTabs = document.querySelector('input[name="closePinnedTabs"]:checked').value;

		chrome.storage.local.set({
			options: {
				deleteTabOnOpen: deleteTabOnOpen,
				closePinnedTabs: closePinnedTabs
			}
		}, function () { // show "settings saved" notice thing
		document.getElementById('saved').style.display = 'block';
		window.setTimeout(function () {
			document.getElementById('saved').style.display = 'none';
		}, 2000);
	});
});

}(jQuery));
