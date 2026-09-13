import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Fallback intelligent answers when GEMINI_API_KEY is not configured
function getFallbackAnswer(question: string, lang: string = "Hindi"): string {
  const q = question.toLowerCase();
  if (q.includes("rashtrapati") || q.includes("president") || q.includes("pratham")) {
    return "भारत के प्रथम राष्ट्रपति डॉ. राजेंद्र प्रसाद थे, जिन्होंने 26 जनवरी 1950 से 13 मई 1962 तक पद संभाला। वर्तमान में भारत की 15वीं राष्ट्रपति श्रीमती द्रौपदी मुर्मू जी हैं।";
  }
  if (q.includes("samvidhan") || q.includes("constitution") || q.includes("ambedkar")) {
    return "भारतीय संविधान 26 नवंबर 1949 को अंगीकृत किया गया और 26 जनवरी 1950 को लागू हुआ। डॉ. भीमराव अंबेडकर जी को संविधान का जनक (प्रारूप समिति के अध्यक्ष) माना जाता है। इसमें मूलतः 395 अनुच्छेद और 8 अनुसूचियां थीं।";
  }
  if (q.includes("ncert") || q.includes("maths") || q.includes("science")) {
    return "NCERT कक्षा 1 से 12 तक की पुस्तकें सीबीएसई और यूपीएससी आदि परीक्षाओं का आधार हैं। बुनियादी सिद्धांतों को समझने के लिए प्रत्येक अध्याय के उदाहरण और अभ्यास प्रश्न हल करना सर्वश्रेष्ठ तरीका है।";
  }
  if (q.includes("upsc") || q.includes("ssc") || q.includes("exam") || q.includes("pariksha")) {
    return "प्रतियोगी परीक्षाओं (UPSC/SSC/Banking/Railway) में सफलता के 3 नियम: 1. सिलेबस की गहरी समझ व NCERT नोट्स, 2. पिछले 10 वर्षों के प्रश्नपत्र (PYQs), 3. दैनिक करंट अफेयर्स और नियमित मॉक टेस्ट रिवीज़न।";
  }
  if (q.includes("gravity") || q.includes("gurutva")) {
    return "गुरुत्वाकर्षण (Gravity) वह प्राकृतिक आकर्षण बल है जो द्रव्यमान वाली वस्तुओं को एक-दूसरे की ओर खींचता है। पृथ्वी का गुरुत्वीय त्वरण (g) लगभग 9.8 m/s² होता है। इसकी खोज सर आइजक न्यूटन ने की थी।";
  }
  return `🤖 ZQ AI गुरु उत्तर: "${question}" के संदर्भ में महत्वपूर्ण बिंदु:
1. मुख्य तथ्य: यह विषय स्कूल स्तर (NCERT) और प्रतियोगी परीक्षाओं (UPSC/SSC) दोनों के लिए अत्यंत उपयोगी है।
2. त्वरित सारांश: नियमित अभ्यास, मुख्य शब्दावली का स्मरण और मॉक टेस्ट से इस विषय पर पकड़ मजबूत होती है।
3. टिप: ZQ KIDZEE महा परीक्षा (500 Marks) और GK 52 पॉइंट्स में इससे जुड़े बहुविकल्पीय प्रश्न नियमित रूप से पूछे जाते हैं!`;
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // AI Ask Route
  app.post("/api/ai/ask", async (req, res) => {
    try {
      const { question, language = "Hindi" } = req.body;
      if (!question || typeof question !== "string") {
        return res.status(400).json({ error: "कृपया प्रश्न दर्ज करें (Please enter a question)" });
      }

      const client = getGeminiClient();
      if (client) {
        try {
          const prompt = `आप ZQ KIDZEE और भारत के शीर्ष शिक्षा मंच के विशेषज्ञ 'AI शिक्षा गुरु' हैं।
विद्यार्थी का प्रश्न: "${question}"
भाषा प्राथमिकता: ${language} (हिंदी / हिंग्लिश / अंग्रेजी जो भी विद्यार्थी आसानी से समझ सके)।
कृपया स्पष्ट, अत्यंत ज्ञानवर्धक, छात्र-हितैषी और 3-4 बुलेट पॉइंट्स में सटीक उत्तर दें। यदि यह स्कूल (NCERT) या प्रतियोगी परीक्षा (UPSC, SSC, Banking) से संबंधित है, तो महत्वपूर्ण परीक्षा बिंदु भी बताएं।`;

          const response = await client.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
              systemInstruction: "You are the friendly, supremely knowledgeable educational tutor for Indian kids and competitive exam aspirants across classes 1 to post-graduation.",
            },
          });

          const text = response.text || "";
          return res.json({ answer: text, success: true, source: "gemini" });
        } catch (apiError: any) {
          console.warn("Gemini API call failed, falling back to local knowledge base:", apiError?.message);
          return res.json({
            answer: getFallbackAnswer(question, language),
            success: true,
            source: "fallback",
          });
        }
      } else {
        // No GEMINI_API_KEY present in environment, serve intelligent fallback immediately
        return res.json({
          answer: getFallbackAnswer(question, language),
          success: true,
          source: "fallback",
        });
      }
    } catch (err: any) {
      console.error("Error in /api/ai/ask:", err);
      res.status(500).json({ error: "त्रुटि उत्पन्न हुई (Server error)" });
    }
  });

  // Vite middleware in dev or static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
