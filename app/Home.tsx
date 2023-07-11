import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Bottom from "../components/Common/Bottom";
import { Stack } from "expo-router";
import Category from "../components/Home/Category";
import Carousel from "../components/Home/Carousel";
import Products from "../components/Home/Products";
import SpecialOffer from "../components/Home/SpecialOffer";
import Social from "../components/Home/Social";
import { ScrollView } from "react-native-gesture-handler";
import GettingProductData from "../fetched/GettingProductData";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GettingCartItems from "../fetched/GettingCartItems";
const Home = () => {
  const { data, error, isLoading } = GettingProductData("/products/10");
  const { email, userCart, isUserLoading } = GettingCartItems();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
        paddingBottom: 83,
      }}
    >
      <StatusBar backgroundColor="#fff" />
      <Stack.Screen options={{ headerShown: false }} />
      {isLoading === false && isUserLoading == false ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*Category*/}
          <Category />
          {/* Carousel */}
          <Carousel />
          {/*Products */}
          {error == false ? (
            <Products products={data} userCart={userCart} email={email} />
          ) : (
            <Text
              style={{
                padding: 20,
                fontSize: 16,
                fontFamily: "MontserratRegular",
              }}
            >
              Something wents wrong !
            </Text>
          )}
          {/* Special Filters */}
          {/* <SpecialOffer /> */}

          {/*Social Icons */}
          <Social />
        </ScrollView>
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
      {/* Bottom Navbar */}
      <Bottom screen="Home" />
    </SafeAreaView>
  );
};

export default Home;
