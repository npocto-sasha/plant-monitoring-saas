import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  function showNotification(message, type = "success") {
    setNotification({
      id: Date.now(),
      message,
      type,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function hideNotification() {
    setNotification(null);
  }

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
}