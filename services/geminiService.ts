
import { GoogleGenAI, Type } from "@google/genai";

const parseAIJSON = (text: string) => {
  try {
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse AI JSON response:", text);
    throw new Error("Invalid response format from medical database.");
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
        Provide general information about medicines, dosages, and health tips. 
        Language: ${lang === 'hi' ? 'Respond ONLY in Hindi (Devanagari script).' : 'Respond ONLY in English.'}
        Always state you are an AI assistant and not a doctor.`,
        temperature: 0.7,
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return lang === 'hi' ? "कनेक्शन एरर। कृपया बाद में प्रयास करें।" : "Connection error. Please try again later.";
  }
};

export const getMedicineDetails = async (medicineName: string, lang: 'en' | 'hi' = 'en') => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide complete professional details for the medicine: ${medicineName}. 
      Include purpose, action, dosage, composition, side effects, warnings, and a short description.
      Language preference: ${lang === 'hi' ? 'Hindi (Hindi content for values)' : 'English'}.
      CRITICAL: Return ONLY valid JSON.`,
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
    if (!text) throw new Error("Empty response from AI");
    
    return parseAIJSON(text);
  } catch (error: any) {
    console.error("Gemini Detail Fetch Error:", error);
    throw new Error(lang === 'hi' ? "डेटा नहीं मिला। कृपया दवा का नाम चेक करें।" : "Medicine details not found. Please check the name.");
  }
};
