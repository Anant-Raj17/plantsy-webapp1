"use client";
import { useState } from "react";

interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Welcome to Plant-Sy Chat
            </h2>
            <p className="mb-4">
              Our AI-powered chat is here to help you with all your plant care
              needs. Ask questions about watering, sunlight requirements, or any
              plant-related issues.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Plant Care Journal</h2>
            <p className="mb-4">
              Keep track of your plants' growth and care routines. Log watering
              schedules, fertilizing, and observations in your digital journal.
            </p>
          </>
        )}
        <button
          onClick={handleNext}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          {step === 1 ? "Next" : "Understood"}
        </button>
      </div>
    </div>
  );
}
