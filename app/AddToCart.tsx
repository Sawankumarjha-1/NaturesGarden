import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import IndividualCartItem from "../components/Common/IndividualCartItem";
import BackBtn from "../components/Common/BackBtn";

const AddToCart = () => {
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
          title: "Cart Items",
          headerLeft: () => {
            return <BackBtn path={"/Home"} />;
          },
        }}
      />
      <IndividualCartItem />
    </SafeAreaView>
  );
};

export default AddToCart;
