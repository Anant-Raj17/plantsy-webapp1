import { GoogleGenerativeAI, Part} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);



export async function generateResponse(messages: Array<{ text: string; isUser: boolean }>, file: File | null): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let prompt = `You are a helpful assistant specializing in plant care, watering, sunlight requirements, and soil types. You have vast knowledge about plants and their needs. Only answer questions related to plants. If asked about topics unrelated to plants, politely redirect the conversation to plant care.

    Here's the conversation history:

    ${messages.map(msg => `${msg.isUser ? 'Human' : 'Plant-Sy'}: ${msg.text}`).join('\n')}

    Human: ${messages[messages.length - 1].text}

    Plant-Sy:`;

    if (file) {
      const imageModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const imagePart = await fileToGenerativePart(file);
      const result = await imageModel.generateContent([prompt, imagePart]);
      return result.response.text();
    } else {
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error) {
    console.error("Error generating response:", error);
    if (error instanceof Error) {
      return `I'm sorry, but I encountered an error while processing your request. Please try again later.`;
    }
    return "I'm sorry, but I encountered an unknown error while processing your request. Please try again later.";
  }

async function fileToGenerativePart(file: File): Promise<Part> {
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
}