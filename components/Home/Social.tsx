import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../../styles";
const Social = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, fontFamily: "MontserratMedium" }}>
        Follow us :
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity>
          <Icon name="facebook-square" size={30} style={styles.socialIcons} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="instagram" size={30} style={styles.socialIcons} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="linkedin-square" size={30} style={styles.socialIcons} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="twitter" size={30} style={styles.socialIcons} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Social;
