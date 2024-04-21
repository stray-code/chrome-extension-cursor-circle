chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    SETTINGS: {
      enabled: true,
    },
  });
});
