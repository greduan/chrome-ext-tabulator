document
  .getElementById('save-all-but-active')
  .addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'saveAllButActive' }, function(res) {
      window.close();
    });
  });

// all tabs
document.getElementById('save-all').addEventListener('click', function() {
  chrome.runtime.sendMessage({ action: 'saveAll' }, function(res) {
    window.close();
  });
});

// open background page
document
  .getElementById('open-background-page')
  .addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'openbackgroundpage' }, function(res) {
      if (res === 'ok') {
        window.close();
      }
    });
  });

document.getElementById('save-active').addEventListener('click', function() {
  chrome.tabs.query({ currentWindow: true }, function(tabsArr) {
    chrome.runtime.sendMessage(
      { action: 'saveActive', tabsArr: tabsArr },
      function(res) {
        if (res === 'ok') {
          window.close();
        }
      }
    );
  });
});
