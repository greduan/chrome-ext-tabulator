# News (Changelog for users)

All changes that would affect users will be listed in this file.

## 0.5.0-alpha - 2014-11-20

Just some changes to the code.  It now saves tab groups to `chrome.storage.sync`
instead of `localStorage`.  The changes to the code had to be made in order to
account for the async nature of `chrome.storage.sync`.

## 0.4.0-alpha - 2014-11-19

This version got a change name.  No more "Tabs Should Rest", now it's called
"Tabulator".  Look up the definitions and etymology for "tabulate" (verb) and
you may I understand why I chose that name.

The code also got some refactoring.  The links for tab groups now show a favicon
next to the title/URL.  I do still need to add some kind of caching mechanism
for that though...

The links in tab groups now open in a new tab (`target="_blank"`).

## 0.3.0-alpha - 2014-11-17

This version provides a nice looking interface to the saved tab groups.

Pretty near to the full release now.  Some kinks still have to be figured out
and refactoring is still to come.

## 0.2.0-alpha - 2014-11-17

Implemented an MVC interface using Mithril.js.  Spent all yesterday studying and
figuring out what MVCs are, how Mithril.js fits into the whole scene etc.
Really cool project.

Anyway the changes are basically, now you can remove tabs or groups of tabs by
clicking the X to the left of the group/tab.

## 0.1.0-alpha - 2014-11-01

It has the basics in.  You can put tabs to rest with the click of a button, that
opens a tab with the list of tab groups.  These tab groups cannot be modified
yet through a nice interface.  To edit them you have to go into the JS console
and run some commands to modify the localStorage.

not yet ready for daily usage but it's getting there.
