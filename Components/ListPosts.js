import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addLikeToPost } from "../redux/post/postOperations";

export default function ListPosts ({posts, nav, user, bar}){
const dispatch = useDispatch()

  return(
    <FlatList
      style={{marginHorizontal: 16, marginTop: 32}}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (!item) return;
          return (
            <View style={styles.postContainer}>
              <Image style={styles.img} source={{ uri: item.post.photo }} />
              <Text style={styles.titlePost}>{item.post.namePost}</Text>
              <View style={styles.containerData}>
                <View style={styles.wraperData}>
                  <TouchableOpacity style={styles.containerSubData} onPress={()=>
                  {
                    bar(false)
                    nav.navigate('Comments', {...posts.filter(e => e.id === item.id)})
                    }
                    }>
                    <Feather name="message-circle" size={24} color={item.post.comments.some(e => e.authorId === user.userId) ? "#FF6C00" : "#BDBDBD"} />
                    <Text style={{ ...styles.text, color: `${item.post.comments.length > 0 ? "#212121" : "#BDBDBD"}` , textDecorationLine: 'none', }}>{item.post.comments.length}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.containerSubData} onPress={() => dispatch(addLikeToPost(item.id))} >
                    <Feather name="thumbs-up" size={24} color={item.post.likes.some(e => e === user.userId) ? "#FF6C00" : "#BDBDBD"} />
                    <Text style={{ ...styles.text, color:`${item.post.likes.length > 0 ? "#212121" : "#BDBDBD"}`, textDecorationLine: 'none'  }}>{item.post.likes.length}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.containerSubData} 
                onPress={()=>
                {
                  bar(false)
                  nav.navigate('Map', {...posts.filter(e => e.id === item.id)})
                  }
                }>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={styles.text}>{item.post.locationPost}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
  )
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
    marginBottom: 34
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
  wraperData: {
    flexDirection: "row",
    gap: 24
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
