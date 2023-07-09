import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import PostsScreen from "./PostsScreeans/PostsScreen";
import CommentsScreen from "./PostsScreeans/CommentsScreen";
import MapScreen from "./PostsScreeans/MapScreen";
import { Feather } from "@expo/vector-icons";
import { authSignOut } from "../../redux/auth/authOperations";

const PostStack = createStackNavigator();

export default function PostsScreenNavi({ navigation, bar}) {
  const dispatch = useDispatch()

const logOut = () => {
  dispatch(authSignOut())
}

  return (
    <PostStack.Navigator
      screenOptions={{
        ...styles.container,
        headerLeft: () => (
          <TouchableOpacity
            onPress={()=>{
              bar(true)
              navigation.goBack()
              }}
            style={{ marginLeft: 16 }}
          >
            <Feather name="arrow-left" size={24} color="#212121CC" />
          </TouchableOpacity>
        ),
      }}
    >
      <PostStack.Screen
        name="Posts"
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={logOut}
              style={{ ...styles.btnLogOut, marginRight: 16 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerLeft: () => null,
        }}
      >
        {(props)=><PostsScreen {...props} bar={bar}/>}
      </PostStack.Screen>
      <PostStack.Screen name="Comments" component={CommentsScreen} />
      <PostStack.Screen name="Map" component={MapScreen} />
    </PostStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    headerStyle: {
      height: 88,
      borderBottomWidth: 1,
      borderColor: "#BDBDBD",
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 17,
      color: "#212121",
      fontFamily: "Roboto-Medium",
    },
  },
  grid: {
    width: 40,
    height: 40,
    marginLeft: "auto",

    alignItems: "center",
    justifyContent: "center",
  },
});
