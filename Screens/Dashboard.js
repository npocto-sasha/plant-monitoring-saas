import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Components/Footer";
import { usePlants } from "../context/PlantContext";

export default function Dashboard() {
  const navigation = useNavigation();
  const { plants } = usePlants();

  function openPlant(plant) {
    navigation.navigate("Monitor", {
      plantId: plant.id,
      plantName: plant.name,
    });
  }

  const getStatusStyle = (status) => {
    if (status === "normal") return styles.statusNormal;
    if (status === "warning") return styles.statusWarning;
    if (status === "risk") return styles.statusRisk;
    return styles.statusNormal;
  };

  const PlantCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.plantName}>{item.name}</Text>
            <Text style={styles.plantMeta}>
              {item.type} · {item.location}
            </Text>
          </View>

          <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{item.statusText}</Text>
          </View>
        </View>

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

        <Text style={styles.recommendation}>{item.recommendation}</Text>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => openPlant(item)}
        >
          <Text style={styles.detailsButtonText}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Мои растения</Text>
              <Text style={styles.subtitle}>
                Мониторинг состояния растений и данных с ESP32
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddPlant")}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>   

        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlantCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
    height: Dimensions.get("screen").height - 83,
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
    paddingBottom: 24,
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
  plantName: {
    fontSize: 22,
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
  metricsRow: {
    flexDirection: "row",
    marginTop: 16,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#115FF9",
  },
  metricLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
  recommendation: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },
  detailsButton: {
    marginTop: 14,
    backgroundColor: "#115FF9",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#115FF9",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 32,
  },
});