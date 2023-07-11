import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../styles";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Bottom = ({ screen }) => {
  const rout = useRouter();
  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  };
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        borderTopColor: "lightgrey",
        borderTopWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          Haptics.selectionAsync();
          rout.push("/Home");
        }}
      >
        <Icon
          name="home"
          size={30}
          style={[
            screen == "Home" ? styles.activeBottomTab : styles.bottomIcons,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Haptics.selectionAsync();
          rout.replace("/SearchResults");
        }}
      >
        <Icon
          name="search1"
          size={30}
          style={[
            screen == "SearchResults"
              ? styles.activeBottomTab
              : styles.bottomIcons,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Haptics.selectionAsync();
          rout.push("/AddToCart");
        }}
      >
        <Icon
          name="shoppingcart"
          size={30}
          style={[
            screen == "Cart" ? styles.activeBottomTab : styles.bottomIcons,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Haptics.selectionAsync();
          rout.push("/OrderedItems");
        }}
      >
        <Icon2
          name="truck-delivery-outline"
          size={30}
          style={[
            screen == "Ordered" ? styles.activeBottomTab : styles.bottomIcons,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Haptics.selectionAsync();
          removeValue("user_id");
          rout.replace("/Login");
        }}
      >
        <Icon
          name="logout"
          size={30}
          style={[
            screen == "Logout" ? styles.activeBottomTab : styles.bottomIcons,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Bottom;
