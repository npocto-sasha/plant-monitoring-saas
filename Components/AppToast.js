import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNotification } from "../context/NotificationContext";

export default function AppToast() {
  const { notification, hideNotification } = useNotification();

  if (!notification) {
    return null;
  }

  const getToastStyle = () => {
    if (notification.type === "error") {
      return styles.errorToast;
    }

    if (notification.type === "warning") {
      return styles.warningToast;
    }

    return styles.successToast;
  };

  const getTitle = () => {
    if (notification.type === "error") {
      return "Ошибка";
    }

    if (notification.type === "warning") {
      return "Внимание";
    }

    return "Готово";
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.toast, getToastStyle()]}
      onPress={hideNotification}
    >
      <Text style={styles.title}>{getTitle()}</Text>
      <Text style={styles.message}>{notification.message}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 24,
    zIndex: 9999,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  successToast: {
    backgroundColor: "#DFF7E8",
  },
  errorToast: {
    backgroundColor: "#F8D7DA",
  },
  warningToast: {
    backgroundColor: "#FFF3CD",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#16213E",
  },
  message: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },
});