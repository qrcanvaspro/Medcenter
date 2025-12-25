
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

    // @fix: Access .text property directly as per Gemini API guidelines
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
      contents: `Provide detailed information about the medicine: ${medicineName}. Include its composition (active ingredients), primary uses, common side effects, and important warnings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            composition: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of active chemical ingredients"
            },
            uses: { type: Type.ARRAY, items: { type: Type.STRING } },
            sideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING, description: "Short summary of how the medicine works" }
          },
          required: ["name", "composition", "uses", "sideEffects", "warnings", "description"]
        }
      }
    });

    // @fix: Access .text property directly as per Gemini API guidelines
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Detail Fetch Error:", error);
    throw error;
  }
};
