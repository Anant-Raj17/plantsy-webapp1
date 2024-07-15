"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";

const ChatBubble = ({ message, file, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] ${
          isUser ? "bg-primary" : "bg-primary"
        } rounded-lg p-3`}
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
        <div className={`text-sm ${isUser ? "text-white" : "text-white"}`}>
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
