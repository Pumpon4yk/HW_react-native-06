import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PostsScreen from "./PostsScreeans/PostsScreen";
import CommentsScreen from "./PostsScreeans/CommentsScreen";
import MapScreen from "./PostsScreeans/MapScreen";
import { Feather } from "@expo/vector-icons";

const PostStack = createStackNavigator();

export default function PostsScreenNavi({ navigation, bar}) {

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
        // component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("This is a button!")}
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
