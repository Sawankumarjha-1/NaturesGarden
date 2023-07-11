import { Stack, useRouter } from "expo-router";
import { ScrollView } from "moti";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { RadioButton, TextInput } from "react-native-paper";
import * as Haptics from "expo-haptics";
import GettingCartItems from "../fetched/GettingCartItems";
import BackBtn from "../components/Common/BackBtn";
import { ObjectId } from "mongoose";
import GettingUserID from "../fetched/GettingUserID";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AddressSelection() {
  const { email, userAddress, isUserLoading } = GettingCartItems();
  const [selected, setSelected] = useState(0);
  const [add, setAdd] = useState(userAddress.length == 0 ? false : true);
  const [society, setSociety] = useState("");
  const [sector, setSector] = useState("");
  const [orderArray, setOrderArray] = useState([]);
  const { orderData } = GettingUserID();
  const rout = useRouter();
  //Add the content into array
  const addAddressContent = async () => {
    if (society !== "" && sector !== "") {
      try {
        const res = await fetch(
          `http://192.168.29.216:5000/api/address_update/${email}`,
          {
            method: "PATCH",
            body: JSON.stringify({ society, sector }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status == 200) {
          Alert.alert("Added Suucessfully...");
          setAdd(false);
          setSociety("");
          setSector("");
          return rout.replace("/AddressSelection");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert("Please fill both society and sector details properly !");
    }
  };
  //Delete Cart items
  const deleteAddress = async (index) => {
    try {
      const res = await fetch(
        `http://192.168.29.216:5000/api/delete_address/${email}/${index}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status == 200) {
        Alert.alert("Delete Suucessfully...");
        return rout.replace("/AddressSelection");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const storeUser = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log(error);
    }
  };
  function onContinue() {
    console.log(orderArray);
    storeUser("orderData", JSON.stringify(orderArray));
    rout.replace(`/Invoice`);
  }

  useEffect(() => {
    setOrderArray([]);
    orderData &&
      userAddress &&
      JSON.parse(orderData).map((element) => {
        element.address = userAddress[selected];
        setOrderArray((prev) => {
          return [...prev, element];
        });
      });
  }, [orderData, userAddress, selected]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: StatusBar.currentHeight,
      }}
    >
      <Stack.Screen
        options={{
          title: "Select Address",
          headerLeft: () => {
            return <BackBtn path={"/AddToCart"} />;
          },
        }}
      />
      {/*Listd Address*/}
      {isUserLoading == false ? (
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/*List Address*/}
          {userAddress.length != 0 &&
            userAddress.map(
              (
                data: {
                  _id: ObjectId;
                  sector: String;
                  society: String;
                },
                index
              ) => {
                return (
                  <View
                    key={"addr_list" + index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 15,
                      borderBottomWidth: 0.5,
                      borderColor: "#eee",
                    }}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          Haptics.selectionAsync();
                          setSelected(index);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "MontserratMedium",
                            lineHeight: 30,
                            color: selected == index ? "#00BF63" : "#000",
                          }}
                        >
                          {data.society}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "MontserratRegular",
                          }}
                        >
                          {data.sector}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <RadioButton
                      value="0"
                      status={selected === index ? "checked" : "unchecked"}
                      onPress={() => {
                        Haptics.selectionAsync();
                        setSelected(index);
                      }}
                      color="#00BF63"
                    />

                    <TouchableOpacity
                      onPress={() => {
                        Haptics.selectionAsync();
                        deleteAddress(index);
                      }}
                    >
                      <Entypo name="trash" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                );
              }
            )}
          {/*Add Another Address */}
          <View style={{ display: add === true ? "flex" : "none" }}>
            <TextInput
              label="Society - Home no"
              style={{ backgroundColor: "transparent" }}
              activeUnderlineColor="#00BF63"
              dense={true}
              contentStyle={{
                fontSize: 14,
                fontFamily: "MontserratRegular",
              }}
              value={society}
              onChangeText={(text) => setSociety(text)}
            />
            <TextInput
              label="Sector - City - State"
              style={{ backgroundColor: "transparent" }}
              activeUnderlineColor="#00BF63"
              dense={true}
              contentStyle={{ fontSize: 14, fontFamily: "MontserratRegular" }}
              value={sector}
              onChangeText={(text) => setSector(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: add === true ? "#00BF63" : "#000",
                width: 100,
                borderRadius: 30,
                marginVertical: 20,
              }}
              onPress={() => {
                if (add == false) {
                  setAdd(true);
                }
                if (add == true) {
                  addAddressContent();
                }
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: add == true ? "flex" : "none",
                backgroundColor: add === true ? "red" : "#000",
                width: 100,
                borderRadius: 30,
                marginVertical: 20,
                marginLeft: 20,
              }}
              onPress={() => {
                setAdd(false);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                Hide
              </Text>
            </TouchableOpacity>
          </View>
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

      {/*Continue Button*/}
      {userAddress.length != 0 && (
        <TouchableOpacity
          style={{
            display: add === false ? "flex" : "none",
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
}
