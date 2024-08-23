"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChatBubble from "./ChatBubble";
import { generateResponse } from "../lib/api";

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    Array<{ text: string; image: File | string | null; isUser: boolean }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (message.trim() || file) {
      const newMessage = { text: message, image: file, isUser: true };
      setMessages((prev) => [...prev, newMessage]);
      setIsLoading(true);

      try {
        const response = await generateResponse(
          messages
            .concat(newMessage)
            .map(({ text, isUser }) => ({ text, isUser })),
          file
        );
        setMessages((prev) => [
          ...prev,
          { text: response, image: null, isUser: false },
        ]);
      } catch (error) {
        console.error("Error getting response:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I couldn't process that request. Please try again.",
            image: null,
            isUser: false,
          },
        ]);
      }

      setMessage("");
      setFile(null);
      setPreviewUrl(null);
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg.text}
            file={msg.image || undefined}
            isUser={msg.isUser}
          />
        ))}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-green-50 border-t border-green-200">
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <label className="text-white bg-green-600 hover:bg-green-700 px-3 py-3 rounded-full transition duration-300">
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
            <Image
              src="/file-share-btn.png"
              alt="Upload"
              width={24}
              height={24}
            />
          </label>
          {previewUrl && (
            <div className="w-10 h-10 relative">
              <Image
                src={previewUrl}
                alt="Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about plant care..."
            className="input input-bordered flex-1 bg-white text-gray-800"
          />
          <button
            onClick={handleSend}
            className="text-white bg-green-600 hover:bg-green-700 px-3 py-3 rounded-full transition duration-300"
          >
            <Image src="/sent-btn.png" alt="Send" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
