# TruthVerifier Chrome Extension

**TruthVerifier** is a Chrome extension that helps you verify the truthfulness of information found online. With just a few clicks, you can highlight a piece of text, check its validity, and view credible sources for further context. The extension features an intuitive interface, a clean design, and reliable AI-backed results.

---

## 🚀 Features

1. **Text Verification**: Highlight any text on a webpage and verify its truthfulness.
2. **Custom Alerts**: Displays clean, styled pop-ups for analysis results, without the default "website says" format.
3. **AI Integration**:
   - **Gemini AI**: Provides analysis based on its training data.
   - **Google Custom Search API**: Retrieves live, credible sources to support the analysis.
4. **Seamless User Experience**:
   - Automatically closes the extension popup after initiating a check.
   - Displays analysis results in a concise, visually appealing custom alert.
5. **Error Handling**: Alerts users if no text is selected or if there are API issues.

---

## 🛠️ Installation

1. Clone or download this repository.
2. Open **chrome://extensions/** in your Chrome browser.
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click on **Load unpacked** and select the project folder.
5. Add your **Gemini API Key** and **Google Custom Search API Key**:
   - Open `background.js` and replace the placeholders with your API keys:
     ```javascript
     const geminiApiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_GEMINI_API_KEY";
     const googleSearchApiKey = "YOUR_GOOGLE_SEARCH_API_KEY";
     const searchEngineId = "YOUR_SEARCH_ENGINE_ID";
     ```

---

## 🖥️ How to Use

1. Navigate to any webpage in Chrome.
2. Select a piece of text you want to verify.
3. Open the TruthVerifier extension and click the **Check Information** button.
4. The extension will:
   - Close the popup automatically.
   - Display a custom alert with the analysis results:
     - **True**: Indicates the statement is correct.
     - **False**: Provides an explanation and links to credible sources for verification.

---

## 🌟 Design

TruthVerifier features a modern, clean design with a consistent color scheme:

- **Background**: Light yellowish-beige (`#fffbec`).
- **Primary Colors**: Orange (`#ff8c00`) and Green (`#4caf50`).
- **Font**: Arial, ensuring readability and simplicity.
- **Custom Alerts**: Styled to mimic native Chrome alerts, featuring a scrollable area for long results and clickable links for further verification.

---

## ⚠️ Known Limitations

1. **Gemini AI Knowledge Cutoff**:
   - The Gemini API is trained on data up to September 2021 and does not have access to real-time information.
2. **Custom Search API Dependency**:
   - The extension relies on Google's Custom Search API to provide live results, so ensure your API key and Search Engine ID are correctly configured.

---

## 🛠️ Built With

- **JavaScript**: Core logic for interaction and analysis.
- **Chrome Extensions API**: To integrate with browser functionality.
- **Gemini AI**: For AI-backed analysis.
- **Google Custom Search API**: For real-time data retrieval.


## 📈 What's Next?

- **Enhanced Context Analysis**: Improve the explanation with more detailed reasoning.
- **UI Enhancements**: Add animation and additional customization options for the alert pop-up.
- **Multi-Language Support**: Expand support for non-English text verification.

---

Let me know if you'd like any further updates or tweaks! 🚀
