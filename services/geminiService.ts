
import { GoogleGenAI, Type } from "@google/genai";

// @fix: helper to create a fresh instance of GoogleGenAI using strictly process.env.API_KEY
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
        systemInstruction: `You are a helpful AI Medical Assistant for an app dedicated to Mr. Manish Yadav. 
        Your goal is to provide general information about medicines, dosages, and side effects. 
        CRITICAL: Always start by stating that you are an AI assistant and not a medical doctor. 
        Advise the user to consult with a healthcare professional before making any medical decisions.
        Keep responses concise, professional, and empathetic.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error. Please try again later.";
  }
};

export const getMedicineDetails = async (medicineName: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide detailed information about the medicine: ${medicineName}. 
      Include its purpose (what it treats), action (how it works in the body), general dosage guidelines, composition, and side effects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            purpose: { type: Type.STRING, description: "What the medicine is primarily used for" },
            action: { type: Type.STRING, description: "Mechanism of action - how it works in the body" },
            dosage: { type: Type.STRING, description: "General dosage guidelines for adults" },
            composition: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of active chemical ingredients"
            },
            sideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING, description: "Short summary of the medicine" }
          },
          required: ["name", "purpose", "action", "dosage", "composition", "sideEffects", "warnings", "description"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Detail Fetch Error:", error);
    throw error;
  }
};
