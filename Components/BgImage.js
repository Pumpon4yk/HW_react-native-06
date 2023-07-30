import {
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

export default function BgImage (){
  return(
    <ImageBackground
    source={require("../assets/img/BG.jpg")}
    style={styles.image}
  ></ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})