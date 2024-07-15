import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateResponse(messages: Array<{ text: string; isUser: boolean }>, file: File | null): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let prompt = `You are a helpful assistant specializing in plant care.
    Provide advice on how to make plants healthy, how and when to water the plant,
    how many days to water the plant in a week, if plant requires some special attention.
    Here's the conversation history:
    ${messages.map(msg => `${msg.isUser ? 'Human' : 'Plant-Sy'}: ${msg.text}`).join('\n')}
    Human: ${messages[messages.length - 1].text}
    Assistant:`;

    if (file) {
      const imageModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const imageData = await fileToGenerativePart(file);
      const result = await imageModel.generateContent([prompt, imageData]);
      return result.response.text();
    } else {
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm sorry, but I encountered an error while processing your request. Please try again later.";
  }
}

async function fileToGenerativePart(file: File): Promise<{
  inlineData: { data: string; mimeType: string };
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve({
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        });
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}