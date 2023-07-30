import React, { useEffect, useState } from "react";
import { getUser } from "../../../redux/auth/selectors";
import { useSelector, useDispatch } from "react-redux";

import { View, StyleSheet } from "react-native";

import PostUserProfile from "../../../Components/PostUserProfile";
import ListPosts from "../../../Components/ListPosts";

import { getPosts } from "../../../redux/post/selectors"
import { getAllPosts } from "../../../redux/post/postOperations"

export default function PostsScreen({ navigation, bar}) {

  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const posts = useSelector(getPosts)
  const focused = navigation.isFocused();

  useEffect(() => {
    if(!focused)return;
    dispatch(getAllPosts())
  }, [focused]);


  return (
    <View style={styles.container}>
    <PostUserProfile user={user} />
    <ListPosts posts={posts} nav={navigation} user={user} bar={bar}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  }
});
