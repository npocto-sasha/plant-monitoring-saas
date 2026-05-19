import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { register } from "../Components/AuthHandler";
import Button from "../Components/Button";

import { useNavigation } from "@react-navigation/native";

export default function Reg() {
  const navigation = useNavigation();

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  async function register() {
    await register({
      email: mail,
      password: pass,
      fio: name,
    });
    navigation.navigate("Log");
  }
  function changeMail(text) {
    setMail(text);
  }
  function changePass(text) {
    setPass(text);
  }
  function changeName(text) {
    setName(text);
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
        onFocus={() => {
          setIsTyping(true);
        }}
        onBlur={() => {
          setIsTyping(false);
        }}
        placeholder="Введите электронную почту"
      />

      <Text style={styles.text}>ФИО</Text>

      <TextInput
        style={styles.Txtin}
        onChangeText={(text) => {
          changeName(text);
        }}
        placeholder="Введите ФИО"
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
          register();
        }}
        text={"Зарегистрироваться"}
        styl={styles.authBtn}
        textStyle={styles.authBtnText}
        onFocus={() => {
          setIsTyping(true);
        }}
        onBlur={() => {
          setIsTyping(false);
        }}
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
