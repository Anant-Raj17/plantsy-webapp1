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
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="min-h-screen bg-base-100">
        {/* Your chat messages will go here */}
      </div>
      <ClientChatWrapper />
      {showModal && <InfoModal onClose={handleCloseModal} />}
    </div>
  );
}
