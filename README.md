# 🔍 TruthVerifier Chrome Extension

TruthVerifier is a Chrome extension powered by Google Gemini AI that allows users to verify the truthfulness of selected text on any webpage. With this extension, you can analyze statements and receive detailed explanations if the information is deemed false.

---

## 🚀 Features
- **True/False Analysis:** Quickly determine if selected text is true or false.
- **Detailed Explanations:** Get additional context and explanations for false statements.
- **Modern Design:** A user-friendly interface with a sleek look.
- **Lightweight and Easy to Use:** Works seamlessly on any website.

---

## ⚙️ Before You Begin

To use this extension, you must add your own Google Gemini API key.

### Steps to Add Your API Key
1. Open the `background.js` file in the extension's folder.
2. Locate the following line:
   ```javascript
   const apiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY";
   ```
3. Replace `YOUR_API_KEY` with your Google Gemini API key.
4. Save the file.


📖 How to Use

1. **Install the Extension**:
   - Open `chrome://extensions/` in your browser.
   - Enable "Developer mode" (toggle in the top-right corner).
   - Click **"Load unpacked"** and select the folder containing the extension files.

2. **Select Text**:
   - Highlight any text on a webpage.

3. **Analyze**:
   - Click on the extension icon in your browser.
   - Click the **Check Information** button.

4. **Results**:
   - A popup will display whether the information is true or false.
   - If false, the popup may include a detailed explanation.

---

## 🛠️ Technologies Used
- **Google Gemini AI API**
- **HTML, CSS, and JavaScript**
- **Chrome Extensions Framework**

---

## 🤝 Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for feedback, bugs, or enhancements.

---

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## ✨ Acknowledgments
Special thanks to [Google Gemini AI](https://aistudio.google.com/) for providing the powerful API that makes this extension possible.
