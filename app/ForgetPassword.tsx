import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const TInput = ({ label, icon, value, valFunc }) => {
  return (
    <TextInput
      label={label}
      left={<TextInput.Icon icon={icon} />}
      style={{ marginBottom: 20, backgroundColor: "#fff" }}
      activeUnderlineColor="#00BF63"
      dense={true}
      underlineColor="#fff"
      value={value}
      onChangeText={(text) => valFunc(text)}
    />
  );
};
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [onGoing, setOnGoing] = useState(false);
  const [otp, setOtp] = useState("");
  const [haveOTP, setHaveOTP] = useState(false);
  const [eye, setEye] = useState("eye-off-outline");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const rout = useRouter();
  const [comment, setComment] = useState("");
  //Send otp function
  function sendOTP() {
    if (email == "") {
      return setComment("Please enter your existing email !");
    } else if (!(email.includes("@") && email.includes("."))) {
      return setComment("Please enter a valid email address !");
    }
    setOnGoing(true);
    fetch("http://192.168.29.216:5000/api/send_otp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 400) {
          setOnGoing(false);
          return setComment(result.message);
        }
        if (result.status == 200) {
          setOnGoing(false);

          setComment(
            "Otp sent to your email address and Password must contain 6 letters and alteast one special character and one numeric value"
          );
          setHaveOTP(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //on submit exectued function
  function OnSumbit() {
    if (otp == "" || password == "") {
      return setComment("Please fill all the details !");
    }
    if (otp.length < 4) {
      return setComment("Invalid OTP");
    }

    setOnGoing(true);

    fetch("http://192.168.29.216:5000/api/update_password", {
      method: "PATCH",
      body: JSON.stringify({ email, password, otp }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 400) {
          setOnGoing(false);
          return setComment(result.message);
        }
        if (result.status == 200) {
          setOnGoing(false);
          setComment("");
          return rout.replace("/Login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Forget Password" }} />
      <View style={{ padding: 20 }}>
        {/*Comments */}

        <Text
          style={{
            fontSize: 14,
            fontFamily: "MontserratRegular",
            paddingHorizontal: 10,
            paddingVertical: 10,
            color: "red",
          }}
        >
          {comment}
        </Text>

        {/*Input field for Email */}
        {haveOTP == false && (
          <TInput icon="email" valFunc={setEmail} label="Email" value={email} />
        )}
        {haveOTP && (
          <TInput
            value={otp}
            label={"Enter Otp"}
            valFunc={setOtp}
            icon="dots-hexagon"
          />
        )}
        {haveOTP && (
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
            style={{ marginBottom: 20, backgroundColor: "#fff" }}
            activeUnderlineColor="#00BF63"
            underlineColor="#fff"
            dense={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        )}
        {/*This is for otp button */}
        {haveOTP == false && (
          <View>
            {onGoing == false ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#00BF63",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 6,
                  width: 130,
                }}
                onPress={() => {
                  sendOTP();
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "MontserratMedium",
                    color: "#fff",
                  }}
                >
                  Send OTP
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled
                style={{
                  backgroundColor: "#00BF63",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 6,
                  width: 130,
                }}
              >
                <ActivityIndicator size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        )}
        {/*This is for updating new password */}
        {haveOTP && (
          <View>
            {onGoing == false ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#00BF63",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 6,
                  width: 200,
                }}
                onPress={() => {
                  OnSumbit();
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "MontserratMedium",
                    color: "#fff",
                  }}
                >
                  Verify & Update
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled
                style={{
                  backgroundColor: "#00BF63",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 6,
                  width: 130,
                }}
              >
                <ActivityIndicator size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
