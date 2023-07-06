import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import PostsScreenNavi from "./PostsScreenNavi";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
const Tabs = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [bar, setBar] = useState(true);

  return (
    <Tabs.Navigator screenOptions={styles.container}>
      <Tabs.Screen
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.grid}>
                <SimpleLineIcons name="grid" size={24} color={color} />
              </View>
            );
          },

          headerShown: false,
          tabBarStyle: bar
            ? {
                display: "flex",
                height: 83,
                paddingTop: 9,
                paddingBottom: 34,
              }
            : { display: "none" },
        })}
        name={"PostsScreenNavi"}
        // component={PostsScreenNavi}
      >
        {(props) => <PostsScreenNavi {...props} bar={setBar} />}
      </Tabs.Screen>
      <Tabs.Screen
        backBehavior="history"
        options={() => ({
          tabBarIcon: () => {
            return (
              <View style={styles.plus}>
                <AntDesign name="plus" size={24} color={"white"} />
              </View>
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: "none",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ marginLeft: 16 }}
            >
              <Feather name="arrow-left" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        })}
        name={"Create"}
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.user}>
                <Feather name="user" size={24} color={color} />
              </View>
            );
          },
        })}
        name={"Profile"}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
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
    tabBarShowLabel: false,
    tabBarStyle: {
      height: 83,
      paddingTop: 9,
      paddingBottom: 34,
    },
    tabBarInactiveTintColor: "#212121",
  },
  btnLogOut: {
    marginRight: 16,
  },

  grid: {
    width: 40,
    height: 40,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 31,
    marginLeft: 31,
  },
  user: {
    width: 40,
    height: 40,
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
