import { View, Text, Image,  StyleSheet } from "react-native";


export default function PostUserProfile({user}){
const {nickname, userAvatar, userEmail} = user;

  return(
    <View style={styles.container}>
    <Image style={styles.avatar} source={{uri: userAvatar}} />
    <View>
      <Text style={styles.nickname}>{nickname}</Text>
      <Text style={styles.email}>{userEmail}</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 171,
    height: 60,
    marginLeft: 16,
    marginTop: 32,
    flexDirection: 'row',
    alignItems: "center",
    gap: 8
  },
  avatar:{
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  nickname: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 13,
  },
  email:{
    color: "#212121CC",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  }
});
