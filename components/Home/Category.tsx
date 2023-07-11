import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "moti";
import { useRouter } from "expo-router";
const categoryData = [
  {
    id: "categroy1",
    name: "Plants",
    image: require("../../assets/images/plant.jpg"),
  },
  {
    id: "categroy2",
    name: "Garden Plants",
    image: require("../../assets/images/gardening.jpg"),
  },
  {
    id: "categroy3",
    name: "Seeds",
    image: require("../../assets/images/seed.jpg"),
  },
  {
    id: "categroy4",
    name: "Pots",
    image: require("../../assets/images/pots.jpg"),
  },
  {
    id: "categroy5",
    name: "Accessories",
    image: require("../../assets/images/accessories.jpg"),
  },
];
const Category = ({ selected }) => {
  const rout = useRouter();
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categoryData.map((data, index) => {
          return (
            <View
              key={data.id}
              style={{
                height: 100,
                margin: 10,
              }}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() =>
                  rout.replace("/SearchResults?category=" + data.name)
                }
              >
                <Image
                  source={data.image}
                  style={{
                    width: selected == data.name ? 75 : 60,
                    height: selected == data.name ? 75 : 60,
                    borderRadius: 100,
                    marginBottom: 5,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "MontserratLight",
                    color: selected == data.name ? "#00BF63" : "#000",
                  }}
                >
                  {data.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Category;
