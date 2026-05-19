import React, { createContext, useContext, useState } from "react";
import { mockPlants, mockDevices } from "../data/mockData";

const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState(mockPlants);
  const [devices, setDevices] = useState(mockDevices);

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

  function addDevice(deviceData) {
    const newDevice = {
      id: `device-${Date.now()}`,
      name: deviceData.name,
      deviceCode: deviceData.deviceCode,
      plantId: deviceData.plantId,
      status: "active",
      statusText: "Активно",
      lastSync: "Нет данных",
    };

    setDevices((currentDevices) => [newDevice, ...currentDevices]);

    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === deviceData.plantId
          ? {
              ...plant,
              deviceId: deviceData.deviceCode,
              recommendation:
                "Устройство подключено. Ожидается получение первых данных с датчиков.",
            }
          : plant
      )
    );
  }

  function getPlantById(plantId) {
    return plants.find((plant) => plant.id === plantId);
  }

  function getDeviceById(deviceId) {
    return devices.find((device) => device.id === deviceId);
  }

  function getDevicePlant(device) {
    return plants.find((plant) => plant.id === device.plantId);
  }

  return (
    <PlantContext.Provider
      value={{
        plants,
        devices,
        addPlant,
        addDevice,
        getPlantById,
        getDeviceById,
        getDevicePlant,
      }}
    >
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