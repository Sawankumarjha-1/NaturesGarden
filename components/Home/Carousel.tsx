import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import GettingProductData from "../../fetched/GettingProductData";
import { useRouter } from "expo-router";
const Carousel = () => {
  const { data, error, isLoading } = GettingProductData("/featured/3");
  const rout = useRouter();
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {isLoading == false && (
          <View style={{ flexDirection: "row" }}>
            {data.map((element, index) => {
              return (
                <ImageBackground
                  key={"featured" + index}
                  source={{
                    uri: element.imageLink,
                  }}
                  style={{
                    height: 200,
                    width: 320,
                    overflow: "hidden",
                    position: "relative",
                    marginRight: 20,
                  }}
                  resizeMode="cover"
                  borderRadius={10}
                >
                  <View style={{ padding: 20 }}>
                    <View
                      style={{
                        position: "absolute",
                        width: 320,
                        height: 200,
                        backgroundColor: "#000",
                        opacity: 0.3,
                        borderRadius: 10,
                        padding: 20,
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        fontFamily: "MontserratRegular",
                      }}
                    >
                      {element.smallTitle}
                    </Text>
                    <Text
                      style={{
                        fontSize: 30,
                        color: "#fff",
                        fontFamily: "MontserratSemiBold",
                      }}
                    >
                      {element.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.selectionAsync();
                        rout.push("/SearchResults");
                      }}
                      style={{
                        backgroundColor: "#fff",
                        width: 100,

                        padding: 7,
                        borderRadius: 6,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center" }}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Carousel;
