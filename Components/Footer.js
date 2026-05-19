import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.icon}>🌿</Text>
        <Text style={styles.text}>Растения</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate("Devices")}
      >
        <Text style={styles.icon}>📡</Text>
        <Text style={styles.text}>Устройства</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate("Notification")}
      >
        <Text style={styles.icon}>💡</Text>
        <Text style={styles.text}>Советы</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate("User")}
      >
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.text}>Профиль</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 83,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E5EDFD",
    borderTopWidth: 2,
    borderTopColor: "#115FF9",
    paddingBottom: 8,
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
    marginBottom: 4,
  },
  text: {
    color: "#115FF9",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});