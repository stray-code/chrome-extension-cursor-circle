import { setLocalStorage } from "./utils";

chrome.runtime.onInstalled.addListener(async () => {
  await setLocalStorage("settings", { enabled: true });
});
