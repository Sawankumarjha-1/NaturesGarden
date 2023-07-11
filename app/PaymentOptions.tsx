import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import BackBtn from "../components/Common/BackBtn";
import * as Haptics from "expo-haptics";
import GettingUserID from "../fetched/GettingUserID";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PaymentOptions = () => {
  const [selected, setSelected] = useState(1);
  const { orderData } = GettingUserID();
  const [orderArray, setOrderArray] = useState([]);
  const rout = useRouter();
  const storeUser = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log(error);
    }
  };
  function onContinue() {
    storeUser("orderData", JSON.stringify(orderArray));
    rout.push(`/OrderSuccessfull`);
  }
  useEffect(() => {
    setOrderArray([]);
    const dt = new Date();
    orderData &&
      JSON.parse(orderData).map((element) => {
        element.paymentMode = selected == 0 ? "Phone pe" : "Cash on Delivery";
        element.deliveryDate =
          parseInt(dt.toLocaleDateString().substring(0, 2)) +
          3 +
          dt.toLocaleDateString().substring(2);
        setOrderArray((prev) => {
          return [...prev, element];
        });
      });
  }, [orderData, selected]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: StatusBar.currentHeight,
      }}
    >
      <Stack.Screen
        options={{
          title: "Select Payment Method",
          headerLeft: () => {
            return <BackBtn path={"/AddressSelection"} />;
          },
        }}
      />

      {/*Listd Address*/}

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          // key={"addr_list" + index}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              borderBottomWidth: 0.5,
              borderColor: "#eee",
              paddingVertical: 15,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                Haptics.selectionAsync();
                setSelected(0);
              }}
            >
              <Image
                source={{
                  uri: "https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gj9s",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 20,
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "MontserratMedium",
                  lineHeight: 30,
                  color: selected == 0 ? "#00BF63" : "#000",
                }}
              >
                Phone Pe
              </Text>
            </TouchableOpacity>
            <RadioButton
              value="0"
              status={selected === 0 ? "checked" : "unchecked"}
              onPress={() => {
                Haptics.selectionAsync();
                setSelected(0);
              }}
              color="#00BF63"
            />
          </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              borderBottomWidth: 0.5,
              borderColor: "#eee",
              paddingVertical: 15,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                Haptics.selectionAsync();
                setSelected(1);
              }}
            >
              <Image
                source={{
                  uri: "https://m.economictimes.com/thumb/msid-83058184,width-1200,height-900,resizemode-4,imgsize-47252/cod-istock.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 20,
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "MontserratMedium",
                  lineHeight: 30,
                  color: selected == 1 ? "#00BF63" : "#000",
                }}
              >
                Cash On Delivery
              </Text>
            </TouchableOpacity>
            <RadioButton
              value="0"
              status={selected === 1 ? "checked" : "unchecked"}
              onPress={() => {
                Haptics.selectionAsync();
                setSelected(1);
              }}
              color="#00BF63"
            />
          </View>
        </View>
      </ScrollView>

      {/*Continue Button*/}
      <TouchableOpacity
        style={{
          //   display: add === false ? "flex" : "none",
          backgroundColor: "#00BF63",
          borderRadius: 100,
          padding: 20,
          position: "absolute",
          bottom: 20,
          width: "80%",
          alignSelf: "center",
        }}
        onPress={() => {
          Haptics.selectionAsync();
          onContinue();
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 16,
            fontFamily: "MontserratMedium",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentOptions;
