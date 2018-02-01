;(function ($) {
    'use strict'

    var opts = {};

    document.addEventListener('DOMContentLoaded', function () {
        chrome.storage.sync.get('options', function (storage) {
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

    document.getElementsByName('save')[0].addEventListener('click', function () {
		var deleteTabOnOpen = document.querySelector('input[name="deleteTabOnOpen"]:checked').value;
		var closePinnedTabs = document.querySelector('input[name="closePinnedTabs"]:checked').value;

        chrome.storage.sync.set({
            options: {
				deleteTabOnOpen: deleteTabOnOpen,
				closePinnedTabs: closePinnedTabs
            }
        }, function () { // show "settings saved" notice thing
            document.getElementById('saved').style.display = 'block';
            window.setTimeout(function () {
                document.getElementById('saved').style.display = 'none';
            }, 1000);
        });
    });

}(jQuery));
