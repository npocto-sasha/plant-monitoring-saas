import AsyncStorage from "@react-native-async-storage/async-storage";

const PLANTS_STORAGE_KEY = "plant-monitoring-saas:plants";
const DEVICES_STORAGE_KEY = "plant-monitoring-saas:devices";

export const localStorageService = {
  async getPlants() {
    const storedPlants = await AsyncStorage.getItem(PLANTS_STORAGE_KEY);
    return storedPlants ? JSON.parse(storedPlants) : null;
  },

  async savePlants(plants) {
    await AsyncStorage.setItem(PLANTS_STORAGE_KEY, JSON.stringify(plants));
  },

  async getDevices() {
    const storedDevices = await AsyncStorage.getItem(DEVICES_STORAGE_KEY);
    return storedDevices ? JSON.parse(storedDevices) : null;
  },

  async saveDevices(devices) {
    await AsyncStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(devices));
  },

  async resetDemoData() {
    await AsyncStorage.removeItem(PLANTS_STORAGE_KEY);
    await AsyncStorage.removeItem(DEVICES_STORAGE_KEY);
  },
};