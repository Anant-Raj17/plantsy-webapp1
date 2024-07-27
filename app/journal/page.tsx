"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";

interface PlantEntry {
  name: string;
  image: string;
  wateringFrequency: string;
  sunlightRequirement: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<PlantEntry[]>([]);
  const [newPlantImage, setNewPlantImage] = useState<string | null>(null);
  const [newPlantName, setNewPlantName] = useState("");

  useEffect(() => {
    const savedEntries = localStorage.getItem("plantJournal");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPlantImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEntry = () => {
    if (newPlantImage && newPlantName) {
      const newEntry: PlantEntry = {
        name: newPlantName,
        image: newPlantImage,
        wateringFrequency: "",
        sunlightRequirement: "",
      };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
      setNewPlantImage(null);
      setNewPlantName("");
    }
  };

  const updateEntry = (
    index: number,
    field: keyof PlantEntry,
    value: string
  ) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
    localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Plant Care Journal
        </h1>

        {/* New plant entry section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            {newPlantImage ? (
              <Image
                src={newPlantImage}
                alt="New plant"
                width={256}
                height={256}
                className="rounded-lg object-cover"
              />
            ) : (
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-gray-500"
              >
                Click to upload image
              </label>
            )}
          </div>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            type="text"
            value={newPlantName}
            onChange={(e) => setNewPlantName(e.target.value)}
            placeholder="Enter plant name"
            className="border rounded-lg px-4 py-2 mb-4 w-64"
          />
          <button
            onClick={addEntry}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Add Plant
          </button>
        </div>

        {/* Existing entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4">
              <Image
                src={entry.image}
                alt={entry.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-2 rounded-lg"
              />
              <h2 className="text-xl font-semibold">{entry.name}</h2>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Watering Frequency:
                </label>
                <textarea
                  value={entry.wateringFrequency}
                  onChange={(e) =>
                    updateEntry(index, "wateringFrequency", e.target.value)
                  }
                  className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows={2}
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sunlight Requirement:
                </label>
                <textarea
                  value={entry.sunlightRequirement}
                  onChange={(e) =>
                    updateEntry(index, "sunlightRequirement", e.target.value)
                  }
                  className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
