"use client";

import { useState, useEffect, useCallback } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";

interface PlantEntry {
  name: string;
  image: string;
  wateringDays: boolean[];
  sunlightRequirement: number;
  watered: boolean;
  streak: number;
  lastWateredDate: string | null;
}

export default function Journal() {
  const [entries, setEntries] = useState<PlantEntry[]>([]);
  const [newPlantImage, setNewPlantImage] = useState<string | null>(null);
  const [newPlantName, setNewPlantName] = useState("");
  const [overallStreak, setOverallStreak] = useState(0);

  const updateOverallStreak = useCallback((updatedEntries: PlantEntry[]) => {
    if (updatedEntries.length === 0) {
      setOverallStreak(0);
    } else {
      const minStreak = Math.min(
        ...updatedEntries.map((entry) => entry.streak)
      );
      setOverallStreak(minStreak);
    }
  }, []);

  useEffect(() => {
    const savedEntries = localStorage.getItem("plantJournal");
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        if (Array.isArray(parsedEntries)) {
          const validatedEntries = parsedEntries.map((entry: PlantEntry) => ({
            ...entry,
            wateringDays: Array.isArray(entry.wateringDays)
              ? entry.wateringDays
              : [false, false, false, false, false, false, false],
            watered: entry.watered || false,
            sunlightRequirement: entry.sunlightRequirement || 1,
            streak: entry.streak || 0,
            lastWateredDate: entry.lastWateredDate || null,
          }));
          setEntries(validatedEntries);
          updateOverallStreak(validatedEntries);
        }
      } catch (error) {
        console.error("Error parsing saved entries:", error);
      }
    }
  }, [updateOverallStreak]);

  const checkStreaks = useCallback(() => {
    const today = new Date().toDateString();
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.map((entry) => {
        if (entry.watered && entry.lastWateredDate === today) {
          return entry;
        }
        if (entry.lastWateredDate && entry.lastWateredDate !== today) {
          const lastWateredDate = new Date(entry.lastWateredDate);
          const daysSinceLastWatered = Math.floor(
            (new Date().getTime() - lastWateredDate.getTime()) /
              (1000 * 3600 * 24)
          );
          if (daysSinceLastWatered > 1) {
            return { ...entry, streak: 0, watered: false };
          }
        }
        return { ...entry, watered: false };
      });
      localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
      updateOverallStreak(updatedEntries);
      return updatedEntries;
    });
  }, [updateOverallStreak]);

  useEffect(() => {
    checkStreaks();
    const interval = setInterval(checkStreaks, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [checkStreaks]);

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
        streak: 0,
        lastWateredDate: null,
      };
      setEntries((prevEntries) => {
        const updatedEntries = [...prevEntries, newEntry];
        localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
        updateOverallStreak(updatedEntries);
        return updatedEntries;
      });
      setNewPlantImage(null);
      setNewPlantName("");
    }
  };

  const updateEntry = (index: number, field: keyof PlantEntry, value: any) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      if (field === "watered" && value === true) {
        const today = new Date().toDateString();
        if (updatedEntries[index].lastWateredDate !== today) {
          updatedEntries[index] = {
            ...updatedEntries[index],
            [field]: value,
            streak: updatedEntries[index].streak + 1,
            lastWateredDate: today,
          };
        }
      } else {
        updatedEntries[index] = { ...updatedEntries[index], [field]: value };
      }
      localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
      updateOverallStreak(updatedEntries);
      return updatedEntries;
    });
  };

  const updateWateringDay = (index: number, dayIndex: number) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      const updatedWateringDays = [
        ...(updatedEntries[index].wateringDays || [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ]),
      ];
      updatedWateringDays[dayIndex] = !updatedWateringDays[dayIndex];
      updatedEntries[index] = {
        ...updatedEntries[index],
        wateringDays: updatedWateringDays,
      };
      localStorage.setItem("plantJournal", JSON.stringify(updatedEntries));
      return updatedEntries;
    });
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-8 px-4 relative">
        <div className="absolute top-0 left-0 bg-primary text-white px-4 py-2 rounded-lg">
          Overall Streak: {overallStreak} days
        </div>
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
                className="rounded-lg object-cover w-full h-full"
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
            name="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            type="text"
            id="newPlantName"
            name="newPlantName"
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
                    id={`watered-${index}`}
                    name={`watered-${index}`}
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
                        id={`wateringDay-${index}-${dayIndex}`}
                        name={`wateringDay-${index}-${dayIndex}`}
                        checked={entry.wateringDays[dayIndex]}
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
                  id={`sunlight-${index}`}
                  name={`sunlight-${index}`}
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
    </>
  );
}
