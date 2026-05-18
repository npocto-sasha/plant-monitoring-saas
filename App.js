import React from "react";

import User from "./Screens/User";
import Devices from "./Screens/Devices";
import Dashboard from "./Screens/Dashboard";
import Monitor from "./Screens/Monitor";
import Notifi from "./Screens/Notifi";
import TestModal from "./Screens/TestModal";
import AddPlant from "./Screens/AddPlant";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  const mockUser = {
    id: "demo-user",
    name: "Demo User",
    email: "demo@example.com",
  };

  function logOut() {
    console.log("Auth is disabled in prototype mode");
  }

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddPlant"
        component={AddPlant}
        options={{
        title: "Новое растение",
        headerTintColor: "#115ff9",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
          color: "#115ff9",
        },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="Devices"
        component={Devices}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="User"
        component={User}
        initialParams={{ user: mockUser, logOut }}
        options={{
          title: "Профиль",
          headerTintColor: "#115ff9",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            color: "#115ff9",
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="Notification"
        component={Notifi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Monitor"
        component={Monitor}
        options={{
          title: "",
          headerTintColor: "#115ff9",
        }}
      />

      <Stack.Screen
        name="TestModal"
        component={TestModal}
        options={{
          title: "",
          headerTintColor: "#115ff9",
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};