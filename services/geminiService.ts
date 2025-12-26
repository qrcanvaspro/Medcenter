
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Robust helper to extract and parse JSON from AI response.
 */
const parseAIJSON = (text: string) => {
  if (!text) throw new Error("Empty response from medical database.");
  try {
    // Cleaning the response string just in case it contains markdown code blocks
    const cleanText = text.trim().replace(/^```json/, '').replace(/```$/, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse AI JSON response:", text);
    throw new Error("Invalid response format from server. Please try again.");
  }
};

export const askPharmacist = async (prompt: string, history: any[], lang: 'en' | 'hi' = 'en') => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return lang === 'hi' 
        ? "त्रुटि: API_KEY उपलब्ध नहीं है। कृपया सेटिंग्स चेक करें।" 
        : "Error: API_KEY not found in environment.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are a professional medical AI assistant for Manish Yadav's MedCenter. 
        Your goal is to provide accurate pharmaceutical data. 
        Current User: Mr. Manish Yadav. 
        Language: ${lang === 'hi' ? 'Hindi' : 'English'}.
        Always include a disclaimer that you are an AI.`,
        temperature: 0.5,
      },
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return `Connection error: ${error.message || 'Unknown error'}`;
  }
};

export const getMedicineDetails = async (medicineName: string, lang: 'en' | 'hi' = 'en') => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide detailed medical data for the drug: ${medicineName}. 
      Return the data strictly in JSON format. 
      Language: ${lang === 'hi' ? 'Hindi' : 'English'}.`,
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

    const text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    return parseAIJSON(text);
  } catch (error: any) {
    console.error("Gemini Detail Fetch Error:", error);
    throw error;
  }
};
