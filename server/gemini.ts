import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI with hardcoded API key
const ai = new GoogleGenAI({ apiKey: "AIzaSyBreoZhTVNwNNDqviHS__RDJPRpCP-pvlc" });

export async function enhancePrompt(text: string): Promise<string> {
  try {
    const systemPrompt = `You are an expert at enhancing video generation prompts. 
Transform the given text into a detailed, vivid, and visually compelling prompt for AI video generation.
Focus on:
- Visual details and cinematography
- Lighting and atmosphere
- Movement and dynamics
- Color palette and mood
- Camera angles and shots

Keep the enhanced prompt under 200 words and make it engaging for 8-second video generation.
Respond only with the enhanced prompt, no additional text.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: text,
    });

    return response.text || text;
  } catch (error) {
    console.error("Failed to enhance prompt:", error);
    throw new Error("Gagal meningkatkan prompt");
  }
}

export async function translateToEnglish(text: string): Promise<string> {
  try {
    const systemPrompt = `You are a professional translator. 
Translate the given Indonesian text to natural, fluent English.
If the text is already in English, return it as is.
Focus on maintaining the meaning and intent of the original text.
Respond only with the translated text, no additional explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: text,
    });

    return response.text || text;
  } catch (error) {
    console.error("Failed to translate text:", error);
    throw new Error("Gagal menerjemahkan teks");
  }
}

export async function detectLanguage(text: string): Promise<'id' | 'en'> {
  try {
    const systemPrompt = `Detect if the given text is in Indonesian (id) or English (en).
Respond only with 'id' for Indonesian or 'en' for English, nothing else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: text,
    });

    const result = response.text?.trim().toLowerCase();
    return result === 'id' ? 'id' : 'en';
  } catch (error) {
    console.error("Failed to detect language:", error);
    return 'en'; // Default to English
  }
}

// Customer service chatbot function
export async function handleChatbotQuery(query: string): Promise<string> {
  try {
    const systemPrompt = `You are a helpful customer service assistant for VideoAI, an AI-powered video generation platform.
    
Key information about VideoAI:
- We transform text prompts into professional 8-second videos using advanced AI
- We support both Indonesian and English prompts (auto-translated)
- Users can generate up to 10 videos simultaneously
- Videos are automatically enhanced for better quality
- All videos are saved to the downloads folder
- Features include prompt enhancement, auto-translation, and real-time status tracking

Answer user questions professionally and helpfully. If asked about technical issues, guide them appropriately.
Keep responses concise but informative. Always be polite and helpful.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: query,
    });

    return response.text || "Maaf, saya tidak dapat memproses pertanyaan Anda saat ini. Silakan coba lagi.";
  } catch (error) {
    console.error("Failed to process chatbot query:", error);
    return "Maaf, terjadi kesalahan pada sistem. Silakan coba lagi nanti.";
  }
}