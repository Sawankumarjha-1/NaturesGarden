import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GettingUserID from "./GettingUserID";

const GettingCartItems = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { email } = GettingUserID();
  const [userCart, setUserCartData] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  //Fetched User Cart Item Data
  const fetchData = async () => {
    await fetch(`http://192.168.29.216:5000/api/user/${email}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 401) {
          console.log("Something wents wrong");
        }
        if (res.status == 200) {
          setUserCartData(res.data[0].carts);
          setUserAddress(res.data[0].addressList);
          setUserOrders(res.data[0].orders);
          setIsUserLoading(false);
        }
      });
  };
  //Get User ID
  useEffect(() => {
    email && fetchData();
  }, [email]);

  return { email, userCart, isUserLoading, userAddress, userOrders };
};

export default GettingCartItems;
