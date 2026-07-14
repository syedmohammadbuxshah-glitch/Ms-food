import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parser
app.use(express.json());

// Initialize Gemini SDK lazily if the key is available
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// AI Biometric Optimization Endpoint
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { hrv, restingHeartRate, sleepScore, vo2Max, cnsRecovery, activeCalories, trainingGoal, notes } = req.body;

    const ai = getAiClient();

    const systemInstruction = `You are the core intelligence of the APEX Portal, an elite, clinical-grade human athletic performance optimization machine.
Your tone is clinical, high-performance, scientific, authoritative, and direct. You never use sales pitch fluff, emojis, or casual talk.
You analyze an athlete's biometrics and provide highly structured, precision-driven recovery and fueling recommendations.`;

    const prompt = `Perform an athletic optimization audit for an elite tier APEX member with the following biometric metrics:
- Heart Rate Variability (HRV): ${hrv} ms
- Resting Heart Rate (RHR): ${restingHeartRate} bpm
- Sleep Score: ${sleepScore}/100
- VO2 Max: ${vo2Max} ml/kg/min
- Central Nervous System (CNS) Recovery Index: ${cnsRecovery}%
- Active Calories Expended (Today): ${activeCalories} kcal
- Primary Optimization Goal: ${trainingGoal}
- Subjective Athlete Log: "${notes || "No additional logs provided."}"

Provide the audit results in a structured JSON schema representing:
1. "physiologicalInterpretation": A highly technical clinical analysis of their sympathetic/parasympathetic status and overall CNS fitness state. (approx 2 sentences)
2. "readinessScore": An integer from 1 to 100 indicating their overall nervous system and tissue readiness.
3. "readinessCategory": A single-word category: "OPTIMAL", "STABILIZING", or "SUPPRESSED".
4. "trainingPrescription": Exact training zone, duration limits, and workload guidance for the next 24 hours.
5. "recoveryStack": A list of custom physical therapy protocols (e.g. cold immersion, pneumatic compression, hyperbaric, sauna) with precise variables (temp, time).
6. "nutrientTiming": Precise pre, intra, and post-training timing targets for amino acids, specific carbohydrates, or cellular hydration.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "physiologicalInterpretation",
            "readinessScore",
            "readinessCategory",
            "trainingPrescription",
            "recoveryStack",
            "nutrientTiming"
          ],
          properties: {
            physiologicalInterpretation: {
              type: Type.STRING,
              description: "A clinical summary of their autonomic state and somatic resource budget."
            },
            readinessScore: {
              type: Type.INTEGER,
              description: "Readiness index from 1 to 100."
            },
            readinessCategory: {
              type: Type.STRING,
              description: "One of OPTIMAL, STABILIZING, SUPPRESSED."
            },
            trainingPrescription: {
              type: Type.STRING,
              description: "Precise training zone and physical limits."
            },
            recoveryStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended physical therapy protocols with explicit variables."
            },
            nutrientTiming: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Precise timing guidelines for pre, intra, and post-workout nutritional inputs."
            }
          }
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Empty response from Gemini API");
    }

    const parsedData = JSON.parse(textOutput.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini optimization audit error:", error);
    res.status(500).json({
      error: error.message || "Failed to process biometric audit",
      fallback: {
        physiologicalInterpretation: "CNS capacity is moderately compromised. System is exhibiting high sympathetic bias. Recommend focusing strictly on parasympathetic activation protocols to restore autonomic balance.",
        readinessScore: 65,
        readinessCategory: "STABILIZING",
        trainingPrescription: "Limit physical load to Zone 2 cardiovascular work (RPE 4-5) for 40 minutes max. Zero high-velocity neural recruitment or heavy loads.",
        recoveryStack: [
          "Contrast Therapy: 3 cycles of 3-min Infrared Sauna (200°F) and 1-min Cold Plunge (39°F)",
          "Normatec Compression: Session level 5 for 25 minutes on Recovery setting"
        ],
        nutrientTiming: [
          "Pre-Workout: 5g L-Glutamine and 300mg Sodium in 500ml water 30 min prior",
          "Intra-Workout: Electrolyte replacement only",
          "Post-Workout: 30g Grass-Fed Isolate paired with 50g cyclical dextrin"
        ]
      }
    });
  }
});

// Vite Middleware Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static build assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[APEX PORTAL Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
