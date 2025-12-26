
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Safely access the API key to prevent build crashes on Netlify
 */
const getSafeApiKey = (): string => {
  try {
    // @ts-ignore - process might not be defined in browser environments without polyfills
    const key = typeof process !== 'undefined' ? process.env?.API_KEY : '';
    return key || '';
  } catch (e) {
    return '';
  }
};

const parseResponse = (text: string) => {
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error("JSON Parsing failed:", text);
    throw new Error("Invalid format received from AI.");
  }
};

export const askPharmacist = async (prompt: string, history: any[], lang: 'en' | 'hi' = 'en') => {
  try {
    const apiKey = getSafeApiKey();
    if (!apiKey) throw new Error("API_KEY_MISSING");

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are a medical assistant for Mr. Manish Yadav's MedCenter. 
        Current User: Mr. Manish Yadav.
        Language: ${lang === 'hi' ? 'Hindi' : 'English'}.
        Always mention you are an AI assistant.`,
        temperature: 0.7,
      },
    });

    return response.text || "No response.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    if (error.message === "API_KEY_MISSING") {
      return lang === 'hi' 
        ? "त्रुटि: API_KEY नहीं मिली। कृपया Netlify में 'API_KEY' सेट करें।" 
        : "Error: API_KEY missing. Please set it in Netlify Environment Variables.";
    }
    return lang === 'hi' ? "कनेक्शन की समस्या। कृपया पुनः प्रयास करें।" : "Connection error. Please try again.";
  }
};

export const getMedicineDetails = async (medicineName: string, lang: 'en' | 'hi' = 'en') => {
  const apiKey = getSafeApiKey();
  if (!apiKey) throw new Error("API_KEY_MISSING");

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Detailed medical analysis for: ${medicineName}. Language: ${lang === 'hi' ? 'Hindi' : 'English'}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            purpose: { type: Type.STRING },
            action: { type: Type.STRING },
            dosage: { type: Type.STRING },
            composition: { type: Type.ARRAY, items: { type: Type.STRING } },
            sideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING }
          },
          required: ["name", "purpose", "action", "dosage", "composition", "sideEffects", "warnings", "description"]
        }
      }
    });

    return parseResponse(response.text || "{}");
  } catch (error: any) {
    console.error("Details Error:", error);
    throw error;
  }
};
