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
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import * as Happtics from "expo-haptics";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Signup = () => {
  const windowheight = Dimensions.get("window").height;
  const rout = useRouter();
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [eye, setEye] = useState("eye-off-outline");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState(
    "NOTE : Password must contain 6 letters and alteast one special character and one numeric value"
  );
  const [inPostingSession, setInPostinData] = useState(false);
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      if (user_id != null) {
        rout.replace("/Home");
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
    if (name == "" || email == "" || password == "" || phone == "") {
      setInPostinData(false);
      return setComment("Please fill all the required fields !");
    } else {
      setComment("");
      const data = { name, password, phone, email };
      await fetch("http://192.168.29.216:5000/api/add_user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status == 400) {
            setInPostinData(false);
            setComment(result.message);
          }
          if (result.status == 403) {
            setInPostinData(false);
            setComment(result.message);
          }
          if (result.status == 200) {
            setInPostinData(false);
            setComment("");
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
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
        <View style={{ marginTop: 50, paddingHorizontal: 20, height: 280 }}>
          <MotiImage
            source={require("../assets/images/white_bg_logo.png")}
            style={{ width: 200, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.formHeading}>
            <Text style={{ color: "#00BF63" }}>Unlock</Text> the World of Plants
          </Text>
          <Text style={styles.formSubHeading}>
            Sign up and Sprout Your{" "}
            <Text style={{ color: "#00BF63" }}>Plant</Text> Collection!
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#00BF63",
            width: "100%",
            height: windowheight - 280,
            paddingHorizontal: 20,

            paddingTop: 20,

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
              label="Name"
              right={<TextInput.Icon icon="account-outline" />}
              style={{ marginBottom: 20 }}
              activeUnderlineColor="#00BF63"
              dense={true}
              underlineColor="#fff"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              label="Username/Email"
              right={<TextInput.Icon icon="email" />}
              style={{ marginBottom: 20 }}
              activeUnderlineColor="#00BF63"
              dense={true}
              underlineColor="#fff"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Phone"
              right={<TextInput.Icon icon="phone" />}
              style={{ marginBottom: 20 }}
              activeUnderlineColor="#00BF63"
              dense={true}
              underlineColor="#fff"
              value={phone}
              onChangeText={(text) => setPhone(text)}
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
              activeUnderlineColor="#00BF63"
              underlineColor="#fff"
              dense={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            {/*Buttons */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Happtics.selectionAsync();
                  setName("");
                  setEmail("");
                  setPassword("");
                  setPhone("");
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
                    Signup
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
              Already have an account ?{" "}
              <Text
                style={{ color: "#fff" }}
                onPress={() => {
                  rout.replace("/Login");
                }}
              >
                Login
              </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
