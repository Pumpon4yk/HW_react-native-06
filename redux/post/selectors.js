import { useSelector } from "react-redux";

export const getPosts = state => state.post.posts;
export const getUserPosts = state => state.post.ownPosts;
export const getComments = state => state.post.comments;


export const getPost =  id => {
  const state = useSelector(getPosts)
  return state.find(post => post.id === id)
}