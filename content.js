(async function () {
  const selectedText = window.getSelection().toString() || document.body.innerText;
  chrome.runtime.sendMessage({ text: selectedText });
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.result) {
    const { analysis, explanation } = message.result;

    if (analysis === "Error") {
      alert(`Error: ${explanation}`);
    } else {
      const resultMessage = explanation
        ? `Analysis: ${analysis}\nExplanation: ${explanation}`
        : `Analysis: ${analysis}`;
      alert(resultMessage);
    }
  } else {
    alert("No valid response received from AI.");
  }
});
