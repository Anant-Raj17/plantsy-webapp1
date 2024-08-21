"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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
  const [showToast, setShowToast] = useState(false);
  const [plantsToWater, setPlantsToWater] = useState<string[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantEntry | null>(null);
  const dbRef = useRef<IDBDatabase | null>(null);

  const updateOverallStreak = useCallback((updatedEntries: PlantEntry[]) => {
    const minStreak =
      updatedEntries.length > 0
        ? Math.min(...updatedEntries.map((entry) => entry.streak))
        : 0;
    setOverallStreak(minStreak);
  }, []);

  const openDB = useCallback(() => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("PlantJournalDB", 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        dbRef.current = request.result;
        resolve(request.result);
      };
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore("plants", { keyPath: "name" });
      };
    });
  }, []);

  const getEntries = useCallback(async () => {
    const db = dbRef.current || (await openDB());
    return new Promise<PlantEntry[]>((resolve, reject) => {
      const transaction = db.transaction("plants", "readonly");
      const store = transaction.objectStore("plants");
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }, [openDB]);

  const saveEntries = useCallback(
    async (entriesToSave: PlantEntry[]) => {
      const db = dbRef.current || (await openDB());
      const transaction = db.transaction("plants", "readwrite");
      const store = transaction.objectStore("plants");
      entriesToSave.forEach((entry) => store.put(entry));
      return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    },
    [openDB]
  );

  useEffect(() => {
    const loadEntries = async () => {
      try {
        await openDB();
        const loadedEntries = await getEntries();
        setEntries(loadedEntries);
        updateOverallStreak(loadedEntries);
      } catch (error) {
        console.error("Error loading entries:", error);
      }
    };
    loadEntries();
  }, [openDB, getEntries, updateOverallStreak]);

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
      saveEntries(updatedEntries);
      updateOverallStreak(updatedEntries);
      return updatedEntries;
    });
  }, [saveEntries, updateOverallStreak]);

  useEffect(() => {
    checkStreaks();
    const interval = setInterval(checkStreaks, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [checkStreaks]);

  useEffect(() => {
    const checkWateringDays = () => {
      const today = new Date().getDay();
      const plantsNeedingWater = entries
        .filter((entry) => entry.wateringDays[today] && !entry.watered)
        .map((entry) => entry.name);
      setPlantsToWater(plantsNeedingWater);
      setShowToast(plantsNeedingWater.length > 0);
    };
    checkWateringDays();
    const interval = setInterval(checkWateringDays, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [entries]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof window !== "undefined") {
            const img = new window.Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const scaleFactor = Math.min(
                1,
                300 / Math.max(img.width, img.height)
              );
              canvas.width = img.width * scaleFactor;
              canvas.height = img.height * scaleFactor;
              ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
              setNewPlantImage(canvas.toDataURL("image/jpeg", 0.8));
            };
            img.src = reader.result as string;
          } else {
            // Handle server-side or non-browser environment
            setNewPlantImage(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setNewPlantImage(null);
      }
    },
    []
  );

  const addEntry = useCallback(async () => {
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
      const updatedEntries = [...entries, newEntry];
      await saveEntries(updatedEntries);
      setEntries(updatedEntries);
      updateOverallStreak(updatedEntries);
      setNewPlantImage(null);
      setNewPlantName("");
    }
  }, [newPlantImage, newPlantName, entries, saveEntries, updateOverallStreak]);

  const updateEntry = useCallback(
    async (name: string, field: keyof PlantEntry, value: any) => {
      setEntries((prevEntries) => {
        const updatedEntries = prevEntries.map((entry) =>
          entry.name === name ? { ...entry, [field]: value } : entry
        );
        if (field === "watered" && value === true) {
          const today = new Date().toDateString();
          const updatedEntry = updatedEntries.find((e) => e.name === name);
          if (updatedEntry && updatedEntry.lastWateredDate !== today) {
            updatedEntry.streak += 1;
            updatedEntry.lastWateredDate = today;
          }
        }
        saveEntries(updatedEntries);
        updateOverallStreak(updatedEntries);
        return updatedEntries;
      });
    },
    [saveEntries, updateOverallStreak]
  );

  const updateWateringDay = useCallback(
    async (name: string, dayIndex: number) => {
      setEntries((prevEntries) => {
        const updatedEntries = prevEntries.map((entry) =>
          entry.name === name
            ? {
                ...entry,
                wateringDays: entry.wateringDays.map((day, i) =>
                  i === dayIndex ? !day : day
                ),
              }
            : entry
        );
        saveEntries(updatedEntries);
        return updatedEntries;
      });
    },
    [saveEntries]
  );

  const PlantCard = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    const index = rowIndex * 3 + columnIndex;
    const entry = entries[index];
    if (!entry) return null;

    return (
      <div
        style={{
          ...style,
          left: `${parseInt(style.left as string) + 8}px`,
          top: `${parseInt(style.top as string) + 8}px`,
          width: `${parseInt(style.width as string) - 16}px`,
          height: `${parseInt(style.height as string) - 16}px`,
        }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body p-2 flex flex-col items-center justify-between">
          <h3 className="card-title text-sm">{entry.name}</h3>
          <div className="relative w-16 h-16">
            <Image
              src={entry.image}
              alt={entry.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-xs mr-2">Watered</span>
                <input
                  type="checkbox"
                  checked={entry.watered}
                  onChange={(e) =>
                    updateEntry(entry.name, "watered", e.target.checked)
                  }
                  className="checkbox checkbox-xs checkbox-primary"
                />
              </label>
            </div>
            <button
              className="btn btn-xs btn-primary"
              onClick={() => setSelectedPlant(entry)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-primary">
              <div>
                <span>Plants to water today: {plantsToWater.join(", ")}</span>
              </div>
              <div className="flex-none">
                <button
                  onClick={() => setShowToast(false)}
                  className="btn btn-sm btn-circle"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold mb-6 text-center">
          Plant Care Journal
        </h1>
        <p className="text-xl mb-6 text-center">
          Overall Streak: {overallStreak} days
        </p>

        <div className="max-w-md mx-auto mb-8 p-6 bg-base-200 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add New Plant
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center">
              {newPlantImage ? (
                <Image
                  src={newPlantImage}
                  alt="New plant"
                  width={128}
                  height={128}
                />
              ) : (
                <label className="cursor-pointer text-center">
                  <span>Click to upload image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            <input
              type="text"
              value={newPlantName}
              onChange={(e) => setNewPlantName(e.target.value)}
              placeholder="Enter plant name"
              className="input input-bordered w-full max-w-xs"
            />
            <button
              onClick={addEntry}
              className="btn btn-primary w-full max-w-xs"
            >
              Add Plant
            </button>
          </div>
        </div>

        <div style={{ height: "calc(100vh - 400px)", width: "70%" }}>
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                columnCount={3}
                columnWidth={width / 3}
                height={height}
                rowCount={Math.ceil(entries.length / 3)}
                rowHeight={180}
                width={width}
              >
                {PlantCard}
              </Grid>
            )}
          </AutoSizer>
        </div>

        {selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-center mb-4">
                {selectedPlant.name}
              </h2>
              <Image
                src={selectedPlant.image}
                alt={selectedPlant.name}
                width={200}
                height={200}
                className="mx-auto rounded-lg"
              />
              <div className="mt-4">
                <p className="font-semibold">Watering Days:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {daysOfWeek.map((day, dayIndex) => (
                    <label
                      key={dayIndex}
                      className="flex items-center space-x-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlant.wateringDays[dayIndex]}
                        onChange={() =>
                          updateWateringDay(selectedPlant.name, dayIndex)
                        }
                        className="checkbox checkbox-xs checkbox-primary"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-1">Sunlight Requirement:</p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={selectedPlant.sunlightRequirement}
                  onChange={(e) =>
                    updateEntry(
                      selectedPlant.name,
                      "sunlightRequirement",
                      parseInt(e.target.value)
                    )
                  }
                  className="range range-primary range-xs"
                  step="1"
                />
                <div className="flex justify-between text-xs">
                  <span>Inside</span>
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Outside</span>
                </div>
              </div>
              <p className="mt-4">Streak: {selectedPlant.streak} days</p>
              <button
                className="btn btn-primary w-full mt-4"
                onClick={() => setSelectedPlant(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
