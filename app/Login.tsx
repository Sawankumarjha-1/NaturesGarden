import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { MotiImage } from "moti";
import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as Happtics from "expo-haptics";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const login = () => {
  const windowheight = Dimensions.get("window").height;
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState("eye-off-outline");
  const [comment, setComment] = useState("");
  const [inPostingSession, setInPostinData] = useState(false);
  const rout = useRouter();
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      if (user_id != null) {
        return rout.push("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const storeUser = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log(error);
    }
  };
  async function postData() {
    setInPostinData(true);
    if (email == "" || password == "") {
      setInPostinData(false);
      return setComment("Please fill all the required fields !");
    } else {
      setComment("");
      const data = { password, email };
      await fetch("http://192.168.29.216:5000/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status == 401) {
            setInPostinData(false);
            setComment(result.message);
          }

          if (result.status == 200) {
            setInPostinData(false);
            setComment("");
            setEmail("");
            setPassword("");
            storeUser("user_id", result.data.email);
            return rout.push("/Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar />
      <ScrollView
        style={{ flex: 1, height: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 50, paddingHorizontal: 20, height: 300 }}>
          <MotiImage
            source={require("../assets/images/white_bg_logo.png")}
            style={{ width: 200, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.formHeading}>
            <Text style={{ color: "#00BF63" }}>Green</Text> your space
          </Text>
          <Text style={styles.formSubHeading}>
            login to explore our <Text style={{ color: "#00BF63" }}>plant</Text>{" "}
            paradise
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#00BF63",
            width: "100%",
            height: windowheight - 300,
            paddingHorizontal: 20,
            borderTopRightRadius: 180,
            borderTopLeftRadius: 80,
            paddingTop: 75,
            alignContent: "center",
          }}
        >
          <KeyboardAvoidingView>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "MontserratRegular",
                paddingHorizontal: 10,
                paddingVertical: 10,
                color: "#fff",
              }}
            >
              {comment}
            </Text>
            <TextInput
              label="Username/Email"
              right={<TextInput.Icon icon="account-outline" />}
              style={{ marginBottom: 20 }}
              activeUnderlineColor="#00BF63"
              dense={true}
              underlineColor="#fff"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Password"
              secureTextEntry={passwordVisibility}
              right={
                <TextInput.Icon
                  icon={eye}
                  onPress={() => {
                    if (passwordVisibility == true) {
                      setpasswordVisibility(false);
                      setEye("eye");
                    } else {
                      setpasswordVisibility(true);
                      setEye("eye-off-outline");
                    }
                  }}
                />
              }
              style={{ marginBottom: 20 }}
              activeUnderlineColor="#00BF63"
              underlineColor="#fff"
              dense={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {/*Forget Text */}
            <TouchableOpacity
              onPress={() => {
                Happtics.selectionAsync();
                rout.push("/ForgetPassword");
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontFamily: "MontserratMedium",
                  marginLeft: 10,
                }}
              >
                Forget Password ?
              </Text>
            </TouchableOpacity>
            {/*Buttons */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 50,

                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Happtics.selectionAsync();
                }}
                style={styles.formCommonBtn}
              >
                <Text style={styles.formCommonBtnText}>Reset</Text>
              </TouchableOpacity>

              {inPostingSession == false ? (
                <TouchableOpacity
                  onPress={() => {
                    Happtics.selectionAsync();
                    postData();
                  }}
                  style={[styles.formCommonBtn, { backgroundColor: "black" }]}
                >
                  <Text
                    style={[styles.formCommonBtnText, { color: "#00BF63" }]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled
                  style={[styles.formCommonBtn, { backgroundColor: "black" }]}
                >
                  <ActivityIndicator size={20} color="#00BF63" />
                </TouchableOpacity>
              )}
            </View>
            {/*Don't have an account */}

            <Text
              style={{
                color: "#000",
                fontFamily: "MontserratMedium",
                marginLeft: 10,
                textAlign: "center",
              }}
            >
              Don't have an account ?{" "}
              <Text
                style={{ color: "#fff" }}
                onPress={() => {
                  rout.replace("/Signup");
                }}
              >
                Signup
              </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default login;
