import { View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import * as haptics from "expo-haptics";
import { useRouter } from "expo-router";
const BackBtn = ({ path }) => {
  const rout = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          haptics.selectionAsync();
          rout.replace(`${path}`);
        }}
      >
        <Icon
          name="leftcircleo"
          size={25}
          style={{ color: "#00BF63", marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackBtn;
