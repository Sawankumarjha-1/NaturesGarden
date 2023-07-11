import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Bottom from "../components/Common/Bottom";
import IndividualOrderedItem from "../components/Common/IndividualOrderedItem";
import BackBtn from "../components/Common/BackBtn";
import GettingCartItems from "../fetched/GettingCartItems";
const OrderedItems = () => {
  const { email, userOrders, isUserLoading } = GettingCartItems();
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
          title: "Ordered Items",
          headerLeft: () => {
            return <BackBtn path={"/Home"} />;
          },
        }}
      />
      {isUserLoading == false ? (
        <IndividualOrderedItem orderData={userOrders} email={email} />
      ) : (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#00BF63" size={30} />
        </View>
      )}
      <Bottom screen={"Ordered"} />
    </SafeAreaView>
  );
};

export default OrderedItems;
