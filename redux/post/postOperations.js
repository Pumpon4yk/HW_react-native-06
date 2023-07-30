import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc, 
  serverTimestamp
} from 'firebase/firestore';

import { db } from '../../firebase/config';
import { setPosts, setOwnPosts, setComments, updateLike } from './postSlice';
console.log("🚀 ~ setPosts:", setPosts)

export const getAllPosts = () => async dispatch => {
  try {
const arrayPosts = []
const querySnapshot = await getDocs(collection(db, 'posts'),);

querySnapshot.forEach((doc) => {
  const object = doc.data();
  arrayPosts.push({id: doc.id, ...object});
});

arrayPosts.sort((a, b) => b.createdAt - a.createdAt);

const newArr = arrayPosts.map((post) => {
  delete post.createdAt
	return post
})

    dispatch(setPosts(newArr));

  } catch (error) {
    console.log(error.message);
  }
};

export const getOwnPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
const arrayPosts = []

querySnapshot.forEach((doc) => {
  const object = doc.data();
  arrayPosts.push({id: doc.id, ...object});
});

arrayPosts.sort((a, b) => b.createdAt - a.createdAt);

const newArr = arrayPosts.map((post) => {
  delete post.createdAt
	return post
})

    dispatch(setOwnPosts(newArr));
  } catch (error) {
    console.log(error.message);
  }
};

  export const createPost = post => async (dispatch, getState) => {
    try {
      const { userId } = getState().auth;
      const objPost = {
        post,
        userId,
        createdAt: serverTimestamp(),
      } 
      await addDoc(collection(db, 'posts'), objPost);

    } catch (error) {
      console.log(error.message);
    }
  };

export const addCommentToPost =
  (postId, commentData) => async (dispatch, getState) => {
    try {
      const { nickname, userId, userAvatar } = getState().auth;
      const comment = {
        comment: commentData,
        author: nickname,
        authorId: userId,
        authorAvatar: userAvatar,
        createdAt: new Date().toString(),
      };

      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      const newComments = [comment, ...data.post.comments];

    await updateDoc(docRef, {
      'post.comments': newComments,
    });

      dispatch(setComments(newComments));
    } catch (error) {
      console.log(error.message);
    }
  };

export const addLikeToPost = postId => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    let newLikes
    
    if(data.post.likes.includes(userId)){
      newLikes = data.post.likes.filter( e => e !== userId)
    }else{
      newLikes = [userId, ...data.post.likes]
    }
    
    await updateDoc(docRef, {
      'post.likes': newLikes,
    });
    
  dispatch(updateLike({postId, newLikes}))

  } catch (error) {
    console.log(error.message);
  }
};