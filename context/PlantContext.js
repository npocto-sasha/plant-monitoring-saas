import React, { createContext, useContext, useEffect, useState } from "react";
import { localStorageService } from "../storage/localStorageService";
import { mockPlants, mockDevices } from "../data/mockData";
import { API_CONFIG } from "../api/config";
import { plantApi } from "../api/plantApi";

const PlantContext = createContext();

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
      if (API_CONFIG.USE_BACKEND) {
        console.log("Loading plants from backend...");

        const backendPlants = await plantApi.getPlants();
        console.log("Backend plants:", backendPlants);

        const mappedPlants = backendPlants.map((plant) => ({
          id: String(plant.id),
          name: plant.name,
          type: plant.type || "Комнатное растение",
          location: plant.location || "Не указано",
          status: "normal",
          statusText: "Норма",
          deviceId: plant.devices?.[0]?.deviceCode || null,
          telemetry: {
            soilMoisture: plant.telemetry?.[0]?.soilMoisture || 0,
            temperature: plant.telemetry?.[0]?.temperature || 0,
            light: plant.telemetry?.[0]?.light || 0,
          },
          telemetryHistory: [],
          recommendation:
            "Данные растения загружены с backend. Рекомендации будут подключены следующим этапом.",
        }));

        setPlants(mappedPlants);
        setDevices(mockDevices);
        return;
      }

      const storedPlants = await localStorageService.getPlants();
      const storedDevices = await localStorageService.getDevices();

      if (storedPlants) {
        setPlants(storedPlants);
      }

      if (storedDevices) {
        setDevices(storedDevices);
      }
    } catch (error) {
      console.log("Failed to load stored data:", error);
    } finally {
      setIsLoaded(true);
    }
  }

  async function savePlants(nextPlants) {
    try {
      await localStorageService.savePlants(nextPlants);
    } catch (error) {
      console.log("Failed to save plants:", error);
    }
  }

  async function saveDevices(nextDevices) {
    try {
      await localStorageService.saveDevices(nextDevices);
    } catch (error) {
      console.log("Failed to save devices:", error);
    }
  }

  async function addPlant(plantData) {
    if (API_CONFIG.USE_BACKEND) {
      const createdPlant = await plantApi.createPlant({
        name: plantData.name,
        type: plantData.type || "Комнатное растение",
        location: plantData.location || "Не указано",
      });

      const newPlant = {
        id: String(createdPlant.id),
        name: createdPlant.name,
        type: createdPlant.type || "Комнатное растение",
        location: createdPlant.location || "Не указано",
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
          "Растение добавлено через backend. Для получения показателей подключите ESP32-устройство.",
      };

      setPlants((currentPlants) => [newPlant, ...currentPlants]);
      return;
    }

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
      await localStorageService.resetDemoData();
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