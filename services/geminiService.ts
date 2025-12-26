
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Robust helper to extract and parse JSON from AI response.
 * Safely handles markdown wrappers and empty responses.
 */
const parseAIJSON = (text: string) => {
  if (!text) throw new Error("Empty response from medical database.");
  try {
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse AI JSON response:", text);
    throw new Error("Invalid response format. Please try searching again.");
  }
};

export const askPharmacist = async (prompt: string, history: any[], lang: 'en' | 'hi' = 'en') => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are a helpful AI Medical Assistant for MedCenter, managed by Mr. Manish Yadav. 
        Your task is to provide general pharmaceutical info and health tips. 
        Language: ${lang === 'hi' ? 'Respond ONLY in Hindi (Devanagari script).' : 'Respond ONLY in English.'}
        IMPORTANT: Start by stating you are an AI, not a doctor. Advise professional consultation. 
        Focus on being helpful and accurate.`,
        temperature: 0.7,
      },
    });

    return response.text || (lang === 'hi' ? "क्षमा करें, मैं अभी जवाब नहीं दे पा रहा हूँ।" : "I'm sorry, I couldn't generate a response.");
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return lang === 'hi' ? "कनेक्शन एरर। कृपया बाद में प्रयास करें।" : "Connection error. Please check your internet and try again.";
  }
};

export const getMedicineDetails = async (medicineName: string, lang: 'en' | 'hi' = 'en') => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide complete professional details for: ${medicineName}. 
      Target Language for Values: ${lang === 'hi' ? 'Hindi' : 'English'}.
      CRITICAL: Keep JSON keys in English. Provide values in the target language.`,
      config: {
        systemInstruction: "You are a specialized medical information extractor. Your goal is to provide data for a pharmacy app managed by Manish Yadav. Return ONLY valid JSON matching the provided schema. Do not include any warnings about medical advice in the JSON itself, as the app has a built-in disclaimer.",
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
    return parseAIJSON(text || "");
  } catch (error: any) {
    console.error("Gemini Detail Fetch Error:", error);
    // Handle specific API key or permission errors
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('403')) {
      throw new Error(lang === 'hi' ? "API की समस्या। कृपया एडमिन से संपर्क करें।" : "API Key error. Please verify integration.");
    }
    throw new Error(lang === 'hi' ? "दवाई की जानकारी नहीं मिली। कृपया नाम दोबारा चेक करें।" : "Medicine not found in database. Check spelling.");
  }
};
