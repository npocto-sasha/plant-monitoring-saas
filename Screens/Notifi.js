import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Footer from "../Components/Footer";
import { usePlants } from "../context/PlantContext";

export default function Notifi({ navigation }) {
  const { plants } = usePlants();

  const getStatusStyle = (status) => {
    if (status === "normal") return styles.statusNormal;
    if (status === "warning") return styles.statusWarning;
    if (status === "risk") return styles.statusRisk;
    return styles.statusNormal;
  };

  const getStatusTitle = (status) => {
    if (status === "normal") return "Норма";
    if (status === "warning") return "Предупреждение";
    if (status === "risk") return "Риск";
    return "Нет данных";
  };

  const RecommendationCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Monitor", {
            plantId: item.id,
            plantName: item.name,
          })
        }
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleBlock}>
            <Text style={styles.plantName}>{item.name}</Text>
            <Text style={styles.plantMeta}>
              {item.type} · {item.location}
            </Text>
          </View>

          <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{getStatusTitle(item.status)}</Text>
          </View>
        </View>

        <Text style={styles.recommendationText}>{item.recommendation}</Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>
              {item.telemetry.soilMoisture}%
            </Text>
            <Text style={styles.metricLabel}>Влажность</Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>
              {item.telemetry.temperature}°C
            </Text>
            <Text style={styles.metricLabel}>Температура</Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{item.telemetry.light} lx</Text>
            <Text style={styles.metricLabel}>Свет</Text>
          </View>
        </View>

        <Text style={styles.detailsHint}>
          Нажмите, чтобы открыть карточку растения
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Рекомендации</Text>
          <Text style={styles.subtitle}>
            Система анализирует показатели датчиков и формирует подсказки по
            уходу за растениями.
          </Text>
        </View>

        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecommendationCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Рекомендаций пока нет</Text>
              <Text style={styles.emptyText}>
                Добавьте растение и подключите ESP32-устройство, чтобы система
                могла анализировать показатели.
              </Text>
            </View>
          }
        />
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 16,
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
    lineHeight: 21,
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  cardTitleBlock: {
    flex: 1,
  },
  plantName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#16213E",
  },
  plantMeta: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  statusNormal: {
    backgroundColor: "#DFF7E8",
  },
  statusWarning: {
    backgroundColor: "#FFF3CD",
  },
  statusRisk: {
    backgroundColor: "#F8D7DA",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16213E",
  },
  recommendationText: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
  metricsRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
  },
  metricBox: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#115FF9",
  },
  metricLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
  detailsHint: {
    marginTop: 12,
    fontSize: 13,
    color: "#115FF9",
    fontWeight: "600",
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16213E",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
  },
});