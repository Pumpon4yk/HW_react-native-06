import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from "../api/uploadImage";

export default function UserAvatar({ avatar, setAvatar }) {

  const pickImage = async () => {
    if(avatar) {
      return setAvatar(null);
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imgUri = await uploadImage(result.assets[0].uri, "avatar")
      setAvatar(imgUri);
    }
  };

  return (
    <View style={styles.avatarContainer}>
      {avatar && <Image style={styles.avatar} source={{ uri: avatar }} />}
      <TouchableOpacity style={{ width: 25 }} onPress={pickImage}>
        {!avatar ? (
          <Image
            style={styles.icon}
            source={require("../assets/img/add.png")}
          />
        ) : (
          <Image
            style={styles.icon}
            source={require("../assets/img/delete.png")}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  avatar:{
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: 0,
    left: 0,
  },
  icon: {
    position: "absolute",
    width: 25,
    left: 107,
    top: 81,
  },
})