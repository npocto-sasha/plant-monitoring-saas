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

  function buildRecommendations(plantsList) {
    const recommendations = [];

    plantsList.forEach((plant) => {
      if (!plant.deviceId) {
        recommendations.push({
          id: `${plant.id}-device`,
          plantId: plant.id,
          plantName: plant.name,
          severity: "info",
          title: "Устройство не подключено",
          message:
            "Для получения показателей с датчиков необходимо подключить ESP32-устройство к растению.",
          metric: "ESP32",
          value: "Не подключено",
          advice: "Добавьте устройство и привяжите его к растению.",
        });

        return;
      }

      if (plant.telemetry.soilMoisture < 30) {
        recommendations.push({
          id: `${plant.id}-soil`,
          plantId: plant.id,
          plantName: plant.name,
          severity: plant.telemetry.soilMoisture < 20 ? "risk" : "warning",
          title: "Низкая влажность почвы",
          message:
            "Почва может быть слишком сухой. Растению может потребоваться полив.",
          metric: "Влажность почвы",
          value: `${plant.telemetry.soilMoisture}%`,
          advice: "Проверьте состояние почвы и при необходимости полейте растение.",
        });
      }

      if (plant.telemetry.temperature < 18) {
        recommendations.push({
          id: `${plant.id}-temperature`,
          plantId: plant.id,
          plantName: plant.name,
          severity: plant.telemetry.temperature < 16 ? "risk" : "warning",
          title: "Температура ниже нормы",
          message:
            "Температура воздуха может быть недостаточной для комфортного роста растения.",
          metric: "Температура",
          value: `${plant.telemetry.temperature}°C`,
          advice:
            "Переставьте растение в более теплое место или проверьте условия в помещении.",
        });
      }

      if (plant.telemetry.light < 300) {
        recommendations.push({
          id: `${plant.id}-light`,
          plantId: plant.id,
          plantName: plant.name,
          severity: plant.telemetry.light < 200 ? "risk" : "warning",
          title: "Недостаточная освещенность",
          message:
            "Растение может получать недостаточно света для нормального развития.",
          metric: "Освещенность",
          value: `${plant.telemetry.light} lx`,
          advice:
            "Переставьте растение ближе к источнику света или используйте дополнительное освещение.",
        });
      }

      if (
        plant.deviceId &&
        plant.telemetry.soilMoisture >= 30 &&
        plant.telemetry.temperature >= 18 &&
        plant.telemetry.light >= 300
      ) {
        recommendations.push({
          id: `${plant.id}-normal`,
          plantId: plant.id,
          plantName: plant.name,
          severity: "normal",
          title: "Показатели в норме",
          message:
            "Критических отклонений по основным показателям не обнаружено.",
          metric: "Общее состояние",
          value: "Норма",
          advice: "Продолжайте обычный уход за растением.",
        });
      }
    });

    return recommendations;
  }

  const recommendations = buildRecommendations(plants);

  const getSeverityStyle = (severity) => {
    if (severity === "normal") return styles.normalBadge;
    if (severity === "warning") return styles.warningBadge;
    if (severity === "risk") return styles.riskBadge;
    return styles.infoBadge;
  };

  const getSeverityText = (severity) => {
    if (severity === "normal") return "Норма";
    if (severity === "warning") return "Предупреждение";
    if (severity === "risk") return "Риск";
    return "Информация";
  };

  const RecommendationCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Monitor", {
            plantId: item.plantId,
            plantName: item.plantName,
          })
        }
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleBlock}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.plantName}>{item.plantName}</Text>
          </View>

          <View style={[styles.badge, getSeverityStyle(item.severity)]}>
            <Text style={styles.badgeText}>{getSeverityText(item.severity)}</Text>
          </View>
        </View>

        <Text style={styles.message}>{item.message}</Text>

        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>{item.metric}</Text>
          <Text style={styles.metricValue}>{item.value}</Text>
        </View>

        <View style={styles.adviceBox}>
          <Text style={styles.adviceTitle}>Рекомендация</Text>
          <Text style={styles.adviceText}>{item.advice}</Text>
        </View>

        <Text style={styles.detailsHint}>Нажмите, чтобы открыть растение</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Советы</Text>
          <Text style={styles.subtitle}>
            Аналитические рекомендации, сформированные на основе показателей
            датчиков и состояния подключенных устройств.
          </Text>
        </View>

        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecommendationCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Советов пока нет</Text>
              <Text style={styles.emptyText}>
                Добавьте растение и подключите ESP32-устройство, чтобы система
                могла сформировать рекомендации.
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16213E",
  },
  plantName: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  badge: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  normalBadge: {
    backgroundColor: "#DFF7E8",
  },
  warningBadge: {
    backgroundColor: "#FFF3CD",
  },
  riskBadge: {
    backgroundColor: "#F8D7DA",
  },
  infoBadge: {
    backgroundColor: "#E5EDFD",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16213E",
  },
  message: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
  metricBox: {
    marginTop: 14,
    backgroundColor: "#F4F7FB",
    borderRadius: 14,
    padding: 12,
  },
  metricLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  metricValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: "#115FF9",
  },
  adviceBox: {
    marginTop: 12,
    backgroundColor: "#EEF4FF",
    borderRadius: 14,
    padding: 12,
  },
  adviceTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16213E",
  },
  adviceText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
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