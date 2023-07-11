import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Image, ScrollView } from "moti";
import Icon from "react-native-vector-icons/Entypo";
import IconCancel from "react-native-vector-icons/MaterialIcons";
import { ObjectId } from "mongoose";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

const IndividualOrderedItem = ({ orderData, email }) => {
  const rout = useRouter();
  function onCancel(index: Number, i: Number) {
    Alert.alert(
      "Order Cancellation",
      "Are you sure ?",
      [
        {
          text: "YES",
          onPress: async () => {
            try {
              const res = await fetch(
                `http://192.168.29.216:5000/api/update_status/${email}/${index}/${i}`,
                {
                  method: "PATCH",
                  body: JSON.stringify({ status: "Cancelled" }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (res.status == 200) {
                Alert.alert("Cancelled Suucessfully...");
                return rout.replace("/OrderedItems");
              }
            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            return false;
          },
        },
      ],

      { cancelable: false }
    );
  }
  return (
    <View style={{ padding: 20, height: "100%" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {orderData.length != 0 ? (
          orderData.map((data: [], index: Number) => {
            return data.map(
              (
                el: {
                  _id: ObjectId;
                  name: String;
                  category: String;
                  price: String;
                  imageLink: String;
                  description: String;
                  quantity: Number;
                  address: [];
                  paymentMode: String;
                  deliveryDate: String;
                  status: String;
                },
                i
              ) => {
                return (
                  <View
                    key={"orderedItems" + index + i}
                    style={{
                      flexDirection: "row",
                      paddingVertical: 20,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "grey",
                    }}
                  >
                    <Image
                      source={{ uri: el.imageLink }}
                      style={{ height: 80, width: "22%", borderRadius: 6 }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        width: "80%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "MontserratMedium",
                          }}
                        >
                          {el.name}
                        </Text>
                        {(el.status == "Order Confirmed" ||
                          el.status == "Shipped") && (
                          <TouchableOpacity
                            onPress={() => {
                              Haptics.selectionAsync();
                              onCancel(index, i);
                            }}
                          >
                            <IconCancel
                              name="cancel"
                              size={25}
                              style={{ color: "red" }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "MontserratRegular",
                          textDecorationLine:
                            el.status == "Cancelled" ? "line-through" : "none",
                        }}
                      >
                        Delivery Expected : {el.deliveryDate}
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
                          ₹ {el.price} /-
                        </Text>

                        {el.status != "Ordered" && el.status != "Cancelled" && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="dot-single"
                              size={25}
                              style={{ color: "skyblue" }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "MontserratRegular",
                                color: "skyblue",
                              }}
                            >
                              {el.status}
                            </Text>
                          </View>
                        )}
                        {el.status == "Ordered" && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="dot-single"
                              size={25}
                              style={{ color: "#00BF63" }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "MontserratRegular",
                                color: "#00BF63",
                              }}
                            >
                              {el.status}
                            </Text>
                          </View>
                        )}
                        {el.status == "Cancelled" && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="dot-single"
                              size={25}
                              style={{ color: "red" }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "MontserratRegular",
                                color: "red",
                              }}
                            >
                              {el.status}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                );
              }
            );
          })
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratRegular",
              paddingHorizontal: 10,
              paddingVertical: 10,
              color: "#fff",
            }}
          >
            No item found !
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default IndividualOrderedItem;
