import React, { createContext, useContext, useState } from "react";
import { mockPlants } from "../data/mockData";

const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState(mockPlants);

  function addPlant(plantData) {
    const newPlant = {
      id: `plant-${Date.now()}`,
      name: plantData.name,
      type: plantData.type || "Комнатное растение",
      location: plantData.location || "Не указано",
      status: "normal",
      statusText: "Норма",
      deviceId: null,
      telemetry: {
        soilMoisture: 0,
        temperature: 0,
        light: 0,
      },
      recommendation:
        "Растение добавлено. Для получения показателей подключите ESP32-устройство.",
    };

    setPlants((currentPlants) => [newPlant, ...currentPlants]);
  }

  function getPlantById(plantId) {
    return plants.find((plant) => plant.id === plantId);
  }

  return (
    <PlantContext.Provider value={{ plants, addPlant, getPlantById }}>
      {children}
    </PlantContext.Provider>
  );
}

export function usePlants() {
  const context = useContext(PlantContext);

  if (!context) {
    throw new Error("usePlants must be used inside PlantProvider");
  }

  return context;
}