import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
const specialFilter = [
  {
    id: "specialFilter1",
    price: "199",
  },
  {
    id: "specialFilter2",
    price: "299",
  },
  {
    id: "specialFilter3",
    price: "399",
  },
];
const SpecialOffer = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {specialFilter.map((data, index) => {
          return (
            <View
              key={data.id}
              style={{
                backgroundColor: "#eee",
                borderRadius: 100,
                width: 150,
                height: 150,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <Text style={{ fontSize: 14, fontFamily: "MontserratRegular" }}>
                Plants under
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "MontserratBold",
                  color: "#00BF63",
                }}
              >
                ₹ {data.price} /-
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SpecialOffer;
