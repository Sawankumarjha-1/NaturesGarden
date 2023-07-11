import { Stack, useRouter } from "expo-router";
import { Image, ScrollView } from "moti";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import LottiView from "lottie-react-native";
import GettingUserID from "../fetched/GettingUserID";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OrderSuccessfull = () => {
  const { orderData, email, totalAmount } = GettingUserID();
  const [processing, setProcessing] = useState(false);
  const [orderArray, setOrderArray] = useState([]);

  const rout = useRouter();
  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  };
  //Delete Cart items
  const eraseCartItem = async () => {
    try {
      const res = await fetch(`http://192.168.29.216:5000/api/erase/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 200) {
        setProcessing(false);
        return rout.replace("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };
  //Add Item to the user id
  const addToOrder = async () => {
    try {
      const res = await fetch(
        `http://192.168.29.216:5000/api/orders_update/${email}`,
        {
          method: "PATCH",
          body: JSON.stringify(orderArray),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        removeValue("orderData");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setOrderArray([]);
    orderData != "" &&
      JSON.parse(orderData).map((element) => {
        element.status = "Order Confirmed";
        setOrderArray((prev) => {
          return [...prev, element];
        });
      });
  }, [orderData]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: StatusBar.currentHeight,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />

      {processing == false ? (
        <View>
          <View style={{ padding: 20, marginTop: 100, alignItems: "center" }}>
            <LottiView
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                marginBottom: 10,
              }}
              source={require("../success.json")}
              loop={false}
              speed={1}
              autoPlay
            />
            <View style={{ height: 400 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "MontserratSemiBold",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                Total Amount : {totalAmount} /-
              </Text>
              <ScrollView
                contentContainerStyle={{
                  padding: 20,
                  paddingBottom: 100,
                }}
                from={{
                  translateY: 400,
                }}
                animate={{
                  translateY: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "MontserratSemiBold",
                    marginBottom: 20,
                  }}
                >
                  Ordered Items
                </Text>
                {orderData !== "" &&
                  JSON.parse(orderData).map((data, index) => {
                    return (
                      <View
                        key={"orderItems" + index}
                        style={{
                          flexDirection: "row",
                          borderWidth: 0.5,
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          borderRadius: 6,
                          borderColor: "#eee",
                          marginVertical: 10,
                        }}
                      >
                        <Image
                          source={{ uri: data.imageLink }}
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
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "MontserratMedium",
                              }}
                            >
                              {data.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "MontserratBold",
                              }}
                            >
                              Qty : {data.quantity}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 5,
                              fontFamily: "MontserratMedium",
                              color: "#00BF63",
                            }}
                          >
                            Delivered within : {data.deliveryDate}
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
                          </View>
                        </View>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </View>

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
              setProcessing(true);
              addToOrder();

              eraseCartItem();
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
              Go To Home
            </Text>
          </TouchableOpacity>
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
      )}
    </SafeAreaView>
  );
};

export default OrderSuccessfull;
