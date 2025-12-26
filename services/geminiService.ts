
import { GoogleGenAI, Type } from "@google/genai";

// Helper to create a fresh instance of GoogleGenAI using the secure environment key
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askPharmacist = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are a helpful AI Medical Assistant for an app managed by Mr. Manish Yadav. 
        Your goal is to provide general information about medicines, dosages, and health tips. 
        CRITICAL: Always start by stating you are an AI assistant and not a doctor. 
        Advise consulting a healthcare professional for specific medical advice.
        Keep responses professional, empathetic, and clear.`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my medical database. Please try again in a moment.";
  }
};

export const getMedicineDetails = async (medicineName: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide complete professional details for: ${medicineName}. 
      Explain what it treats, how it works, dosage, active ingredients, common side effects, and safety warnings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            purpose: { type: Type.STRING, description: "Primary medical use" },
            action: { type: Type.STRING, description: "How it works in the body" },
            dosage: { type: Type.STRING, description: "Standard adult dosage guidelines" },
            composition: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Active chemical components"
            },
            sideEffects: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Common side effects"
            },
            warnings: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Safety precautions"
            },
            description: { type: Type.STRING, description: "Brief overview" }
          },
          required: ["name", "purpose", "action", "dosage", "composition", "sideEffects", "warnings", "description"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Detail Fetch Error:", error);
    throw new Error("Could not retrieve medicine data. Please check the name.");
  }
};
