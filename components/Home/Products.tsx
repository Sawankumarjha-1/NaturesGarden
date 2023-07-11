import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "moti";
import { useRouter } from "expo-router";
import { ObjectId } from "mongoose";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Products = ({ products, userCart, email }) => {
  const rout = useRouter();

  //Add Item to the user id
  const AddToCart = async (data: {
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

  return products.length !== 0 ? (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {products.map((data, index) => {
        return (
          <View
            key={"products" + data.category + index}
            style={{
              width: "47.5%",
              borderRadius: 6,
              borderWidth: 0.5,
              borderColor: "#eee",
              marginVertical: 10,
              overflow: "hidden",
            }}
          >
            {userCart.length != 0 ? (
              userCart.findIndex(
                (e: {
                  _id: ObjectId;
                  name: String;
                  category: String;
                  price: String;
                  imageLink: String;
                  description: String;
                }) => e._id === data._id
              ) != -1 ? (
                <TouchableOpacity
                  onPress={() =>
                    rout.push(
                      "/ProductDescription?id=" + data._id + "&&status=added"
                    )
                  }
                >
                  <Image
                    source={{ uri: data.imageLink }}
                    style={{ width: "100%", height: 100 }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    rout.push("/ProductDescription?id=" + data._id)
                  }
                >
                  <Image
                    source={{ uri: data.imageLink }}
                    style={{ width: "100%", height: 100 }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                onPress={() => rout.push("/ProductDescription?id=" + data._id)}
              >
                <Image
                  source={{ uri: data.imageLink }}
                  style={{ width: "100%", height: 100 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            <View style={{ padding: 20, paddingHorizontal: 15 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "MontserratMedium",
                  marginBottom: 5,
                }}
              >
                {data.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, fontFamily: "MontserratBold" }}>
                  ₹ {data.price} /-
                </Text>
                {userCart.length != 0 ? (
                  userCart.findIndex(
                    (e: {
                      _id: ObjectId;
                      name: String;
                      category: String;
                      price: String;
                      imageLink: String;
                      description: String;
                    }) => e._id === data._id
                  ) != -1 ? (
                    <Text
                      style={{
                        color: "#00BF63",
                        fontFamily: "MontserratMedium",
                        fontSize: 12,
                      }}
                    >
                      Added
                    </Text>
                  ) : (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#00BF63",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                      }}
                      onPress={() => {
                        AddToCart(data);
                        // rout.push("AddToCart?id=" + data._id);
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#00BF63",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      AddToCart(data);
                      // rout.push("AddToCart?id=" + data._id);
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Add
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  ) : (
    <Text
      style={{
        fontSize: 14,
        fontFamily: "MontserratRegular",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      No Item Found !
    </Text>
  );
};

export default Products;
