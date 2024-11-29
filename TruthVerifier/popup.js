document.getElementById("check-info").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      },
      () => {
        console.log("Content script executed.");
        window.close();
      }
    );
  });
});
