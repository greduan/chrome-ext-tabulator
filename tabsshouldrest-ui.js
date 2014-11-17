;(function (m) {
    'use strict';

    var tabs = {}, // to-be module
        parsedTabGroups = JSON.parse(localStorage.tabGroups); // tab groups

    // model entity
    // 'data' is meant to be a tab group object from localStorage
    tabs.TabGroup = function (data) {
        this.date = m.prop(data.date);
        this.id   = m.prop(data.id);
        this.tabs = m.prop(data.tabs);
    };

    // alias for Array
    tabs.TabGroupsList = Array;

    // view-model
    tabs.vm = new function() {
        var vm = {};
        vm.init = function () {
            // list of tab groups
            vm.list = new tabs.TabGroupsList();

            vm.rmTab = function (i, ii) {
                // remove from array
                // vm.list[i].tabs.splice(ii, 1);
                console.log(i, ii)
            };
        };
        return vm;
    };

    tabs.controller = function () {
        tabs.vm.init();
        for (var i = 0; i < parsedTabGroups.length; i += 1) {
            tabs.vm.list.push(new tabs.TabGroup(parsedTabGroups[i]));
        }
    };

    tabs.view = function () {
        return m('div.group', [
            // foreach tab group
            tabs.vm.list.map(function (group, i) {
                return [
                    m('h2', group.date()),
                    // foreach tab
                    m('ul', group.tabs().map(function (tab, ii) {
                        return m('li', [
                            m('div.delete-link', { onclick: 'tabs.vm.rmTab(i, ii)' }),
                            m('a', { href: tab.url }, tab.title)
                        ]);
                    }))
                ];
            })
        ]);
    };

    // init the app
    m.module(document.getElementById('groups'), { controller: tabs.controller, view: tabs.view });

}(m));
