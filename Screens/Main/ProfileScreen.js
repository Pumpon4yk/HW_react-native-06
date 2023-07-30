import { Text,View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getUser } from "../../redux/auth/selectors";
import { getUserPosts} from "../../redux/post/selectors"
import { useSelector, useDispatch } from "react-redux";

import UserAvatar from "../../Components/UserAvatar"
import { getOwnPosts } from "../../redux/post/postOperations";

import BgImage from "../../Components/BgImage";
import BtnLogOut from "../../Components/BtnLogOut";
import ListPosts from "../../Components/ListPosts";


export default function ProfileScreen({ navigation, bar}) {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState(user.userAvatar)
  const focused = navigation.isFocused();
  const posts = useSelector(getUserPosts)

  useEffect(() => {
     if(!focused)return;
      dispatch(getOwnPosts())
    }, [focused]
)

  return(
    <View style={styles.container}>
      <BgImage/>
    <View style={styles.wrapper}>
    <UserAvatar avatar={avatar} setAvatar={setAvatar}/>
    <View style={styles.logOutContainer}>
    <BtnLogOut/>
    </View>
      <Text style={styles.nickname}>{user.nickname}</Text>
      <ListPosts posts={posts} nav={navigation} user={user} bar={bar}/>
    </View>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper:{
    position: "relative",
    flex: 1,
    alignItems: "center",
    backgroundColor:"white",
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
  },
  logOutContainer:{
position: "absolute",
top: 22,
right: 0,
  },
  nickname:{
  color: "#212121",
  fontFamily: "Roboto-Medium",
  fontSize: 30,
  letterSpacing: 0.3,
  marginBottom: 33,
  }

})

