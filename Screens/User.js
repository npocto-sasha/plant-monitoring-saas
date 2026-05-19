import React, { useState } from "react";
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
import { useNotification } from "../context/NotificationContext";

export default function User() {
  const { plants, devices, resetDemoData } = usePlants();
  const { showNotification } = useNotification();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  async function handleResetDemoData() {
    await resetDemoData();
    setShowResetConfirm(false);
    showNotification("Демо-данные сброшены.", "success");
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

          {showResetConfirm ? (
            <View style={styles.confirmBox}>
              <Text style={styles.confirmTitle}>Подтвердите сброс</Text>
              <Text style={styles.confirmText}>
                Все добавленные растения и устройства будут удалены. Будут восстановлены
                исходные демо-данные.
              </Text>

              <View style={styles.confirmActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowResetConfirm(false)}
                >
                  <Text style={styles.cancelButtonText}>Отмена</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleResetDemoData}
                >
                  <Text style={styles.confirmButtonText}>Сбросить</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setShowResetConfirm(true)}
            >
              <Text style={styles.resetButtonText}>Сбросить демо-данные</Text>
            </TouchableOpacity>
          )}
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
  confirmBox: {
  marginTop: 16,
  backgroundColor: "#FFF3CD",
  borderRadius: 14,
  padding: 14,
  },
  confirmTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16213E",
  },
  confirmText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
  confirmActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#F8D7DA",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#842029",
    fontSize: 15,
    fontWeight: "700",
  },
});