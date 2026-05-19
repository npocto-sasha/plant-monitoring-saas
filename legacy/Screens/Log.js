import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Image, TextInput, StyleSheet } from "react-native";

import { login } from "../Components/AuthHandler";
import Button from "../Components/Button";

import { useNavigation } from "@react-navigation/native";

export default function Log({ route }) {
  const navigation = useNavigation();
  const onAuth = route.params.onAuth;
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  async function auth() {
    const user = await login({
      email: mail,
      password: pass,
    });
    onAuth(user);
  }
  function changeMail(text) {
    setMail(text);
  }
  function changePass(text) {
    setPass(text);
  }
  return (
    <SafeAreaView>
      <Image
        style={[styles.logo, { marginTop: isTyping ? 80 : 250 }]}
        source={require("../assets/Logo.png")}
      />

      <Text style={styles.title}>Вход в систему</Text>
      <Text style={styles.text}>Электронная почта</Text>

      <TextInput
        style={styles.Txtin}
        onChangeText={(text) => {
          changeMail(text);
        }}
        placeholder="Введите электронную почту"
        onFocus={() => {
          setIsTyping(true);
        }}
        onBlur={() => {
          setIsTyping(false);
        }}
      />

      <Text style={styles.text}>Пароль</Text>

      <TextInput
        style={styles.Txtin}
        onChangeText={(text) => {
          changePass(text);
        }}
        placeholder="Введите пароль"
        secureTextEntry
        onFocus={() => {
          setIsTyping(true);
        }}
        onBlur={() => {
          setIsTyping(false);
        }}
      />

      <Button
        tuk={() => {
          auth();
        }}
        text={"Вход"}
        styl={styles.authBtn}
        textStyle={styles.authBtnText}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  authBtn: {
    marginTop: 28,
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
    marginTop: 250,
    width: 106,
    height: 106,
  },
  Txtin: {
    marginHorizontal: "auto",
    borderRadius: 5,
    backgroundColor: "#C2CEE4",
    width: 275,
    height: 40,
    paddingLeft: 8,
    color: "#525252",
    fontSize: 18,
  },
  title: {
    marginHorizontal: "auto",
    marginTop: 30,
    marginBottom: 10,
    fontSize: 24,
    color: "#115FF9",
  },
  text: {
    marginLeft: 69,
    marginTop: 10,
    fontSize: 18,
    color: "#115FF9",
  },
});
