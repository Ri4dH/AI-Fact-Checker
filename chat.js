// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("chat-sidebar");
    const chatBox = document.getElementById("chat-box");
    const toggleButton = document.getElementById("toggle-button");

    sidebar.classList.toggle("collapsed");
    chatBox.classList.toggle("collapsed");

    // Change button icon based on sidebar state
    if (sidebar.classList.contains("collapsed")) {
        toggleButton.innerHTML = "&#10095;"; // Show right arrow when collapsed
        toggleButton.style.left = "10px"; // Position button outside of collapsed sidebar
    } else {
        toggleButton.innerHTML = "&#10094;"; // Show left arrow when expanded
        toggleButton.style.left = "calc(25% - 35px)"; // Position button near expanded sidebar
    }
}

// Function to handle sending a message
function sendMessage() {
    const messageInput = document.getElementById("user-message");
    const messageText = messageInput.value.trim(); // Get the message and remove extra spaces

    if (messageText) {
        addMessage(messageText, "sent"); // Display the user’s message
        messageInput.value = ""; // Clear the input box

        // Simulate a response after a delay
        setTimeout(() => {
            const automatedResponse = generateResponse(messageText);
            addMessage(automatedResponse, "received");
        }, 1000); // Adjust delay as needed
    }
}

// Add event listener for Enter key to trigger sendMessage
document.getElementById("user-message").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent newline in the input field
        sendMessage();
    }
});

// Function to add a message to the sidebar
function addMessage(text, type) {
    const chatSidebar = document.getElementById("chat-sidebar");

    // Create a new div for the message
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}`; // Add styling class
    messageElement.textContent = text;

    // Append the message to the sidebar
    chatSidebar.appendChild(messageElement);

    // Scroll to the bottom to show the latest message
    chatSidebar.scrollTop = chatSidebar.scrollHeight;
}

// Function to generate a simple automated response (placeholder logic)
function generateResponse(userMessage) {
    // You can customize this logic as needed for different responses
    return "Thank you for your message!";
}