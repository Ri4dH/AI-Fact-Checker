(async function () {
  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) {
    createCustomAlert("Error", "Nothing is selected. Please select some text to verify.");
    return;
  }
  chrome.runtime.sendMessage({ text: selectedText });
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.popupMessage) {
    createCustomAlert("TruthVerifier Says", formatMessage(message.popupMessage));
  } else if (message.result) {
    const { analysis, explanation } = message.result;

    const resultMessage = explanation
      ? `Analysis: ${analysis}\n\nExplanation: ${explanation}`
      : `Analysis: ${analysis}`;
    createCustomAlert("TruthVerifier", formatMessage(resultMessage));
  } else {
    createCustomAlert("TruthVerifier", "No valid response received from AI.");
  }
});

function createCustomAlert(title, message) {
  const existingAlert = document.getElementById("truthVerifierAlert");
  if (existingAlert) existingAlert.remove();

  const alertContainer = document.createElement("div");
  alertContainer.id = "truthVerifierAlert";
  alertContainer.style.position = "fixed";
  alertContainer.style.top = "50%";
  alertContainer.style.left = "50%";
  alertContainer.style.transform = "translate(-50%, -50%)";
  alertContainer.style.zIndex = "10000";
  alertContainer.style.backgroundColor = "#fffbec";
  alertContainer.style.border = "2px solid #ffb347";
  alertContainer.style.borderRadius = "12px";
  alertContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  alertContainer.style.padding = "20px";
  alertContainer.style.maxWidth = "400px";
  alertContainer.style.width = "90%";
  alertContainer.style.fontFamily = "'Arial', sans-serif";
  alertContainer.style.textAlign = "center";
  alertContainer.style.color = "#333";
  alertContainer.style.cursor = "move";

  const alertTitle = document.createElement("h3");
  alertTitle.textContent = title;
  alertTitle.style.margin = "0 0 10px 0";
  alertTitle.style.fontSize = "22px";
  alertTitle.style.color = "#ff8c00";

  const alertMessageContainer = document.createElement("div");
  alertMessageContainer.style.maxHeight = "200px";
  alertMessageContainer.style.overflowY = "auto";
  alertMessageContainer.style.textAlign = "left";
  alertMessageContainer.style.marginBottom = "20px";

  const alertMessage = document.createElement("p");
  alertMessage.innerHTML = message;
  alertMessage.style.margin = "0";
  alertMessage.style.fontSize = "16px";
  alertMessage.style.color = "#444";
  alertMessage.style.lineHeight = "1.6";
  alertMessage.style.whiteSpace = "pre-wrap";

  alertMessageContainer.appendChild(alertMessage);

  const dismissButton = document.createElement("button");
  dismissButton.textContent = "OK";
  dismissButton.style.border = "none";
  dismissButton.style.borderRadius = "8px";
  dismissButton.style.backgroundColor = "#4caf50";
  dismissButton.style.color = "#fff";
  dismissButton.style.fontSize = "18px";
  dismissButton.style.padding = "10px 20px";
  dismissButton.style.cursor = "pointer";
  dismissButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  dismissButton.style.transition = "background-color 0.3s ease";

  dismissButton.onmouseover = () => (dismissButton.style.backgroundColor = "#388e3c");
  dismissButton.onmouseout = () => (dismissButton.style.backgroundColor = "#4caf50");
  dismissButton.onmousedown = () => (dismissButton.style.backgroundColor = "#2e7d32");
  dismissButton.onmouseup = () => (dismissButton.style.backgroundColor = "#388e3c");

  dismissButton.addEventListener("click", () => alertContainer.remove());

  alertContainer.appendChild(alertTitle);
  alertContainer.appendChild(alertMessageContainer);
  alertContainer.appendChild(dismissButton);

  document.body.appendChild(alertContainer);

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  alertContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - alertContainer.getBoundingClientRect().left;
    offsetY = e.clientY - alertContainer.getBoundingClientRect().top;
    alertContainer.style.cursor = "grabbing";

    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      alertContainer.style.left = `${e.clientX - offsetX}px`;
      alertContainer.style.top = `${e.clientY - offsetY}px`;
      alertContainer.style.transform = "none";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    alertContainer.style.cursor = "move";

    document.body.style.userSelect = "";
  });
}

function formatMessage(message) {
  return message.replace(
    /- \[([^\]]+)\]\((https?:\/\/[^\)]+)\): ([^\n]+)/g,
    '<a href="$2" target="_blank" style="color: #ff8c00; text-decoration: none;">$1</a>: $3'
  );
}
