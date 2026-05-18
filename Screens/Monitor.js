import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { mockPlants } from "../data/mockData";

export default function Monitor({ route }) {
  const plantId = route?.params?.plantId;
  const plant = mockPlants.find((item) => item.id === plantId) || mockPlants[0];

  const getStatusText = () => {
    if (plant.status === "normal") return "Состояние растения в норме";
    if (plant.status === "warning") return "Требуется внимание";
    if (plant.status === "risk") return "Высокий риск";
    return "Нет данных";
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>{plant.name}</Text>
        <Text style={styles.subtitle}>
          {plant.type} · {plant.location}
        </Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Текущий статус</Text>
          <Text style={styles.statusValue}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Показатели датчиков</Text>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Влажность почвы</Text>
          <Text style={styles.metricValue}>
            {plant.telemetry.soilMoisture}%
          </Text>
          <Text style={styles.metricHint}>
            Определяет необходимость полива растения.
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Температура воздуха</Text>
          <Text style={styles.metricValue}>
            {plant.telemetry.temperature}°C
          </Text>
          <Text style={styles.metricHint}>
            Помогает определить, находится ли растение в комфортных условиях.
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Освещенность</Text>
          <Text style={styles.metricValue}>{plant.telemetry.light} lx</Text>
          <Text style={styles.metricHint}>
            Показывает, достаточно ли света получает растение.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Рекомендация</Text>
        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationText}>{plant.recommendation}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Устройство</Text>
        <View style={styles.deviceCard}>
          <Text style={styles.deviceLabel}>ESP32</Text>
          <Text style={styles.deviceValue}>
            {plant.deviceId ? plant.deviceId : "Устройство не подключено"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#16213E",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
  },
  statusBox: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: "#EEF4FF",
    padding: 14,
  },
  statusLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  statusValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: "#115FF9",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16213E",
    marginBottom: 10,
  },
  metricCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  metricValue: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: "700",
    color: "#115FF9",
  },
  metricHint: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },
  recommendationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  recommendationText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
  deviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  deviceLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  deviceValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#16213E",
  },
});