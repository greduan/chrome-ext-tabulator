/*global localStorage, HTML */

document.addEventListener('DOMContentLoaded', (function (H) {
    'use strict';

    /*
    var groupsDiv = H.query("#groups", 1),
        curGroupDiv;

    if (!(localStorage.tabGroups === undefined) && Array.isArray(JSON.parse(localStorage.tabGroups))) {
        // make HTML with the groups
        JSON.parse(localStorage.tabGroups).forEach(function (group, i) {
            groupsDiv.add('div.group'); // one div per group

            curGroupDiv = groupsDiv.query('.group').only(i); // current group
            curGroupDiv.add('h2').textContent = 'Created: ' + group.date.toString(); // add h2
            curGroupDiv.each(function (el) { // current div
                el.add('ul>li*' + group.tabs.length); // add ul and lis
                el.ul.li.each(function (el, i) { // for each li
                    el.add('div.delete-link[data-tab-id=' + group.tabs[i].id + ']');
                    el.add('a[href="' + group.tabs[i].url + '"]'); // add an anchor
                    el.a.textContent = group.tabs[i].title; // add text to anchor
                });
            });
        });
    }

    H.query('.delete-link').each(function (el) {
        el.addEventListener('click', function () {
            console.log(el.getAttribute('data-tab-id'));
        });
    });
    */

    var groups = {};

    groups.Group = function () {
    };

    todo.GroupList = Array;

}(HTML)));
