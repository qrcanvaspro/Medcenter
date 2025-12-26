
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Robust helper to extract and parse JSON from AI response.
 */
const parseAIJSON = (text: string) => {
  if (!text) throw new Error("Empty response from medical database.");
  try {
    const cleanText = text.trim().replace(/^```json/, '').replace(/```$/, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse AI JSON response:", text);
    throw new Error("Invalid response format. Please try searching again.");
  }
};

const getApiKey = () => {
  const key = process.env.API_KEY;
  if (!key || key === "undefined" || key === "") {
    return null;
  }
  return key;
};

export const askPharmacist = async (prompt: string, history: any[], lang: 'en' | 'hi' = 'en') => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return lang === 'hi' 
        ? "त्रुटि: API_KEY नहीं मिली। कृपया Netlify Settings में 'API_KEY' सेट करें।" 
        : "Error: API_KEY missing. Please set 'API_KEY' in Netlify Environment Variables.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are a helpful AI Medical Information Assistant for MedCenter, managed by Mr. Manish Yadav. 
        Your task is to provide general pharmaceutical info and health tips. 
        Language: ${lang === 'hi' ? 'Respond ONLY in Hindi (Devanagari script).' : 'Respond ONLY in English.'}
        IMPORTANT: This is for educational database lookup only. Always state you are an AI, not a doctor.`,
        temperature: 0.7,
      },
    });

    return response.text || (lang === 'hi' ? "क्षमा करें, मैं जवाब नहीं दे पा रहा हूँ।" : "I couldn't generate a response.");
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return lang === 'hi' ? "सर्वर से कनेक्ट नहीं हो पा रहा है।" : "Could not connect to the server.";
  }
};

export const getMedicineDetails = async (medicineName: string, lang: 'en' | 'hi' = 'en') => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search pharmaceutical data for: ${medicineName}. 
      Language for descriptions/values: ${lang === 'hi' ? 'Hindi' : 'English'}.`,
      config: {
        systemInstruction: "Return ONLY a valid JSON object matching the provided schema. No markdown.",
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
