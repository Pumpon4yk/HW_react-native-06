import { createSlice } from "@reduxjs/toolkit";


const  initialState = {
  posts: [],
  ownPosts: [],
  comments: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, {payload}) => ({
      ...state,
      posts: payload 
    }),
    setOwnPosts: (state, {payload}) => ({
      ...state,
      ownPosts: payload
    }),
    setComments: (state, {payload}) => ({
      ...state,
      comments: payload
    }),
    updateLike: (state, { payload }) => {
      const { postId, newLikes } = payload;
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              post: {
                ...post.post,
                likes: newLikes,
              },
            };
          }
          return post;
        }),
        ownPosts: state.posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              post: {
                ...post.post,
                likes: newLikes,
              },
            };
          }
          return post;
        }),
      };
    },
  }
})

export const {  setPosts, setOwnPosts, setComments, updateLike } = postSlice.actions