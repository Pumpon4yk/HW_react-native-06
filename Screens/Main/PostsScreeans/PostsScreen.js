import React, { useEffect, useState } from "react";

import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export default function PostsScreen({ route, navigation, bar }) {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    if (!route.params) return;
    setPosts((prevState) => [route.params, ...prevState]);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
      style={{marginHorizontal: 16}}
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item, index }) => {
          if (!item) return;
          return (
            <View style={styles.postContainer}>
              <Image style={styles.img} source={{ uri: item.photo }} />
              <Text style={styles.titlePost}>{item.namePost}</Text>
              <View style={styles.containerData}>
                <TouchableOpacity style={styles.containerSubData} onPress={()=>
                {
                  bar(false)
                  navigation.navigate('Comments', {...posts.filter((e, i)=> i === index)})
                  }
                  }>
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={{ ...styles.text, color: "#BDBDBD", textDecorationLine: 'none',  }}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerSubData} 
                onPress={()=>
                 {
                  bar(false)
                  navigation.navigate('Map', {...posts.filter((e, i)=> i === index)})
                  }
                 }>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={styles.text}>{item.locationPost}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  postContainer: {
    width: "100%",
    height: 299,
    marginTop: 32,
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  titlePost: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  containerData: {
    width: "100%",
    marginTop: 8,
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  containerSubData: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 6,
  },
  text: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
    marginTop: "auto",
    marginBottom: "auto",
    textDecorationLine: 'underline',
  },
});
