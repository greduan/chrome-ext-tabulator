const browser = require('webextension-polyfill');

document
  .getElementById('save-all-but-active')
  .addEventListener('click', function() {
    browser.runtime
      .sendMessage({ action: 'saveAllButActive' })
      .then(() => window.close());
  });

// all tabs
document.getElementById('save-all').addEventListener('click', function() {
  browser.runtime.sendMessage({ action: 'saveAll' }).then(() => window.close());
});

// open background page
document
  .getElementById('open-background-page')
  .addEventListener('click', function() {
    browser.runtime.sendMessage({ action: 'openbackgroundpage' }).then(res => {
      if (res === 'ok') {
        window.close();
      }
    });
  });

document.getElementById('save-active').addEventListener('click', function() {
  browser.tabs.query({ currentWindow: true }, function(tabsArr) {
    browser.runtime
      .sendMessage({ action: 'saveActive', tabsArr: tabsArr })
      .then(res => {
        if (res === 'ok') {
          window.close();
        }
      });
  });
});
