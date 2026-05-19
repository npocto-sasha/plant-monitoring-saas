import React from "react";
import Button from "../Components/Button";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Auth() {
  const navigation = useNavigation();
  return (
    <View>
      <Image style={styles.logo} source={require("../assets/Logo.png")} />
      <Button
        tuk={() => {
          navigation.navigate("Login");
        }}
        text={"Вход"}
        styl={styles.authBtn}
        textStyle={styles.authBtnText}
      />
      <Button
        tuk={() => {
          navigation.navigate("Registration");
        }}
        text={"Зарегистрироваться"}
        styl={{ backgroundColor: "#CAD6FF" }}
        textStyle={[styles.authBtnText, { color: "#115FF9" }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  authBtn: {
    backgroundColor: "#2260FF",
  },
  authBtnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    padding: 6,
  },
  logo: {
    marginHorizontal: "auto",
    marginBottom: 100,
    marginTop: 150,
    width: 106,
    height: 106,
  },
});
