import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Footer from "../Components/Footer";
import { usePlants } from "../context/PlantContext";
import { useNotification } from "../context/NotificationContext";

export default function Devices() {
  const { plants, devices, addDevice, getDevicePlant } = usePlants();
  const { showNotification } = useNotification();

  const [showForm, setShowForm] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const [selectedPlantId, setSelectedPlantId] = useState(
    plants[0] ? plants[0].id : ""
  );

  function saveDevice() {
    if (!deviceName.trim()) {
      showNotification("Введите название устройства", "error");
      return;
    }

    if (!deviceCode.trim()) {
      showNotification("Введите Device ID устройства", "error");
      return;
    }

    if (!selectedPlantId) {
      showNotification("Выберите растение для привязки", "error");
      return;
    }

    addDevice({
      name: deviceName.trim(),
      deviceCode: deviceCode.trim(),
      plantId: selectedPlantId,
    });

    setDeviceName("");
    setDeviceCode("");
    setSelectedPlantId(plants[0] ? plants[0].id : "");
    setShowForm(false);

    showNotification(
      "Устройство добавлено и привязано к растению.",
      "success"
    );
  }

  const DeviceCard = ({ item }) => {
    const plant = getDevicePlant(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleBlock}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceCode}>{item.deviceCode}</Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.statusText}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Привязано к растению</Text>
          <Text style={styles.infoValue}>
            {plant ? plant.name : "Растение не найдено"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Последняя синхронизация</Text>
          <Text style={styles.infoValue}>{item.lastSync}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Устройства ESP32</Text>
            <Text style={styles.subtitle}>
              Добавляйте контроллеры ESP32 и привязывайте их к растениям для
              получения данных с датчиков.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm((current) => !current)}
          >
            <Text style={styles.addButtonText}>{showForm ? "×" : "+"}</Text>
          </TouchableOpacity>
        </View>

        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Добавить устройство</Text>

            <Text style={styles.label}>Название устройства</Text>
            <TextInput
              style={styles.input}
              placeholder="Например, ESP32 у фикуса"
              value={deviceName}
              onChangeText={setDeviceName}
            />

            <Text style={styles.label}>Device ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Например, esp32-003"
              value={deviceCode}
              onChangeText={setDeviceCode}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Привязать к растению</Text>

            <View style={styles.plantsList}>
              {plants.map((plant) => (
                <TouchableOpacity
                  key={plant.id}
                  style={[
                    styles.plantOption,
                    selectedPlantId === plant.id && styles.plantOptionActive,
                  ]}
                  onPress={() => setSelectedPlantId(plant.id)}
                >
                  <Text
                    style={[
                      styles.plantOptionText,
                      selectedPlantId === plant.id &&
                        styles.plantOptionTextActive,
                    ]}
                  >
                    {plant.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveDevice}>
              <Text style={styles.saveButtonText}>Сохранить устройство</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DeviceCard item={item} />}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Устройства не добавлены</Text>
              <Text style={styles.emptyText}>
                Добавьте ESP32-устройство и привяжите его к растению.
              </Text>
            </View>
          }
        />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  headerText: {
    flex: 1,
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
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 34,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  formTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#16213E",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F4F7FB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#16213E",
  },
  plantsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  plantOption: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F4F7FB",
  },
  plantOptionActive: {
    backgroundColor: "#115FF9",
  },
  plantOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  plantOptionTextActive: {
    color: "#FFFFFF",
  },
  saveButton: {
    marginTop: 18,
    backgroundColor: "#115FF9",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
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
  deviceName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#16213E",
  },
  deviceCode: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#DFF7E8",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16213E",
  },
  infoRow: {
    marginTop: 14,
    backgroundColor: "#F4F7FB",
    borderRadius: 14,
    padding: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  infoValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: "#16213E",
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