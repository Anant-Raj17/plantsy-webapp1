"use client";

import { useState, useEffect } from "react";
import ClientChatWrapper from "./ClientChatWrapper";
import InfoModal from "../components/infoModal";

export default function Chat() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("hasSeenIntro", "true");
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-green-50">
      <div className="w-full max-w-4xl py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-800">
          Plant-Sy Chat
        </h1>
        <ClientChatWrapper />
      </div>
      {showModal && <InfoModal onClose={handleCloseModal} />}
    </main>
  );
}
