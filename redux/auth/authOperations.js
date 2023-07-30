import { auth } from "../../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut
} from "firebase/auth";
import {updateUser,  authCurrentUser, authSingOut} from "./authSlice"

const setUserStorage = (user, dispatch) => {
  const newObjUser = {
    userId: user.uid,
    nickname: user.displayName,
    userEmail: user.email,
    userAvatar: user.photoURL,
  }

  dispatch(updateUser(newObjUser))
  dispatch(authCurrentUser(true))
}

export const authSignUp = ({photoURL, nickname, email, password}) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    
    await updateProfile(auth.currentUser, {
      displayName: nickname,
      photoURL,
    });
    
    const userSuccess = auth.currentUser;

    setUserStorage(userSuccess, dispatch)
  } catch (error) {
  console.log("🚀 ~ authSignUp ~ error.message:", error.message)
  }
}

export const authSignIn = ({email, password}) => async (dispatch) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    
    const user = auth.currentUser;

    setUserStorage(user, dispatch)
  } catch (error) {
  console.log("🚀 ~ authSignIn ~ error.message:", error.message)
  }
}

export const authSignOut = () => async (dispatch) => {
  try {
  await signOut(auth)
  dispatch(authSingOut())
  } catch (error) {
  console.log("🚀 ~ authSignIn ~ error.message:", error.message)
  }
}

export const authCurrent = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
    setUserStorage(user, dispatch)
      }
    })

  } catch (error) {
  console.log("🚀 ~ authSignIn ~ error.message:", error.message)
  }
}

