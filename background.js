if (typeof browser === "undefined") {
  	var browser = chrome;
}
  
browser.runtime.onInstalled.addListener(() => {
  	browser.storage.sync.set({ position: "bottom-right" });
});