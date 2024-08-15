"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";

interface PlantEntry {
  name: string;
  image: string;
  wateringDays: boolean[];
  sunlightRequirement: number;
  watered: boolean;
}

export default function Journal() {
  const [entries, setEntries] = useState<PlantEntry[]>([]);
  const [newPlantImage, setNewPlantImage] = useState<string | null>(null);
  const [newPlantName, setNewPlantName] = useState("");

  useEffect(() => {
    const savedEntries = localStorage.getItem("plantJournal");
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      const validatedEntries = parsedEntries.map((entry: PlantEntry) => ({
        ...entry,
        wateringDays: Array.isArray(entry.wateringDays)
          ? entry.wateringDays
          : [false, false, false, false, false, false, false],
        watered: entry.watered || false,
        sunlightRequirement: entry.sunlightRequirement || 1,
      }));
      setEntries(validatedEntries);
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
        wateringDays: [false, false, false, false, false, false, false],
        sunlightRequirement: 1,
        watered: false,
      };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
      setNewPlantImage(null);
      setNewPlantName("");
    }
  };

  const updateEntry = (index: number, field: keyof PlantEntry, value: any) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setEntries(updatedEntries);
    localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
  };

  const updateWateringDay = (index: number, dayIndex: number) => {
    const updatedEntries = [...entries];
    const updatedWateringDays = [...updatedEntries[index].wateringDays];
    updatedWateringDays[dayIndex] = !updatedWateringDays[dayIndex];
    updatedEntries[index] = {
      ...updatedEntries[index],
      wateringDays: updatedWateringDays,
    };
    setEntries(updatedEntries);
    localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {entries.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{entry.name}</h2>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={entry.watered}
                    onChange={(e) =>
                      updateEntry(index, "watered", e.target.checked)
                    }
                    className="form-checkbox h-4 w-4 text-primary"
                  />
                  <span className="ml-2 text-sm">Plant watered</span>
                </label>
              </div>
              <Image
                src={entry.image}
                alt={entry.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-2 rounded-lg"
              />
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Watering Days:
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {daysOfWeek.map((day, dayIndex) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={entry.wateringDays?.[dayIndex] || false}
                        onChange={() => updateWateringDay(index, dayIndex)}
                        className="form-checkbox h-4 w-4 text-primary"
                      />
                      <span className="ml-2 text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sunlight Requirement:
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={entry.sunlightRequirement}
                  onChange={(e) =>
                    updateEntry(
                      index,
                      "sunlightRequirement",
                      parseInt(e.target.value)
                    )
                  }
                  className="range range-primary range-sm"
                  step="1"
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>Inside</span>
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Outside</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
