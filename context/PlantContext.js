import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockPlants, mockDevices } from "../data/mockData";

const PlantContext = createContext();

const PLANTS_STORAGE_KEY = "plant-monitoring-saas:plants";
const DEVICES_STORAGE_KEY = "plant-monitoring-saas:devices";

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState(mockPlants);
  const [devices, setDevices] = useState(mockDevices);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      savePlants(plants);
    }
  }, [plants, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveDevices(devices);
    }
  }, [devices, isLoaded]);

  async function loadStoredData() {
    try {
      const storedPlants = await AsyncStorage.getItem(PLANTS_STORAGE_KEY);
      const storedDevices = await AsyncStorage.getItem(DEVICES_STORAGE_KEY);

      if (storedPlants) {
        setPlants(JSON.parse(storedPlants));
      }

      if (storedDevices) {
        setDevices(JSON.parse(storedDevices));
      }
    } catch (error) {
      console.log("Failed to load stored data:", error);
    } finally {
      setIsLoaded(true);
    }
  }

  async function savePlants(nextPlants) {
    try {
      await AsyncStorage.setItem(
        PLANTS_STORAGE_KEY,
        JSON.stringify(nextPlants)
      );
    } catch (error) {
      console.log("Failed to save plants:", error);
    }
  }

  async function saveDevices(nextDevices) {
    try {
      await AsyncStorage.setItem(
        DEVICES_STORAGE_KEY,
        JSON.stringify(nextDevices)
      );
    } catch (error) {
      console.log("Failed to save devices:", error);
    }
  }

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
      telemetryHistory: [],
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

  async function resetDemoData() {
    try {
      await AsyncStorage.removeItem(PLANTS_STORAGE_KEY);
      await AsyncStorage.removeItem(DEVICES_STORAGE_KEY);
      setPlants(mockPlants);
      setDevices(mockDevices);
    } catch (error) {
      console.log("Failed to reset demo data:", error);
    }
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
        isLoaded,
        addPlant,
        addDevice,
        resetDemoData,
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