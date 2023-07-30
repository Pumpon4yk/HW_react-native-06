import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  FlatList,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { getComments, getPost } from "../../../redux/post/selectors";
import { useDispatch, useSelector } from "react-redux";
import { addCommentToPost } from "../../../redux/post/postOperations";
import { setComments } from "../../../redux/post/postSlice";


function getCurrentDateTime(d) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(d);
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${year} | ${hours}:${minutes}`;
}
const equ = (val1, val2) => val1 === val2;
const borderRadiusTop = (params) => params ? {borderTopRightRadius: 0} : {borderTopLeftRadius: 0}

export default function CommentsScreen({ route }) {
  const dispatch = useDispatch()
  const {id, userId} = route.params[0]
  const post = getPost(id)
  const comments = useSelector(getComments)
  const [inputValue, setInputValue] = useState("");

  
  const handleSubmit = async () => {
    if (inputValue === "") return;
     dispatch(addCommentToPost(id, inputValue))
  
     Keyboard.dismiss()
     setInputValue("");
  }

  useEffect(() =>{
    dispatch(setComments(post.post.comments))
  },[dispatch])


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: post.post.photo }} />
      <FlatList
        data={comments}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          if (!item) return;
          return (
              <View style={{width:Dimensions.get("window").width - 32, flexDirection: `${equ(userId, item.authorId) ? "row-reverse" : "row"}`,gap: 16, marginBottom: 24 }}>
              <Image style={styles.iconUser} source={{ uri: item.authorAvatar }} />
              <View style={{...styles.containerComment, ...borderRadiusTop(equ(userId, item.authorId))
              }}>
                <Text style={styles.Comnent}>{item.comment}</Text>
                <Text style={{...styles.date, textAlign: `${equ(userId, item.authorId) ? "left" : 'right'}`}}>{getCurrentDateTime(item.createdAt)}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          type="text"
          value={inputValue}
          onChangeText={(value) => setInputValue(value)}
          style={styles.input}
          placeholder="Comment..."
          placeholderTextColor="#BDBDBD"
        />
        <TouchableOpacity
          style={styles.sendIcon}
          onPress={handleSubmit}
        >
          <Feather name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingRight: 16,
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 23,
  },
  iconUser:{
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  containerComment:{
    width: Dimensions.get("window").width - 76,
backgroundColor: '#00000008',
padding: 16,
borderRadius: 6,
// borderTopLeftRadius: 0,

  },
  Comnent:{
fontFamily: "Roboto-Medium",
color: '#212121',
fontSize: 13,
lineHeight: 18,
marginBottom: 8

  },
  
  date:{
    color: '#BDBDBD',
    fontFamily: "Roboto-Medium",
fontSize: 10,
lineHeight: 12,
  },
  input: {
    width: "100%",
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    padding: 16,
    paddingRight: 50,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  sendIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
