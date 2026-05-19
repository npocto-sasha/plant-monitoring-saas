export const mockPlants = [
  {
    id: "plant-1",
    name: "Фикус",
    type: "Комнатное растение",
    location: "Подоконник",
    status: "normal",
    statusText: "Норма",
    deviceId: "esp32-001",
    telemetry: {
      soilMoisture: 42,
      temperature: 23.5,
      light: 680,
    },
    telemetryHistory: [
      {
        time: "10:00",
        soilMoisture: 48,
        temperature: 22.8,
        light: 620,
      },
      {
        time: "12:00",
        soilMoisture: 45,
        temperature: 23.1,
        light: 650,
      },
      {
        time: "14:00",
        soilMoisture: 42,
        temperature: 23.5,
        light: 680,
      },
    ],
    recommendation: "Показатели в норме. Продолжайте обычный уход.",
  },
  {
    id: "plant-2",
    name: "Монстера",
    type: "Декоративное растение",
    location: "Гостиная",
    status: "warning",
    statusText: "Предупреждение",
    deviceId: "esp32-002",
    telemetry: {
      soilMoisture: 24,
      temperature: 21.2,
      light: 310,
    },
    telemetryHistory: [
      {
        time: "10:00",
        soilMoisture: 33,
        temperature: 21.0,
        light: 290,
      },
      {
        time: "12:00",
        soilMoisture: 28,
        temperature: 21.1,
        light: 305,
      },
      {
        time: "14:00",
        soilMoisture: 24,
        temperature: 21.2,
        light: 310,
      },
    ],
    recommendation: "Почва слишком сухая. Возможно, растение нужно полить.",
  },
  {
    id: "plant-3",
    name: "Сансевиерия",
    type: "Суккулент",
    location: "Рабочий стол",
    status: "risk",
    statusText: "Риск",
    deviceId: null,
    telemetry: {
      soilMoisture: 18,
      temperature: 16.4,
      light: 190,
    },
    telemetryHistory: [
      {
        time: "10:00",
        soilMoisture: 25,
        temperature: 17.2,
        light: 240,
      },
      {
        time: "12:00",
        soilMoisture: 21,
        temperature: 16.8,
        light: 210,
      },
      {
        time: "14:00",
        soilMoisture: 18,
        temperature: 16.4,
        light: 190,
      },
    ],
    recommendation:
      "Обнаружены неблагоприятные условия: низкая температура и недостаточная освещенность.",
  },
];

export const mockDevices = [
  {
    id: "device-1",
    name: "ESP32 у фикуса",
    deviceCode: "esp32-001",
    plantId: "plant-1",
    status: "active",
    statusText: "Активно",
    lastSync: "18.05.2026 14:30",
  },
  {
    id: "device-2",
    name: "ESP32 у монстеры",
    deviceCode: "esp32-002",
    plantId: "plant-2",
    status: "active",
    statusText: "Активно",
    lastSync: "18.05.2026 13:45",
  },
];