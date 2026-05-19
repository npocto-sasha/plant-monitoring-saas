import React from "react";

import { PlantProvider } from "./context/PlantContext";
import { NotificationProvider } from "./context/NotificationContext";
import AppToast from "./Components/AppToast";

import User from "./Screens/User";
import Devices from "./Screens/Devices";
import Dashboard from "./Screens/Dashboard";
import Monitor from "./Screens/Monitor";
import Notifi from "./Screens/Notifi";
import AddPlant from "./Screens/AddPlant";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const mockUser = {
    id: "demo-user",
    name: "Demo User",
    email: "demo@example.com",
  };

  function logOut() {
    console.log("Auth is disabled in prototype mode");
  }

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        name="AddPlant"
        component={AddPlant}
        options={{
          headerShown: true,
          title: "Добавить растение",
          headerTintColor: "#115FF9",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#115FF9",
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="Devices" component={Devices} />
      <Stack.Screen name="Notification" component={Notifi} />

      <Stack.Screen
        name="Monitor"
        component={Monitor}
        options={{
          headerShown: true,
          title: "Карточка растения",
          headerTintColor: "#115FF9",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#115FF9",
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="User"
        component={User}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PlantProvider>
      <NotificationProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>

        <AppToast />
      </NotificationProvider>
    </PlantProvider>
  );
}