import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Footer from "../Components/Footer";
import { usePlants } from "../context/PlantContext";

export default function User() {
  const { plants, devices, resetDemoData } = usePlants();

  function showMessage(message) {
    if (typeof window !== "undefined") {
      window.alert(message);
      return;
    }

    Alert.alert("Готово", message);
  }

  function handleResetDemoData() {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        "Сбросить демо-данные? Все добавленные растения и устройства будут удалены."
      );

      if (!confirmed) {
        return;
      }

      resetDemoData();
      window.alert("Демо-данные сброшены.");
      return;
    }

    Alert.alert(
      "Сбросить демо-данные?",
      "Все добавленные растения и устройства будут удалены.",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Сбросить",
          style: "destructive",
          onPress: () => {
            resetDemoData();
            showMessage("Демо-данные сброшены.");
          },
        },
      ]
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
          <Text style={styles.subtitle}>
            Настройки прототипа и информация о локальных данных приложения.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Режим прототипа</Text>
          <Text style={styles.cardText}>
            Авторизация временно отключена. Данные растений и устройств
            сохраняются локально на устройстве через AsyncStorage.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{plants.length}</Text>
            <Text style={styles.statLabel}>Растений</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{devices.length}</Text>
            <Text style={styles.statLabel}>Устройств</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Демо-данные</Text>
          <Text style={styles.cardText}>
            Используйте сброс, если нужно вернуть начальное состояние проекта:
            тестовые растения, устройства ESP32, историю измерений, графики и
            рекомендации.
          </Text>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetDemoData}
          >
            <Text style={styles.resetButtonText}>Сбросить демо-данные</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Следующий этап</Text>
          <Text style={styles.cardText}>
            Позже локальное хранение будет заменено на backend API: растения,
            устройства и телеметрия будут загружаться с сервера.
          </Text>
        </View>
      </ScrollView>

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
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16213E",
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  statValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#115FF9",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  resetButton: {
    marginTop: 16,
    backgroundColor: "#F8D7DA",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#842029",
    fontSize: 16,
    fontWeight: "700",
  },
});