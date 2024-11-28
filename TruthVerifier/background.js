const apiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=Your-API-Key-Here";// Replace with your actual API key

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message from content script:", message);

    if (!message.text.trim()) {
        console.warn("No text was selected.");
        chrome.tabs.sendMessage(sender.tab.id, {
            result: {
                analysis: "Error",
                explanation: "Nothing is selected. Please select some text."
            }
        });
        return;
    }

    const formattedText = `Is this information true or false?(answer with true or false, ONLY if false explain and give a trusted sources where I can find the correct info?) "${message.text}"`;
    console.log("Formatted text to send to API:", formattedText);

    const body = JSON.stringify({
        contents: [
            {
                parts: [
                    {
                        text: formattedText
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        }
    });

    console.log("Request Body:", body);

    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
        .then(response => {
            console.log("Full API response:", response);

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText} (Code: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Full API response data:", data);

            const candidates = data.candidates || [];
            if (candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
                const responseParts = candidates[0].content.parts;

                const analysis = responseParts[0]?.text.trim() || "No analysis provided.";

                const explanation = responseParts.length > 1 && responseParts[1]?.text.trim()
                    ? responseParts[1]?.text.trim()
                    : "";

                console.log("Extracted AI analysis:", analysis);
                if (explanation) {
                    console.log("Extracted AI explanation:", explanation);
                }

                chrome.tabs.sendMessage(sender.tab.id, { result: { analysis, explanation } });
            } else {
                console.warn("No valid content found in API response:", data);
                chrome.tabs.sendMessage(sender.tab.id, {
                    result: {
                        analysis: "Error",
                        explanation: "No valid response received from AI."
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error during API request:", error);

            chrome.tabs.sendMessage(sender.tab.id, {
                result: {
                    analysis: "Error",
                    explanation: "Unable to process the request. Please check the console for details."
                }
            });
        });
});
