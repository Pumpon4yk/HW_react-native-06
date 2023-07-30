import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useDispatch } from "react-redux";
import UserAvatar from "../../Components/UserAvatar"
import BgImage from "../../Components/BgImage";
import useKeyboardStatus from "../../hooks/keyboardStatus";
import {authSignUp} from "../../redux/auth/authOperations";


export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [keyboardStatus] = useKeyboardStatus(Keyboard);
  const [avatar, setAvatar] = useState(null);

  const fokusToggle = (type) => {
    if (type === "nickname") return setFocusName(!focusName);
    if (type === "email") return setFocusEmail(!focusEmail);
    if (type === "password") return setFocusPassword(!focusPassword);
  };

  const handleSubmit = () => {
    const data = {
      nickname,
      email,
      password,
      photoURL: avatar,
    };
    dispatch(authSignUp(data));

    setNickname("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "margin"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <BgImage/>
          <View
            style={{ ...styles.form, marginBottom: keyboardStatus ? -175 : 0 }}
          >
            <UserAvatar avatar={avatar} setAvatar={setAvatar}/>
            <Text style={styles.title}>Sing Up</Text>
            <TextInput
              inputmode="text"
              onChangeText={(text) => setNickname(text)}
              onFocus={() => fokusToggle("nickname")}
              onBlur={() => fokusToggle("nickname")}
              style={{
                ...styles.input,
                marginBottom: 16,
                borderColor: focusName ? "#FF6C00" : "#E8E8E8",
              }}
              value={nickname}
              placeholder="Login"
            />
            <TextInput
              inputmode="email"
              onChangeText={(text) => setEmail(text)}
              onFocus={() => fokusToggle("email")}
              onBlur={() => fokusToggle("email")}
              style={{
                ...styles.input,
                marginBottom: 16,
                borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
              }}
              value={email}
              placeholder="Email"
            />

            <View style={styles.containerPasword}>
              <TextInput
                inputmode="text"
                secureTextEntry={showPassword}
                onFocus={() => fokusToggle("password")}
                onBlur={() => fokusToggle("password")}
                onChangeText={(text) => setPassword(text)}
                style={{
                  ...styles.input,
                  borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                }}
                value={password}
                placeholder="Password"
              />
              <TouchableOpacity
                style={styles.showPass}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.textBtn}>show</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Sing Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.textBtn}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 78,
    paddingTop: 92,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: "auto",
  },
  title: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  containerPasword: {
    position: "relative",
    width: "100%",
    marginBottom: 43,
  },
  showPass: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    padding: 16,
  },
  textBtn: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
  },
});
