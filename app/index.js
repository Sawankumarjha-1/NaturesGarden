import { Stack } from "expo-router";
import { View, MotiImage } from "moti";
import { Text, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import styles from "../styles";
function Welcome() {
  const rout = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "#00BF63",
          width: "100%",
          height: "100%",
          padding: 30,
        }}
      >
        <MotiImage
          from={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 200, delay: 300 }}
          source={require("../assets/images/welcome_logo.png")}
          style={{ width: 300, height: 300, marginBottom: 20 }}
        />
        <Text style={styles.welcomeText}>
          Bringing Life and Freshness to Your Home
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            width: 250,
            paddingVertical: 15,
            borderRadius: 30,
            marginTop: 20,
          }}
          onPress={() => {
            Haptics.selectionAsync();
            rout.replace("/Login");
          }}
        >
          <Text
            style={{
              color: "#00BF63",
              textAlign: "center",
              fontSize: 18,
              fontFamily: "MontserratMedium",
            }}
          >
            Getting Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Welcome;
