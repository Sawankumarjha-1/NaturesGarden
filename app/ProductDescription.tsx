import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";

import { Image, ScrollView } from "moti";
import Icon from "react-native-vector-icons/AntDesign";
import GettingProductData from "../fetched/GettingProductData";
import GettingUserID from "../fetched/GettingUserID";
import { ObjectId } from "mongoose";

const ProductDescription = () => {
  const getParams = useSearchParams();
  const { email } = GettingUserID();
  const { data, isLoading, error } = GettingProductData(
    "/products_id/" + getParams.id
  );
  const addToCart = async (data: {
    _id: ObjectId;
    name: String;
    category: String;
    price: String;
    imageLink: String;
    description: String;
  }) => {
    try {
      const res = await fetch(
        `http://192.168.29.216:5000/api/carts_update/${email}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status == 200) {
        Alert.alert("Added Suucessfully...");
        return rout.replace("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const rout = useRouter();
  return isLoading == false ? (
    <SafeAreaView
      style={{
        flex: 1,
        height: StatusBar.currentHeight,
        backgroundColor: "#fff",
      }}
    >
      <Stack.Screen
        options={{
          title: data.name,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/**Product Image */}
        <View
          style={{
            width: "100%",
            height: 350,
            backgroundColor: "#fff",
          }}
        >
          <Image
            source={{ uri: data.imageLink }}
            style={{ width: "100%", height: "70%" }}
            resizeMode="cover"
          />
          <View
            style={{
              width: "100%",
              padding: 20,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "MontserratMedium" }}>
                {data.name}
              </Text>
              <Text style={{ fontSize: 18, fontFamily: "MontserratSemiBold" }}>
                ₹ {data.price} /-
              </Text>
            </View>
          </View>
        </View>
        {/*Product description */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "MontserratSemiBold",
              marginBottom: 10,
            }}
          >
            Description :{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratRegular",
              marginBottom: 10,
              textAlign: "justify",
            }}
          >
            {data.description}
          </Text>
        </View>
      </ScrollView>
      {/** Add to Cart Button */}
      {getParams.status !== "added" && (
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
            addToCart(data);
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
            Add To Cart
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
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
  );
};

export default ProductDescription;
