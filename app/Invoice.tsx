import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import BackBtn from "../components/Common/BackBtn";
import GettingUserID from "../fetched/GettingUserID";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";
import * as Haptics from "expo-haptics";
const Invoice = () => {
  const { orderData } = GettingUserID();
  const [orderArray, setOrderArray] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const rout = useRouter();
  const storeUser = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log(error);
    }
  };
  function onContinue() {
    storeUser("totalAmount", (totalAmount + orderArray.length * 20).toString());
    rout.replace("/PaymentOptions");
  }
  useEffect(() => {
    setOrderArray([]);
    setTotalAmount(0);
    if (orderData != "") {
      JSON.parse(orderData).map((element) => {
        setOrderArray((prev) => {
          return [...prev, element];
        });
        setTotalAmount((prev) => {
          return prev + parseInt(element.price) * parseInt(element.quantity);
        });
      });
    }
  }, [orderData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: StatusBar.currentHeight,
        backgroundColor: "#fff",
      }}
    >
      <Stack.Screen
        options={{
          title: "Total Amount",
          headerLeft: () => {
            return <BackBtn path={"/PaymentOptions"} />;
          },
        }}
      />

      <DataTable.Row>
        <DataTable.Cell
          textStyle={{ fontFamily: "MontserratBold", fontSize: 14 }}
        >
          Product
        </DataTable.Cell>
        <DataTable.Cell
          textStyle={{ fontFamily: "MontserratBold", fontSize: 14 }}
        >
          Quantity
        </DataTable.Cell>
        <DataTable.Cell
          textStyle={{ fontFamily: "MontserratBold", fontSize: 14 }}
        >
          Price
        </DataTable.Cell>
        <DataTable.Cell
          textStyle={{ fontFamily: "MontserratBold", fontSize: 14 }}
        >
          Amount
        </DataTable.Cell>
      </DataTable.Row>
      {orderArray.length != 0 &&
        orderArray.map((data, index) => {
          return (
            <DataTable.Row key={"invoice" + index}>
              <DataTable.Cell
                textStyle={{
                  fontFamily: "MontserratRegular",
                  fontSize: 12,
                }}
              >
                {data.name}
              </DataTable.Cell>

              <DataTable.Cell
                numeric
                textStyle={{
                  fontFamily: "MontserratRegular",
                  fontSize: 12,
                }}
              >
                {data.quantity}
              </DataTable.Cell>
              <DataTable.Cell
                numeric
                textStyle={{ fontFamily: "MontserratBold", fontSize: 14 }}
              >
                {parseInt(data.price)}
              </DataTable.Cell>
              <DataTable.Cell
                numeric
                textStyle={{ fontFamily: "MontserratBold", fontSize: 14 }}
              >
                {parseInt(data.price) * parseInt(data.quantity)}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      <View style={{ padding: 20 }}>
        {/*For Delivery Charges */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "MontserratRegular",
              fontSize: 14,
            }}
          >
            Delivery Charges :
          </Text>
          <Text
            style={{
              fontFamily: "MontserratBold",
              fontSize: 14,
            }}
          >
            {orderArray.length != 0 && orderArray.length * 20} /-
          </Text>
        </View>
        {/**Total Amount */}
        {orderData && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderTopColor: "#eee",
              borderTopWidth: 0.5,
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 14,
              }}
            >
              Total Amount :
            </Text>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              {totalAmount + orderArray.length * 20} /-
            </Text>
          </View>
        )}
      </View>
      {orderArray.length != 0 && (
        <TouchableOpacity
          style={{
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
      )}
    </SafeAreaView>
  );
};

export default Invoice;
