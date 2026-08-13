const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// GEMINI AI
// ================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());

// ================================
// TEST ROUTE
// ================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Nikhil Product Studio AI Server is running 🚀"
    });
});

// ================================
// AI CHAT ROUTE
// ================================

app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: "Message is required"
            });
        }

        const systemInstruction = `
You are the AI Assistant for Nikhil Product Studio.

Business:
Nikhil Product Studio

Services:
- Background Removal
- AI Product Image Enhancement
- Premium Retouching
- Amazon Ready Images
- Flipkart Ready Images
- Meesho Ready Images
- Shopify Product Images
- Bulk Product Image Editing

Your job is to help website visitors.

Be:
- Friendly
- Professional
- Concise
- Helpful

If someone wants a quote, ask:
1. Number of images
2. Type of editing
3. Delivery requirement

Do not invent prices or promises.

For human assistance, suggest contacting Nikhil through WhatsApp.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: systemInstruction
            }
        });

        const reply = response.text;

        res.json({
            success: true,
            reply: reply
        });

    } catch (error) {

        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            success: false,
            error: "AI service temporarily unavailable."
        });
    }
});

// ================================
// START SERVER
// ================================

app.listen(PORT, () => {
    console.log(
        `AI Server running at http://localhost:${PORT}`
    );
});