import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Image, ScrollView } from "moti";
import * as Haptics from "expo-haptics";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useRouter } from "expo-router";
import { ObjectId } from "mongoose";
import GettingCartItems from "../../fetched/GettingCartItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface item {
  _id: ObjectId;
  name: String;
  category: String;
  price: String;
  imageLink: String;
  description: String;
  quantity: Number;
}
const IndividualCartItem = () => {
  const rout = useRouter();
  const { email, userCart, isUserLoading } = GettingCartItems();
  const [orderArray, setOrderArray] = useState([]);

  const storeUser = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log(error);
    }
  };
  function onOrder() {
    storeUser("orderData", JSON.stringify(orderArray));
    rout.replace("/AddressSelection");
  }
  //Quantity Increment
  const handleIncrement = (productId) => {
    setOrderArray((prevProducts: ObjectId) =>
      prevProducts.map((product: item) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };
  //Quantity Decrement
  const handleDecrement = (productId: ObjectId) => {
    setOrderArray((prevProducts) =>
      prevProducts.map((product: item) =>
        product._id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };
  //making a new array with the additional property quantity
  function newOrderArray() {
    userCart.forEach((element) => {
      element.quantity = 1;
      setOrderArray((prev) => {
        return [...prev, element];
      });
    });
  }
  //Delete Cart items
  const deleteCartItem = async (id: ObjectId) => {
    try {
      const res = await fetch(
        `http://192.168.29.216:5000/api/delete_cart/${email}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status == 200) {
        Alert.alert("Delete Suucessfully...");
        return rout.replace("/AddToCart");
      }
    } catch (e) {
      console.log(e);
    }
  };
  //Run new order according to the updation of isUserLoading
  useEffect(() => {
    newOrderArray();
  }, [isUserLoading]);
  return isUserLoading == false ? (
    <View style={{ padding: 20, height: "100%" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {orderArray.length != 0 ? (
          <View>
            {orderArray.map(
              (
                data: {
                  _id: ObjectId;
                  name: String;
                  category: String;
                  price: String;
                  imageLink: String;
                  description: String;
                  quantity: Number;
                },
                index
              ) => {
                return (
                  <View
                    key={"carItems" + index}
                    style={{
                      flexDirection: "row",
                      paddingVertical: 20,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "grey",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.selectionAsync();
                        rout.push(
                          "/ProductDescription?id=" +
                            data._id +
                            "&&status=added"
                        );
                      }}
                      style={{ height: 60, width: "20%" }}
                    >
                      <Image
                        source={{ uri: data.imageLink }}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 6,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        width: "80%",
                      }}
                    >
                      <Text
                        style={{ fontSize: 14, fontFamily: "MontserratMedium" }}
                      >
                        {data.name}
                      </Text>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "MontserratSemiBold",
                          }}
                        >
                          ₹ {data.price} /-
                        </Text>

                        {/**For Quantity Increment */}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={() => {
                              handleDecrement(data._id);
                            }}
                          >
                            <Icon
                              name="minuscircleo"
                              size={20}
                              style={{ color: "#00BF63" }}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "MontserratBold",
                              paddingHorizontal: 10,
                              paddingVertical: 10,
                              // color: "#000",
                            }}
                          >
                            {data.quantity}
                          </Text>
                          <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => {
                              handleIncrement(data._id);
                            }}
                          >
                            <Icon
                              name="pluscircleo"
                              size={20}
                              style={{ color: "#00BF63" }}
                            />
                          </TouchableOpacity>
                        </View>
                        {/**For delete from Carts */}
                        <TouchableOpacity
                          onPress={() => {
                            Haptics.selectionAsync();
                            deleteCartItem(data._id);
                          }}
                        >
                          <Entypo name="trash" size={20} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }
            )}
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
            No Items found your carts !
          </Text>
        )}
      </ScrollView>
      {userCart.length !== 0 && (
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
            onOrder();
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
            Order Now
          </Text>
        </TouchableOpacity>
      )}
    </View>
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

export default IndividualCartItem;
