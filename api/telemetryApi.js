export const telemetryApi = {
  async getPlantTelemetry(plantId) {
    throw new Error("telemetryApi.getPlantTelemetry is not connected to backend yet");
  },

  async getLatestTelemetry(plantId) {
    throw new Error("telemetryApi.getLatestTelemetry is not connected to backend yet");
  },

  async getTelemetryHistory(plantId, period = "day") {
    throw new Error("telemetryApi.getTelemetryHistory is not connected to backend yet");
  },
};