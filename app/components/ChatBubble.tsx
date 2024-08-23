"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: string;
  file?: File | string;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, file, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] ${
          isUser ? "bg-green-500" : "bg-white"
        } rounded-lg p-3 ${isUser ? "" : "border border-green-200"}`}
      >
        {file && (
          <div className="mb-2">
            <Image
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              alt="Uploaded Image"
              width={200}
              height={200}
              className="rounded-lg w-full h-auto"
            />
          </div>
        )}
        <div className={`text-sm ${isUser ? "text-white" : "text-green-800"}`}>
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
