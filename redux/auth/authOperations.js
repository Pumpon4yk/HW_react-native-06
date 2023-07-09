import { auth, db, storage} from "../../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut
} from "firebase/auth";
import {updateUser,  authCurrentUser, authSingOut} from "./authSlice"

const createUserObject = user => ({
  userId: user.uid,
  nickname: user.displayName,
  userEmail: user.email,
  userAvatar: user.photoURL,
})

export const authSignUp = ({photoURL = "", nickname, email, password}) => async (dispatch) => {
  try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {
      displayName: nickname,
      photoURL,
    });
    const userSuccess = auth.currentUser;

    dispatch(updateUser(createUserObject(userSuccess)))
    dispatch(authCurrentUser(true))

  } catch (error) {
  console.log("🚀 ~ authSignUp ~ error.message:", error.message)
  }
}

export const authSignIn = ({email, password}) => async (dispatch) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)

    dispatch(updateUser(createUserObject(user)))
    dispatch(authCurrentUser(true))

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
        dispatch(authCurrentUser(createUserObject(user)))
        dispatch(authCurrentUser(true))
      }
    })

  } catch (error) {
  console.log("🚀 ~ authSignIn ~ error.message:", error.message)
  }
}

