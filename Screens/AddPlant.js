import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function AddPlant({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

function savePlant() {
  if (!name.trim()) {
    if (typeof window !== "undefined") {
      window.alert("Ошибка: введите название растения");
    } else {
      Alert.alert("Ошибка", "Введите название растения");
    }
    return;
  }

  if (typeof window !== "undefined") {
    window.alert(
      "Растение добавлено. В прототипе данные пока не сохраняются на сервере."
    );
    navigation.navigate("Dashboard");
    return;
  }

  Alert.alert(
    "Растение добавлено",
    "В прототипе данные пока не сохраняются на сервере.",
    [
      {
        text: "ОК",
        onPress: () => navigation.navigate("Dashboard"),
      },
    ]
  );
}

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Добавить растение</Text>
      <Text style={styles.subtitle}>
        Укажите основные данные растения, чтобы в дальнейшем привязать к нему
        ESP32-устройство и получать показатели с датчиков.
      </Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Название растения</Text>
        <TextInput
          style={styles.input}
          placeholder="Например, Фикус"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Тип растения</Text>
        <TextInput
          style={styles.input}
          placeholder="Например, комнатное растение"
          value={type}
          onChangeText={setType}
        />

        <Text style={styles.label}>Местоположение</Text>
        <TextInput
          style={styles.input}
          placeholder="Например, подоконник"
          value={location}
          onChangeText={setLocation}
        />

        <TouchableOpacity style={styles.button} onPress={savePlant}>
          <Text style={styles.buttonText}>Сохранить растение</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Что будет дальше?</Text>
        <Text style={styles.infoText}>
          После добавления растения пользователь сможет привязать к нему
          устройство ESP32, получать данные о влажности почвы, температуре и
          освещенности, а также смотреть рекомендации по уходу.
        </Text>
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
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#16213E",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
  },
  formCard: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
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
  button: {
    marginTop: 20,
    backgroundColor: "#115FF9",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  infoCard: {
    marginTop: 16,
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    padding: 16,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#16213E",
  },
  infoText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
});