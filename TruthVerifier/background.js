const geminiApiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_GEMINI_API_KEY"; // Your Gemini API Key

const googleSearchApiKey = "YOUR_GOOGLE_SEARCH_API_KEY"; // Your Google Search API Key
const searchEngineId = "YOUR_SEARCH_ENGINE_ID"; // Your Search Engine ID
const googleSearchApiEndpoint = `https://www.googleapis.com/customsearch/v1?key=${googleSearchApiKey}&cx=${searchEngineId}`;

async function getLiveInfo(query) {
    const apiUrl = `${googleSearchApiEndpoint}&q=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`Search API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        return [];
    }

    return data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet
    }));
}

async function getGeminiAnalysis(mainClaim, context) {
    const combinedPrompt = `Analyze the following statement using the live search results provided.

    Statement: "${mainClaim}"
    
    Search Results Context:
    ${context}
    
    Instructions:
    1. Focus on verifying the **main claim** in the statement based on the search results.
    2. If the main claim is supported by the search results, respond with:
    "True."
    (Do not include any additional explanation if the claim is true.)
    3. If the main claim is not supported by the search results, respond with:
    "False."
    Provide a detailed explanation of why the claim is false, and cite credible sources from the search results to support your reasoning.
    
    Note: Do not reject the main claim based solely on unverified specific details unless the main claim itself is contradicted. Also if false provide links to credible sources that support your explanation.`;

    const body = JSON.stringify({
        contents: [
            {
                parts: [
                    {
                        text: combinedPrompt
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain"
        }
    });

    const response = await fetch(geminiApiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    });

    if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const candidates = data.candidates || [];
    if (candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
        const responseParts = candidates[0].content.parts;
        const analysis = responseParts[0]?.text.trim() || "No analysis provided.";
        const explanation = responseParts.length > 1 ? responseParts[1]?.text.trim() : "";
        return { analysis, explanation };
    }
    return { analysis: "Error", explanation: "No valid response received from Gemini API." };
}

chrome.runtime.onMessage.addListener(async (message, sender) => {
    console.log("Received message from content script:", message);

    if (!message.text.trim()) {
        chrome.tabs.sendMessage(sender.tab.id, {
            popupMessage: "Nothing is selected. Please select some text.",
            result: null
        });
        return;
    }

    try {
        const searchResults = await getLiveInfo(message.text);

        const context = searchResults
            .map(result => `Title: ${result.title}\nSnippet: ${result.snippet}\n`)
            .join("\n");

        console.log("Search Results Context:", context);

        const geminiAnalysis = await getGeminiAnalysis(message.text, context);

        console.log("Gemini Analysis:", geminiAnalysis);

        const popupMessage = `Analysis: ${geminiAnalysis.analysis}` +
            (geminiAnalysis.analysis.toLowerCase() === "false" && geminiAnalysis.explanation
                ? `\n\n${geminiAnalysis.explanation}`
                : "") +
            (searchResults.length > 0
                ? `\n\nBelow are live search results for further verification:\n` +
                searchResults.map(result => `- [${result.title}](${result.link}): ${result.snippet}`).join("\n")
                : "\n\nNo live search results found for additional verification.");

        chrome.tabs.sendMessage(sender.tab.id, {
            popupMessage,
            result: {
                analysis: geminiAnalysis.analysis || "Unavailable",
                explanation: geminiAnalysis.explanation || "",
                searchResults
            }
        });
    } catch (error) {
        console.error("Error during API requests:", error);
        chrome.tabs.sendMessage(sender.tab.id, {
            popupMessage: "An error occurred while processing the request. Please try again later.",
            result: null
        });
    }
});

