import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  welcomeText: {
    fontSize: 40,
    fontFamily: "MontserratBold",
    color: "#fff",

    textAlign: "center",
  },

  formHeading: {
    fontSize: 40,
    fontFamily: "MontserratSemiBold",
  },
  formSubHeading: {
    fontSize: 18,
    fontFamily: "MontserratRegular",
    width: 250,
  },
  inputField: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 20,
    fontFamily: "MontserratRegular",
  },
  formCommonBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 130,
    borderRadius: 30,
  },

  formCommonBtnText: {
    textAlign: "center",
    fontFamily: "MontserratMedium",
  },
  activeBottomTab: {
    padding: 10,
    backgroundColor: "#00BF63",
    color: "#fff",
    borderRadius: 100,
  },
  bottomIcons: {
    color: "grey",
  },
  searchIconTouchable: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: "#00BF63",
    color: "#fff",
    borderRadius: 50,
  },
  searchContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "grey",
    opacity: 0.7,
    backgroundColor: "#fff",
  },
  socialIcons: {
    color: "grey",
  },
});
