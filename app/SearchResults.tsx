import {
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import { Image } from "moti";
import { useRouter } from "expo-router";
import styles from "../styles";
import GettingProductData from "../fetched/GettingProductData";
import * as Haptics from "expo-haptics";
import { View } from "moti";
import Category from "../components/Home/Category";
import Bottom from "../components/Common/Bottom";
import GettingCartItems from "../fetched/GettingCartItems";
import { ObjectId } from "mongoose";
const SearchResults = () => {
  const rout = useRouter();
  const { email, userCart, isUserLoading } = GettingCartItems();
  const searchParams = useSearchParams();
  let path: String;
  let category = searchParams.category;
  if (category != undefined) {
    path = "products_category/" + category;
  } else {
    path = "allProducts";
  }
  const { data, error, isLoading } = GettingProductData(path);
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState([]);
  function fetchData() {
    if (searchText != "") {
      const fData = data.filter(
        (item: {
          name: String;
          category: String;
          price: String;
          imageLink: String;
          description: String;
        }) => {
          return item.name.includes(searchText);
        }
      );
      return setFilterData(fData);
    } else {
      return setFilterData(data);
    }
  }
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
        return rout.replace("/SearchResults");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  useEffect(() => {
    fetchData();
  }, [searchText]);
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
          headerShown: false,
        }}
      />
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 10,
          marginTop: StatusBar.currentHeight,
          position: "relative",
        }}
      >
        <TextInput
          placeholder="Search for an item ...."
          style={styles.searchContainer}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
        <TouchableOpacity
          style={styles.searchIconTouchable}
          onPress={() => {
            Haptics.selectionAsync();
            rout.push("/SearchResults?search=" + searchText);
            setSearchText("");
          }}
        >
          <Icon name="search1" size={20} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Category selected={category} />
        <View style={{ paddingHorizontal: 20, height: "100%" }}>
          {isLoading == false && isUserLoading == false ? (
            <View>
              {filterData.length != 0 ? (
                filterData.map(
                  (
                    item: {
                      _id: ObjectId;
                      name: String;
                      category: String;
                      price: String;
                      imageLink: String;
                      description: String;
                    },
                    index
                  ) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingVertical: 20,
                          borderBottomWidth: 0.5,
                          borderBottomColor: "grey",
                        }}
                        key={"searchItems" + index}
                        from={{ translateY: -100, opacity: 0.5 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: 200, delay: 300 }}
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
                            }) => e._id === item._id
                          ) != -1 ? (
                            <TouchableOpacity
                              onPress={() => {
                                Haptics.selectionAsync();
                                rout.push(
                                  "/ProductDescription?id=" +
                                    item._id +
                                    "&&status=added"
                                );
                              }}
                              style={{ height: 60, width: "20%" }}
                            >
                              <Image
                                source={{ uri: item.imageLink }}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: 6,
                                }}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                Haptics.selectionAsync();
                                rout.push("/ProductDescription?id=" + item._id);
                              }}
                              style={{ height: 60, width: "20%" }}
                            >
                              <Image
                                source={{ uri: item.imageLink }}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: 6,
                                }}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
                          )
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              Haptics.selectionAsync();
                              rout.push("/ProductDescription?id=" + item._id);
                            }}
                            style={{ height: 60, width: "20%" }}
                          >
                            <Image
                              source={{ uri: item.imageLink }}
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: 6,
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        )}

                        <View
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            width: "80%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "MontserratMedium",
                            }}
                          >
                            {item.name}
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
                              ₹ {item.price} /-
                            </Text>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
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
                                  }) => e._id === item._id
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
                                      AddToCart(item);
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
                                    AddToCart(item);
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
                      </View>
                    );
                  }
                )
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
          )}
        </View>
      </ScrollView>
      <Bottom screen={"SearchResults"} />
    </SafeAreaView>
  );
};

export default SearchResults;
