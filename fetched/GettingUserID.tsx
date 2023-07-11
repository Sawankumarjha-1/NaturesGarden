import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GettingUserID = () => {
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const getData = async () => {
    try {
      const user_id: String | null = await AsyncStorage.getItem("user_id");
      const oData: String | null = await AsyncStorage.getItem("orderData");
      const tAmount: String | null = await AsyncStorage.getItem("totalAmount");
      if (user_id !== null) {
        setEmail(user_id.toString());
      }
      if (orderData !== null) {
        setOrderData(oData);
      }
      if (tAmount !== null) {
        setTotalAmount(tAmount);
      }
    } catch (e) {
      // console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return { email, orderData, totalAmount };
};

export default GettingUserID;
